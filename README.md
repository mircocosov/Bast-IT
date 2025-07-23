# Bast-IT Test App

## Описание

Мобильное приложение на React Native + Expo (Bare workflow) с Яндекс.Картой, маркером и ценником дома, а также backend на NestJS + PostgreSQL.

---

## Быстрый старт

1. Клонируйте репозиторий и установите зависимости для backend и frontend.
2. Запустите backend (NestJS) — по умолчанию http://localhost:3000
3. Запустите frontend (Expo Bare) — Android/iOS эмулятор или устройство.

---

## Backend (NestJS)

- **Папка:** `backend`
- **Технологии:** NestJS, TypeORM, PostgreSQL
- **Запуск:**
  ```sh
  cd backend
  npm install
  npm run start
  ```
- **Настройки БД:**
  - По умолчанию: PostgreSQL, база `Houses`, пользователь `postgres`, пароль `zxcvasdqw1`
  - Изменить можно в `backend/src/app.module.ts`
- **Эндпоинты:**
  - `GET /house` — список всех домов
  - `GET /house/:id` — дом по id

---

## Frontend (React Native + Expo Bare)

- **Папка:** `frontend`
- **Технологии:** React Native, Expo SDK 48, react-native-yamap, TypeScript
- **Запуск:**
  ```sh
  cd frontend
  npm install
  npx expo prebuild
  npx expo run:android
  # или (на Mac)
  npx expo run:ios
  ```
- **Особенности:**
  - Используется нативный модуль `react-native-yamap` (Яндекс.Карта)
  - Для iOS требуется Mac и Xcode, либо EAS Build + платный Apple Developer аккаунт
  - Для Android работает на эмуляторе и реальных устройствах
- **Настройка backend URL:**
  - Для Android-эмулятора: `http://10.0.2.2:3000/house`
  - Для iOS-симулятора: `http://localhost:3000/house`
  - Для реальных устройств: укажите локальный IP компьютера

---

## Контакты

Автор: Артем mircocosov
