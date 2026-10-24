# Urban Ride Bikes — bike-store-nuxt4

> Category: E-Commerce Template · Live: https://bike-store-sh1r00-817.netlify.app

## Functionality

An e-commerce bike store with catalog, cart, search, filtering, and a checkout flow.

- **Product catalog** — `app/pages/products.vue` and `app/pages/products/[id].vue` (detail). Product data in `app/data/products.ts` (`BikeProduct`: mountain / road / electric, brand, price, full specs).
- **Cart** — `app/pages/cart.vue`, `app/stores/cart.ts`, `app/composables/useCart.ts` / `app/composables/cart.ts`; add/remove/quantity management.
- **Search & filtering** — `app/components/molecules/MFilterBar.vue`, `MProductGrid.vue`.
- **Product store** — `app/stores/products.ts` + `app/composables/products.ts`.
- **Also included** — dark mode (SSR-safe via Pinia + `useCookie`), PWA (offline + install prompt), i18n (3 locales).

## Stack

- Nuxt 4 (`compatibilityVersion: 4`), Vue 3 `<script setup>`, TypeScript
- Pinia (stores: `cart`, `products`, `darkMode`, `pwaInstall`)
- Tailwind CSS (`@nuxtjs/tailwindcss`)
- `@nuxtjs/i18n` v10 — 3 locales (English, Español, አማርኛ), `strategy: 'prefix'`
- `@vite-pwa/nuxt` — service worker, offline caching, installable manifest
- `nuxt-security` — CSP (nonce-based), rate limiter, XSS validator (production only)
- Vitest + Vue Test Utils (unit), Playwright (e2e)

## Steps Taken

`git log --oneline` (newest first):

- `339efab` fix(netlify): root `/` redirect to `/en/` (prefix strategy) + SPA fallback to `/200.html`
- `26bb809` fix(netlify): node 24 + legacy-peer-deps (nuxt-security@2.6.0 needs >=24)
- `e44e924` fix(i18n+security): detectBrowserLanguage:false, `$t`→`t`, missing keys, CSP nonce, lazy i18n, branded PWA
- `ca2083f` fix README.md formatting
- `5cd3cda` convert README.txt to README.md with GitHub markdown formatting
- `4086de8` add README.txt with deploy instructions + project overview
- `08fc672` nuxt4 migration/creation + bike-store-nuxt4

## Pitfalls & Fixes

### Shared pitfalls (all shiro Nuxt 4 templates)

- **`nuxt-security@2.6.0` needs Node ≥ 24** — Netlify's default Node version is too old and the build fails. Fix: `NODE_VERSION = "24"` in `netlify.toml`.
- **esbuild peer conflict** — a peer dependency conflict (esbuild/rollup) aborts `npm install`. Fix: `npm install --legacy-peer-deps`.
- **i18n v10 `detectBrowserLanguage`** — browser detection causes unpredictable 302s on first load. Fix: `detectBrowserLanguage: false` and generate links with `const localePath = useLocalePath()`.
- **`$t()` is banned in `<template>`** — i18n v10 drops the global `$t()` template helper. Fix: `const { t } = useI18n()` in `<script setup>` and call `t('key')`.
- **Component auto-import `pathPrefix: false`** — default path-prefixed auto-import names don't match the tags, producing a blank screen. Fix: declare each component dir with `pathPrefix: false`.
- **PWA `navigateFallback`** — a precached SPA fallback serves non-precached URLs as the app shell → blank screen. Fix: `navigateFallback: null` and exclude `.html` from precache globs.
- **i18n `prefix` strategy root redirect** — with `strategy: 'prefix'` there is no page at `/`; Netlify must 302 `/` → `/en/`.
- **`defineProps()` without `const props =`** — in `<script setup>` you must capture the return value (`const props = defineProps<...>()`); otherwise destructuring throws "props is not defined".
- **SSG vs SSR output dirs** — `nuxt build` (SSR) writes `.output/server` + `.output/public`; `nuxt generate` (SSG) writes the static site to `.output/public` only. Netlify `publish` must point at `.output/public`.

### Project-specific

- **`pathPrefix: false` on atoms/molecules/organisms** — all three component dirs are declared with `pathPrefix: false`; tag names must match file names exactly.
- **Dynamic product route** — `products/[id].vue` requires the prerendered detail pages to resolve (and a SPA fallback `/*` → `/200.html` for client-side navigation).

## Deployment

Static site generation:

```bash
npm install --legacy-peer-deps
npm run generate   # → .output/public
```

Netlify (`netlify.toml`): `NODE_VERSION = "24"`, build command `npm install --legacy-peer-deps --no-audit --no-fund && npm run generate`, publish dir `.output/public`, redirects `/` → `/en/` (302) and `/*` → `/200.html` (200, SPA fallback).

Live: https://bike-store-sh1r00-817.netlify.app
