# Ajaya KC — IT Technician Portfolio

Recruitment-focused React/Vite website covering IT support skills, certifications, homelab projects, education, and contact details. Employment history and portrait photography are not displayed on the page.

## Run locally

```sh
npm ci --legacy-peer-deps
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

Publish the generated `dist` folder through the existing hosting provider. The site domain is `https://ajayakc.com/`. The existing Netlify-compatible `_redirects` file is retained. No hosting configuration or live deployment was changed as part of this update.

## Light and dark modes

The header includes an accessible dark-mode toggle. It follows the system colour preference until the visitor chooses a mode, then remembers that choice using localStorage. Storage-disabled browsers can still toggle themes for the current page. `public/theme.js` applies the initial theme before rendering.

## Update content

- `src/App.jsx`: profile, technical skills, certifications, homelab projects, education, email, and navigation.
- `src/App.css`: layout, colours, responsive styles, and reduced-motion support.
- `src/index.css`: global styles and font imports.
- `index.html`: page title, SEO description, canonical URL, and social metadata.
- `public/AJ_CV.docx`: downloadable resume supplied by the owner. This is the full resume and retains its employment history; that history is not rendered on the webpage.

Google IT Support, CompTIA Network+, and Azure Fundamentals are marked completed based on the owner's confirmation. The website lists the three certifications requested. Skills, projects, education, and contact details were updated from the supplied resume. Contact links open the visitor's email application; no email service credentials are needed.

## Validation

The light/dark update has not been production-built or browser-verified: the current environment blocks the build subprocess and elevated execution. Run `npm run build` before deploying this update. The previously generated deployment ZIP does not include the theme toggle.

Previous version checks:

Production build passed. Desktop and 390px mobile layouts were checked in a browser. Mobile navigation opens and closes on selection. All internal anchors resolve, there is no mobile horizontal overflow, and no portrait image is rendered. Email was not sent during testing.

The older portfolio components remain in the repository for reference but are not imported by the current app.

## Homepage particles

The right-hand content panel has been removed. The homepage uses a lightweight canvas network animation in `src/components/Home/HeroParticles.jsx`, with theme-aware colours, a pause control, reduced-motion support, and automatic suspension while off-screen or in a hidden tab. Desktop and mobile previews were checked in the running Vite server for both themes. The production build and deployment ZIP still need regeneration before publishing.

## Scroll animations

Body sections fade and rise into view once, with staggered cards. The native IntersectionObserver implementation in `src/useScrollReveal.js` respects reduced-motion preferences and preserves keyboard access. Scroll-triggered reveals and stagger delays were verified in the running preview.
