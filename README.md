# YeonJae Kim — Portfolio

Awwwards-caliber portfolio for YeonJae Kim (Jenna), Senior UX/UI Product Designer at Cisco.

**Tech stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lenis

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
src/
  app/
    layout.tsx              Root layout: Lenis, cursor, navbar, page transitions
    page.tsx                Homepage (hero, marquee, project list, about teaser)
    about/page.tsx          About page with sticky sidebar + expandable experience
    work/[slug]/page.tsx    Dynamic project detail pages
  components/
    Cursor.tsx              Custom cursor (dot + trailing circle via Framer spring)
    Navbar.tsx              Fixed navbar with blur-on-scroll + mobile overlay menu
    PageTransition.tsx      Framer Motion AnimatePresence overlay transition
    LenisProvider.tsx       Lenis smooth scroll wrapper
    Hero.tsx                Full-viewport hero with staggered headline animation
    Marquee.tsx             Infinite ticker strip
    ProjectRow.tsx          Hoverable row with magnetic image reveal
    AboutTeaser.tsx         Homepage about section
    Footer.tsx              Footer with rotating arc decoration
  data/
    projects.ts             Typed Project array (9 projects)
  styles/
    globals.css             Tailwind base + Poppins + custom CSS
public/
  thumbnails/               Project images ([slug].png)
```

---

## Adding Project Images

Replace placeholder PNGs in `public/thumbnails/` with real images (recommended: 1600×900px):

`jpmorgan-chase.png` · `oxelife.png` · `travelu.png` · `2checkout.png` · `apa.png` · `youtube.png` · `kakaotalk.png` · `dermatology.png` · `pollie-pollie.png`

---

## Deployment to GitHub Pages

### 1. Build

```bash
npm run build
```

Outputs to `out/` (static export via `next.config.js`).

### 2. Push to GitHub

```bash
git init && git add . && git commit -m "Initial portfolio"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 3. GitHub Actions workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: out }
      - uses: actions/deploy-pages@v4
```

Go to **Settings → Pages → Source → GitHub Actions**.

### 4. Custom domain (optional)

Add `public/CNAME` with your domain: `yeonjaekim.com`

---

## Key Customizations

| File | What to change |
|------|---------------|
| `src/data/projects.ts` | Project list, descriptions, slugs |
| `src/styles/globals.css` | Colors, speeds, fonts |
| `src/app/about/page.tsx` | Bio, experience, skills |
| `src/components/Footer.tsx` | Email, social links |
