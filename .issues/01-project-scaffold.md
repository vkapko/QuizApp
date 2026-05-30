# Issue #1: Project scaffold + route stubs

## What to build

Bootstrap the CRA project, install dependencies, create the full folder structure, and wire up React Router with three empty route stubs. The goal is a running app where all three routes resolve without crashing — no real content yet.

## Acceptance criteria

- [ ] `npx create-react-app quizapp` output committed (minus `node_modules`)
- [ ] `react-router-dom` installed and listed in `package.json`
- [ ] Folder structure exists: `src/api/`, `src/hooks/`, `src/pages/`, `src/components/`
- [ ] `App.jsx` wraps the app in `<BrowserRouter>` with routes for `/`, `/quiz/:categoryId`, and `/results`
- [ ] Each route renders a named stub component (e.g. `<Home />`, `<Quiz />`, `<Results />`) that returns a placeholder `<div>`
- [ ] `npm start` launches without errors
- [ ] `npm test` passes (default CRA smoke test)

## Blocked by

None — can start immediately.
