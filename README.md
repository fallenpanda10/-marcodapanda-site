# MarcoDaPanda — Eleventy Starter

## Prerequisites
- Node.js 18+ and npm installed
- GitHub account (for Git-based Netlify deploy)
- Netlify account (optional: you can drag-and-drop for quick test)

## Install locally
1. Clone or create a new repo and copy the project files.
2. In the project root run:
   npm install

## Run dev server (local preview)
npm run dev
- Eleventy will build and serve at http://localhost:8080 (or another port shown in terminal).
- Edit files in `src/` and the site will rebuild automatically.

## Build for production
npm run build
- Output is in `_site/`. This is what you deploy.

## Deploy to Netlify (recommended: Git-based)
1. Push your repo to GitHub.
2. In Netlify: Add new site → Import from Git → select your repo.
3. Build command: `npm run build`
   Publish directory: `_site`
4. Deploy. Configure domain in Site settings → Domain management.
5. Netlify will handle HTTPS via Let's Encrypt.

## Netlify Forms
- Contact form uses `data-netlify="true"`. Netlify will surface submissions in the site dashboard.
- For file uploads, enable the Netlify Forms file handling in your site settings.

## Notes & next steps
- Replace `panda-placeholder.svg` with your final SVG logo (separate colorable layers).
- Update `styles.css` tokens if you want to tweak colors.
- If you want a Markdown-first blog with tag pages, we can add Eleventy collections and templates next.
