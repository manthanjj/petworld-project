# PetWorld 🐾

Premium pet care, elevated. A luxury e-commerce experience crafted for pets and their humans.

## Tech Stack

- React 18 + TypeScript
- Vite 5
- React Router DOM v6
- Lucide React (icons)

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```
petworld/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/         # Static images, SVGs
│   ├── components/     # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── ProductCard.tsx
│   │   ├── CategorySection.tsx
│   │   ├── Marquee.tsx
│   │   ├── FeaturedBanner.tsx
│   │   └── CartDrawer.tsx
│   ├── hooks/          # Custom React hooks
│   │   ├── useCart.ts
│   │   └── useScrollReveal.ts
│   ├── pages/          # Route-level pages
│   │   ├── Home.tsx
│   │   ├── Shop.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── About.tsx
│   │   └── Cart.tsx
│   ├── types/          # TypeScript interfaces
│   │   └── index.ts
│   ├── styles/         # Global styles
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```
