# Drop Qwik → React + MDX Resume Site

Date: 2026-07-11
Status: Approved

## Background

The Vite+ (vp) migration left the Qwik build broken: Qwik's optimizer `manualChunks`
returns path-like chunk names (`../node_modules/.../index.qwik.mjs_entry_ErrorBoundary`)
which Rolldown rejects as invalid `[name]` substitutions (`INVALID_OPTION`). Qwik 1.20.0
still has no Rolldown support. Decision: drop Qwik entirely.

## Goal

creejee.github.io is a resume site. Rebuild it as a React SPA with MDX content,
deployed to GitHub Pages. Content will later be tailored for a Toss Insurance
application (job_id 4076130003).

## Design

**Stack**: Vite+ (vp, kept as-is) + React 19 + MDX + Tailwind 4 + daisyUI.
Rendering: SPA (no prerender — resume is not SEO-critical; avoids further
Rolldown-compat tooling risk).

### Remove

- Deps: `@builder.io/qwik`, `@builder.io/qwik-city`, `eslint-plugin-qwik`
- Files: `src/entry.dev.tsx`, `src/entry.preview.tsx`, `src/entry.ssr.tsx`,
  `src/root.tsx`, `src/routes/`, `qwik.env.d.ts`
- Config: `qwikCity()`/`qwikVite()` plugins, `qwik/*` lint rules,
  qwik dep-check util in `vite.config.ts`, `qwik build` scripts in `package.json`

### Add

- Deps: `react`, `react-dom`, `@vitejs/plugin-react-oxc`, `@mdx-js/rollup`,
  `@types/react`, `@types/react-dom`
- Files: `index.html`, `src/main.tsx`, `src/App.tsx`, `src/content/resume.mdx`
  (migrated from `resume/resume.md`)
- Replace `vite-tsconfig-paths` plugin with native `resolve.tsconfigPaths: true`

### Styling

Tailwind 4 + daisyUI kept. MDX elements styled via component mapping
(`MDXProvider` / `components` prop).

### Deployment

`.github/workflows/deploy.yml`: on push to master → pnpm install → `vp build`
→ `actions/deploy-pages` publishing `dist/`. User site, so `base: "/"`.

### Verification

`vp check`, `vp build` (must pass — Qwik manualChunks root cause is gone),
`vp preview` smoke check.
