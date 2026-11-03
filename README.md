# Номерной джекпот — проект Android

Игра — это один файл `app/src/main/assets/index.html`, внутри приложения он открывается в WebView.
Если захотите что-то поменять в игре, правьте этот файл и пересобирайте APK.

## Способ 1. Android Studio (самый простой)

1. Установите Android Studio: https://developer.android.com/studio
2. `File → Open` и выберите эту папку (`PlatesGameAndroid`). Дождитесь окончания Gradle Sync
   (студия сама скачает всё нужное, включая Android SDK 34).
3. `Build → Build Bundle(s) / APK(s) → Build APK(s)`.
4. Готовый файл: `app/build/outputs/apk/debug/app-debug.apk`. Скопируйте его на телефон и установите
   (разрешите установку из неизвестных источников).

Либо подключите телефон по USB (включите «Отладку по USB») и нажмите зелёную кнопку ▶ Run.

## Способ 2. Без установки Android Studio — облако GitHub

1. Создайте на github.com пустой репозиторий и загрузите в него содержимое этой папки
   (вместе со скрытой папкой `.github`).
2. Откройте вкладку **Actions → Build APK → Run workflow**.
3. Через несколько минут внутри запуска появится артефакт **PlatesGame-apk**. Скачайте его, внутри `app-debug.apk`.

## Способ 3. Командная строка

Нужны JDK 17+ и Android SDK (переменная `ANDROID_HOME`):

    ./gradlew assembleDebug      # Windows: gradlew.bat assembleDebug

APK появится в `app/build/outputs/apk/debug/`.
`./gradlew assembleRelease` соберёт `app-release.apk` (подписан отладочным ключом, для личной установки этого достаточно).
Для публикации в Google Play нужен собственный ключ и `bundleRelease`.

## Что внутри

- `MainActivity.java` — WebView на весь экран, сохранение прогресса через localStorage, кнопка «Назад» закрывает окна и вкладки игры.
- Минимальная версия Android — 8.0 (API 26). Ориентация — только портретная.
- Иконка приложения нарисована векторно (`res/drawable`).

## Быстрая проверка игры в браузере

Откройте `app/src/main/assets/index.html` в Chrome. Если дописать к адресу `#lucky`, известные номера
будут выпадать очень часто, удобно посмотреть анимацию легендарного номера.
