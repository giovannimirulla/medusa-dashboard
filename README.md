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

## Medusa Admin separato: variabili d'ambiente utili

Questo progetto usa `@medusajs/admin-vite-plugin` per caricare le estensioni Admin dei plugin.

- `VITE_MEDUSA_BACKEND_URL`: URL del backend Medusa (es. `https://medusa-backend-xxxx.onrender.com`).
- `VITE_MEDUSA_BASE`: base path dell'app admin (default `/`).
- `VITE_MEDUSA_STOREFRONT_URL`: URL dello storefront (opzionale).
- `VITE_MEDUSA_PROJECT`: percorso del progetto backend locale da cui scansionare le estensioni (utile in sviluppo), ad es. `/Users/<you>/medusa/backend`.
- `VITE_MEDUSA_SOURCES`: elenco separato da virgole di pacchetti npm che esportano `./admin` (utile in produzione su Vercel), ad es. `@scope/medusa-product-reviews,@scope/medusa-fulfillment-paccofacile`.

Note:
- In locale, imposta `VITE_MEDUSA_PROJECT` per montare le estensioni direttamente dal repo backend.
- Su Vercel, installa i pacchetti dei plugin nel `package.json` del dashboard e usa `VITE_MEDUSA_SOURCES` con i loro nomi; in alternativa, costruisci l'Admin dal backend con `medusa build --admin-only` e distribuisci l'output statico.

### Pacchetti privati su GitHub Packages

Se i plugin sono pubblicati su GitHub Packages (registry `https://npm.pkg.github.com/`), aggiungi `.npmrc` e imposta la variabile `NODE_AUTH_TOKEN` su Vercel (con permessi `read:packages`):

Contenuto `.npmrc`:

```
@giovannimirulla:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
registry=https://registry.npmjs.org/
```

Env minimi su Vercel:

- `NODE_AUTH_TOKEN`: token GitHub personale/CI con `read:packages`.
- `VITE_MEDUSA_BACKEND_URL`: URL del backend (Render).
- `VITE_MEDUSA_SOURCES`: es. `@giovannimirulla/medusa-product-reviews,@giovannimirulla/medusa-fulfillment-paccofacile`.
