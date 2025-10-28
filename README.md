# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
## TaskManagementUI

A minimal React + Vite starter for a Task Management UI with HMR and basic ESLint rules. This repository is intended as a lightweight foundation for building a task tracking interface with fast local development and a straightforward production build.

### Features
- React with Vite for fast dev server and HMR
- ESLint configured for basic linting
- Optional React Compiler (see React docs) and SWC/Babel plugin options

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm 8+ or yarn/pnpm

### Quick start
1. Install dependencies
    - npm: `npm install`
    - yarn: `yarn`
2. Start dev server
    - npm: `npm run dev`
    - yarn: `yarn dev`
3. Build for production
    - npm: `npm run build`
    - yarn: `yarn build`
4. Preview production build locally
    - npm: `npm run preview`
    - yarn: `yarn preview`

### Available scripts
- dev — Start Vite dev server with HMR
- build — Create an optimized production build
- preview — Local preview of the production build
- lint — Run ESLint
- format — Run Prettier (if configured)

(Use `npm run <script>` or `yarn <script>` depending on your package manager.)

### Project structure (recommended)
- src/ — Application source code
  - components/ — Reusable UI components
  - pages/ — Route-level components / views
  - services/ — API and business logic
  - hooks/ — Custom React hooks
  - styles/ — Global styles and variables
  - main.jsx — App entry point
- public/ — Static assets
- vite.config.* — Vite configuration
- .eslintrc.* — ESLint configuration

### Linting & formatting
- ESLint is included for basic rules. For stricter checks in production apps, use TypeScript + type-aware ESLint rules (see typescript-eslint).
- Optionally add Prettier for consistent code formatting and run via `npm run format`.

### React Compiler / Plugins
The React Compiler is disabled by default due to build/dev performance trade-offs. To opt in, follow the React Compiler installation docs:
https://react.dev/learn/react-compiler/installation

For Fast Refresh you can use either:
- @vitejs/plugin-react (Babel) or
- @vitejs/plugin-react-swc (SWC)

### Environment variables
Place environment-specific variables in .env, .env.local, and follow Vite's naming conventions (VITE_ prefix for client-exposed variables).

### Contributing
- Open issues for bugs and feature requests
- Submit pull requests with focused changes and clear descriptions
- Run linters and tests (if any) before submitting

### Troubleshooting
- If HMR isn't working, clear browser cache and restart the dev server.
- For build errors, ensure Node version matches the repo requirement and dependencies are up to date.

### License
Specify a license in LICENSE file (MIT recommended for starters).

If you want, I can generate example package.json scripts, ESLint config, or a base folder structure now.