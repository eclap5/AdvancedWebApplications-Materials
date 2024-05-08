# Project Setup

[https://vitejs.dev/guide/](https://vitejs.dev/guide/)

1. `npm create vite@latest`
2. Select project and package name (Week11)
3. Select framework (React)
4. Select variant (TypeScript)
5. After initialization, `cd Week11 && npm install`
6. `npm run dev` to start the development server

NOTE: Latest Vite version requires Node.js version 18+ and some of the features may require Node.js version 20+. Recommended to upgrade Node to latest lts version (currently v20.12.2)

## Week 11 content
Week 11 continues to explore more advanced React topics such as:
- Custom hooks
- useEffect cleanup
- Material UI


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


