# Urban Ride Bikes
*shiro — where style meets function*

**Category: E-Commerce Template**  
**Live:** [https://bike-store-sh1r00-817.netlify.app](https://bike-store-sh1r00-817.netlify.app)  
**GitHub:** [bike-store-nuxt4](https://github.com/sh1r00/bike-store-nuxt4)  

## About This Project

E-commerce bike store. Product catalog, shopping cart, search, filtering, and checkout flow.

**Tech:** 
Nuxt 4, Vue 3, Tailwind CSS, Dark Mode, PWA, i18n (3 locales), M3 Design

[![shiro](https://img.shields.io/badge/shiro-where_style_meets_function-6C5CE7)](https://shiro-portfolio-sh1r00.netlify.app)

## Deployment

```bash
npx nuxi generate
```bash
Deploy .output/public to Netlify via API zip upload.
```

## Quick Start (Local Development)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run generate
   ```

4. Preview production build:
   ```bash
   npx serve .output/public
   ```

## Notes

- Built with Nuxt 4 (compatibilityVersion 4) and Vue 3 Composition API
- All projects use atomic design: atoms/ → molecules/ → organisms/
- Dark mode SSR-safe via Pinia store with useCookie() persistence
- PWA configured with service worker for offline access
- i18n supports 3 locales: English, Espanyol, Amharic

---

*Made with ❤️ by shiro — rasisg@gmail.com — github.com/sh1r00*
