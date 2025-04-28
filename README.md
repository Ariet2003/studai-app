# Studai - Генератор студенческих работ

Веб-приложение для автоматической генерации студенческих работ (рефератов, докладов, СРС, курсовых) с учетом требований к оформлению.

## Особенности

- Генерация работ за 5 минут
- Поддержка различных типов работ
- Автоматическое оформление по стандартам
- База готовых работ
- Темная и светлая темы
- Адаптивный дизайн

## Технологии

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- next-themes
- React Icons

## Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/yourusername/studai-app.git
cd studai-app
```

2. Установите зависимости:
```bash
npm install
```

3. Запустите приложение в режиме разработки:
```bash
npm run dev
```

4. Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## Сборка для продакшена

1. Создайте продакшен-сборку:
```bash
npm run build
```

2. Запустите продакшен-версию:
```bash
npm start
```

## Структура проекта

```
studai-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── PriceList.tsx
│   └── OrderForm.tsx
├── public/
├── styles/
├── package.json
└── tsconfig.json
```

## Лицензия

MIT 