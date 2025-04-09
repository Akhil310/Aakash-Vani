# Aakash Vani Weather App

A simple weather dashboard built with **React**, **TypeScript**, and **Vite**. This project provides live weather updates using the OpenWeatherMap API.

## Tech Stack
- **React 19** + **Vite** for fast frontend development
- **Tailwind CSS** for styling (with dark/light mode toggle)
- **Framer Motion** for animations
- **Axios** for HTTP requests

## Features
- Search weather by city
- Dark/Light mode toggle
- Shows temperature, condition, humidity, wind speed
- Keeps history of recent city searches

## Setup
1. Clone the repo
2. Run `npm install`
3. Add your OpenWeatherMap API key in `App.tsx`
4. Start the dev server:

```bash
npm run dev
```

## Optional ESLint Enhancements
For production-level linting, you can expand the ESLint config:

```js
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

## Add-ons (Optional)
You can use community plugins like `eslint-plugin-react-x` and `eslint-plugin-react-dom` for React-specific rules:

```js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config({
  plugins: {
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

---
Made with ☁️ and ☕
