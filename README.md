# Almind Admin Dashboard (React + TypeScript + Vite)

Almind Admin Dashboard è basato su React, TypeScript e Vite. Questo pacchetto fornisce l'interfaccia amministrativa personalizzata costruita sopra l'ecosistema Medusa, con branding sostituito in "Almind" per tutti i testi UI. Gli script di build usano Bun + Vite + Tsup.

Principali plugin Vite disponibili:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Sviluppo locale

Installazione dipendenze:

```sh
bun install
```

Avvio dev server:

```sh
bun run dev
```

Build del pacchetto (dist/):

```sh
bun run build
```

## Pubblicazione

Autenticarsi su GitHub Packages (impostare `GITHUB_PACKAGES_TOKEN`):

```sh
export GITHUB_PACKAGES_TOKEN=ghp_xxx
bun publish
```

## ESLint avanzato

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
