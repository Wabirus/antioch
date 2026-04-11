# Antioch Independent Baptist Churches of Kenya

![Antioch Banner](public/images/antioch-logo.png)

> **"A Digital Stained Glass Window"** — Creating a welcoming, modern, and spiritual digital front door for our community.

[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

## 🌟 Mission & Inspiration

This project is not just a website; it is an extension of the church's ministry. Our goal is to create a digital experience that reflects the warmth, excellence, and life-changing message of the Gospel.

**Inspired by [Elevation Church](https://elevationchurch.org/)**, we prioritized:
*   **Visual Impact**: High-quality imagery and clean typography.
*   **Intuitive Navigation**: A simplified, visitor-centric menu structure (Left Drawer + Right Actions).
*   **Engagement**: Removing barriers to "Watch", "Give", and "Plan a Visit".

---

## 🚀 Key Features

### 1. Modern "Elevation-Style" Navigation
We implemented a custom navigation system that mimics the best-in-class church experience:
*   **Dynamic Header**: Transparent on hero, white on scroll.
*   **Action-Oriented**: "New Here", "Watch", and "Give" are always one click away.
*   **Full-Screen Menu**: A smooth, slide-out drawer for deep navigation ("Get Involved", "Discover").

### 2. Digital Sermon Library (`/sermons`)
A Netflix-style experience for the Word:
*   **Searchable**: Filter by Series, Speaker, or Topic.
*   **Metadata Rich**: Date, scripture reference, and duration visibility.

### 3. Interactive Events Calendar (`/events`)
Keeping the body connected:
*   **Month-Grouped View**: Easy scanning of upcoming activities.
*   **Digital Integration**: "Add to Calendar" functionality for Google/Apple users.

### 4. Ministry Directory (`/ministries`)
Helping members find their tribe:
*   **Categorized**: Kids, Youth, Men, Women, Outreach.
*   **Visual Cards**: Engaging previews of each group.

### 5. Secure Giving Portal (`/give`)
Making generosity simple and trustworthy:
*   **Clear Options**: Recurring, One-Time, and Mission-specific giving.
*   **Privacy Focused**: Bank-grade security assurance UI.

---

## 🛠️ Technology Stack

Built on the bleeding edge of React and Web standards:

| Layer | Technology |
|-------|------------|
| **Framework** | [Next.js 15 (App Router)](https://nextjs.org) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) + [clsx](https://github.com/lukeed/clsx) |
| **Components** | [shadcn/ui](https://ui.shadcn.com/) (Radix UI Primitives) |
| **Icons** | [Lucide React](https://lucide.dev/) |

---

## 🏁 Getting Started

**Requirements:** Node.js **20** (see `.nvmrc`).  Node 20 is the LTS release and avoids the engine warnings that occur on Node 22.

Use the version manager of your choice to set Node 20 before installing. For example with [nvm](https://github.com/nvm-sh/nvm):

```bash
nvm install # reads .nvmrc and installs Node 20
nvm use
node -v       # should print v20.x.x
```

Install packages normally once the correct Node is active:

```bash
npm install
# or
pnpm install
# or
yarn install
```
> npm 9+ will enforce peer deps, so the repo has been updated to avoid conflicts; you **no longer** need `--legacy-peer-deps`.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## �️ Remote Image Hosts

This project uses `next/image` for optimized image loading. External image URLs from services like Pexels or YouTube previews must be allowed in `next.config.ts` using `images.remotePatterns`.

Example hosts already enabled in this repo:
- `images.pexels.com`
- `img.youtube.com`
- `i.ytimg.com`

If you add images from another external host, add that host to `remotePatterns` in `next.config.ts` so Next.js can fetch and optimize them.

---

## �🗺️ Roadmap & Future Development

We are actively developing Phase 4 (Advanced Features) and Phase 5 (Polish).
See `github_issues_plan.md` for detailed issue tracking.

- [x] **Phase 1**: Foundation & Component Architecture
- [x] **Phase 2**: Core Pages (Sermons, Giving)
- [x] **Phase 3**: Content (Ministries, Leadership, Events)
- [ ] **Phase 4**: Member Portal & Advanced Search
- [ ] **Phase 5**: Professional Photography & SEO

---

## 🤝 Contributing

We welcome code contributions from the ministry team!
1.  Fork the repo.
2.  Create a feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

---

*Built with ❤️ for Antioch Independent Baptist Churches.*
