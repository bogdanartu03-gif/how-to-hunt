// Проверка сервера-посредника: хост открывает комнату, друг входит, обмениваются пакетом
const base = (process.argv[2] || "").replace(/\/$/, "");
const code = "T" + Math.random().toString(36).slice(2, 7).toUpperCase();
const open = (role) => new Promise((ok, bad) => {
  const ws = new WebSocket(`${base}/room/${code}?role=${role}`);
  ws.binaryType = "arraybuffer";
  ws.q = [];
  ws.onmessage = (e) => ws.q.push(new Uint8Array(e.data));
  ws.onopen = () => ok(ws);
  ws.onerror = (e) => bad(new Error(role + " error " + (e.message || "")));
});
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const t0 = Date.now();
const host = await open("host");
await wait(800);
const cl = await open("join");
await wait(1500);
console.log("host frames", host.q.map((b) => b[0]), "client frames", cl.q.map((b) => b[0]));
const pkt = new Uint8Array([16, 1, 0, 0, 0, 2, 0, 42, 43, 44]);
cl.send(pkt);
await wait(1500);
const got = host.q.find((b) => b[0] === 16);
const idle = Date.now();
if (!got || got[7] !== 42) { console.log("FAIL no data"); process.exit(1); }
// задержка туда-обратно
const t1 = Date.now();
host.send(new Uint8Array([16, ...new Uint8Array(new Int32Array([0]).buffer), 2, 0, 7]));
while (!cl.q.find((b) => b[0] === 16) && Date.now() - t1 < 5000) await wait(5);
console.log("OK relay works, one-way host->client ms:", Date.now() - t1, "total", Date.now() - t0);
// проверка простоя: держим соединение 150 с без пакетов
const secs = Number(process.argv[3] || 0);
if (secs) {
  let closed = 0;
  host.onclose = () => { closed = Date.now(); };
  await wait(secs * 1000);
  console.log(closed ? `IDLE closed after ${(closed - idle) / 1000}s` : `IDLE still open after ${secs}s`);
}
process.exit(0);
