# HOW TO HUNT

Мультиплеерная охота от первого лица (Godot 4.4). Текущая версия: **2.9.15**

## Скачать
- **Windows:** [HowToHunt_Godot.tar.xz](https://github.com/bogdanartu03-gif/how-to-hunt-1.0.0/raw/main/downloads/HowToHunt_Godot.tar.xz) — распакуйте (7-Zip или WinRAR) и запустите `HowToHunt.exe`
- **Android:** [HowToHunt.apk](https://github.com/bogdanartu03-gif/how-to-hunt-1.0.0/raw/main/downloads/HowToHunt.apk) — скачайте на телефон и откройте (разрешите установку из этого источника). Обновления ставятся поверх, сохранения остаются
- **Mac (macOS 10.12+, Intel и Apple M1–M3):** [HowToHunt_macOS.zip](https://github.com/bogdanartu03-gif/how-to-hunt-1.0.0/raw/main/downloads/HowToHunt_macOS.zip) — распакуйте, перенесите «HOW TO HUNT» в «Программы». Первый запуск: правый щелчок по приложению → «Открыть» → «Открыть» (приложение без платной подписи Apple). Если macOS пишет «повреждено» — в Терминале: `xattr -cr "/Applications/HOW TO HUNT.app"`
- **iPhone / iPad (iOS 12+):** [HowToHunt_iPhone.ipa](https://github.com/bogdanartu03-gif/how-to-hunt-1.0.0/raw/main/downloads/HowToHunt_iPhone.ipa) — приложение. Apple не даёт ставить приложения не из App Store напрямую, поэтому ставится через бесплатную программу **Sideloadly** (Windows или Mac):
  1. Установите Sideloadly (sideloadly.io) и iTunes (для Windows - с сайта Apple, не из Microsoft Store), подключите iPhone кабелем.
  2. Перетащите `HowToHunt_iPhone.ipa` в Sideloadly, впишите свой Apple ID, нажмите Start.
  3. На iPhone: Настройки → Основные → VPN и управление устройством → ваш Apple ID → «Доверять». На iOS 16+ ещё включите Настройки → Конфиденциальность → Режим разработчика.
  С бесплатным Apple ID приложение работает 7 дней — потом повторите шаг 2 (сохранения останутся).
  Без компьютера: играйте в Safari на [странице игры](https://bogdanartu03-gif.github.io/how-to-hunt-1.0.0/) → «Поделиться» → «На экран Домой». Проект Xcode для своей сборки: [HowToHunt_iOS_Xcode.zip](https://github.com/bogdanartu03-gif/how-to-hunt-1.0.0/raw/main/downloads/HowToHunt_iOS_Xcode.zip)
- **Meta Quest 2 / 3 / 3S (VR):** [HowToHunt_Quest.apk](https://github.com/bogdanartu03-gif/how-to-hunt-1.0.0/raw/main/downloads/HowToHunt_Quest.apk) — установка через SideQuest или Meta Quest Developer Hub (на шлеме включите режим разработчика). Игра появится в «Библиотека → Неизвестные источники»
- **Браузер на компьютере:** [страница игры](https://bogdanartu03-gif.github.io/how-to-hunt-1.0.0/) или [HowToHunt_HTML.zip](https://github.com/bogdanartu03-gif/how-to-hunt-1.0.0/raw/main/downloads/HowToHunt_HTML.zip) — распакуйте и запустите `ЗАПУСТИТЬ.bat`

### Управление в VR (Quest)
Левый стик — ходьба (нажать стик — бег) · правый стик — поворот на 30°, вверх — прыжок, вниз — присесть ·
правый курок — выстрел · целитесь самим контроллером ·
перезарядка руками: затвор/цевьё — взять левым хватом, оттянуть и вернуть; двустволка/штуцер — опустить стволы, поднести левую руку, поднять; лук держите в левой руке и целитесь ею, тетиву берите правым хватом, оттяните и отпустите · можно ходить по комнате ногами ·
A — прыжок · B — следующее оружие · X — разделать · Y — пауза/закрыть окно ·
левый курок — действие (говорить, лавка, продать) · правый хват — сумка · нажать правый стик — нести добычу · левый хват — голосовой чат.
Окна и меню — лазером правого контроллера (курок — нажать, стик — прокрутка). Здоровье и карта — на левом запястье.

`version.json` — номер последней версии: игра проверяет его при запуске и предлагает обновиться.
