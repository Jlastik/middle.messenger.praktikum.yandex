## Описание

Простой, легковесный мессенджер для корпоративного общения

### Дизайн - прототип

https://www.figma.com/file/0XF5eQzYUhmTaf8eXzm4N6/Ya-Chatik?type=design&node-id=0%3A1&mode=design&t=CXvizAAE6QNO9JYy-1

### Роутинг приложения 

- **/** — Страница авторизации
- **/register** — Страница регистрации
- **/home** — Домашняя страница мессенджера
- **/profile** — Страница профиля пользователя
- **/notfound** — Страница с ошибкой 404
- **/error** — Страница с ошибкой 5**

### Развернутое приложение на Netlify

https://ya-chatik.netlify.app

[![Netlify Status](https://api.netlify.com/api/v1/badges/9a814c62-2039-439f-b7fa-7af6b53f7dcc/deploy-status)](https://app.netlify.com/sites/ya-chatik/deploys)


## Установка

- `npm install` — установка зависимостей,
- `npm run dev` — запуск версии для разработчика,
- `npm run build` — сборка стабильной версии, файлы собираются в папку **build**.
- `npm run start` — сборка стабильной версии и запуск express сервера на **3000** порту,
