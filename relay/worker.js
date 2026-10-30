// HOW TO HUNT: сервер-посредник для игры по сети (Cloudflare Workers + Durable Objects, бесплатный тариф).
// Хост и друзья подключаются по WebSocket к /room/КОД; сервер пересылает пакеты игры между ними.
// Кадры: 1 [id] - «твой номер», 2 [id] - вошёл, 3 [id] - вышел, 4 - комната занята, 5 - хоста нет,
// 16 [кому int32][режим][канал][данные] - пакет (сервер заменяет «кому» на «от кого»).

function frame(t, id) {
  const b = new ArrayBuffer(5);
  const v = new DataView(b);
  v.setUint8(0, t);
  v.setInt32(1, id, true);
  return b;
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (url.pathname === "/" || url.pathname === "/health") {
      return new Response("HOW TO HUNT relay ok", { headers: { "access-control-allow-origin": "*" } });
    }
    const m = url.pathname.match(/^\/room\/([A-Za-z0-9]{4,12})$/);
    if (!m) return new Response("not found", { status: 404 });
    if (req.headers.get("Upgrade") !== "websocket") return new Response("websocket only", { status: 426 });
    const id = env.ROOMS.idFromName(m[1].toUpperCase());
    return env.ROOMS.get(id).fetch(req);
  },
};

export class Room {
  constructor(ctx, env) {
    this.ctx = ctx;
  }

  peers() {
    const out = [];
    for (const s of this.ctx.getWebSockets()) {
      const a = s.deserializeAttachment();
      if (a && a.id) out.push([s, a.id]);
    }
    return out;
  }

  async fetch(req) {
    const role = new URL(req.url).searchParams.get("role");
    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);
    const list = this.peers();
    const ids = new Set(list.map((p) => p[1]));
    this.ctx.acceptWebSocket(server);
    let id;
    if (role === "host") {
      if (ids.has(1)) {
        server.send(frame(4, 0));
        server.close(1008, "busy");
        return new Response(null, { status: 101, webSocket: client });
      }
      id = 1;
    } else {
      if (!ids.has(1)) {
        server.send(frame(5, 0));
        server.close(1008, "nohost");
        return new Response(null, { status: 101, webSocket: client });
      }
      do {
        id = 2 + Math.floor(Math.random() * 0x7ffffff0);
      } while (ids.has(id));
    }
    server.serializeAttachment({ id });
    server.send(frame(1, id));
    for (const [s, pid] of list) {
      try {
        s.send(frame(2, id));
        server.send(frame(2, pid));
      } catch (e) {}
    }
    return new Response(null, { status: 101, webSocket: client });
  }

  webSocketMessage(ws, msg) {
    if (typeof msg === "string") return;
    const a = ws.deserializeAttachment();
    if (!a || !a.id) return;
    const d = new DataView(msg);
    if (msg.byteLength < 7 || d.getUint8(0) !== 16) return;
    const to = d.getInt32(1, true);
    d.setInt32(1, a.id, true);
    for (const [s, pid] of this.peers()) {
      if (s === ws) continue;
      if (to === 0 || (to < 0 && pid !== -to) || pid === to) {
        try {
          s.send(msg);
        } catch (e) {}
      }
    }
  }

  bye(ws) {
    const a = ws.deserializeAttachment();
    if (!a || !a.id) return;
    ws.serializeAttachment(null);
    for (const [s] of this.peers()) {
      if (s === ws) continue;
      try {
        if (a.id === 1) s.close(1001, "host left");
        else s.send(frame(3, a.id));
      } catch (e) {}
    }
  }

  webSocketClose(ws) {
    this.bye(ws);
  }

  webSocketError(ws) {
    this.bye(ws);
  }
}
