# pixelcrush-frontend

A Next.js 15 frontend application with TypeScript and Tailwind CSS.

## Overview
This project is a modern web application built with the latest Next.js App Router architecture, configured for deployment in the Replit environment.

## Tech Stack
- **Framework**: Next.js 15.5.5
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Runtime**: Node.js 20
- **Build Tool**: Turbopack

## Project Configuration
- ✅ TypeScript enabled
- ✅ ESLint configured
- ✅ Tailwind CSS v4 with PostCSS
- ❌ No src/ directory (using app/ router)
- ✅ App Router architecture
- ✅ Import alias configured (@/*)

## Development Setup
The project is configured to run on port 5000 to work properly in the Replit environment.

### Key Configuration Files
- `next.config.ts`: Configured for iframe embedding with Content-Security-Policy headers and allowed dev origins
- `package.json`: Scripts for dev, build, start, and lint
- `tailwindcss.config.ts`: Tailwind v4 configuration
- `.gitignore`: Standard Next.js gitignore patterns

### Scripts
- `npm run dev`: Start development server on port 5000 with Turbopack
- `npm run build`: Build for production with Turbopack
- `npm start`: Start production server
- `npm run lint`: Run ESLint

## Project Structure
```
/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx (PixelCrush landing page)
├── components/
│   ├── Header.tsx
│   └── BottomNav.tsx
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## Features Implemented
- **Landing Page**: Full PixelCrush.ai homepage with hero section, character carousel, features grid, FAQ accordion, and CTA sections
- **Header Component**: Sticky navigation with logo and login link
- **Bottom Navigation**: Mobile-friendly bottom nav with Home, Characters, Chats, and Profile sections
- **Character Carousel**: Auto-rotating carousel showcasing AI companions with images and personalities
- **FAQ Section**: Collapsible accordion for frequently asked questions

## Recent Changes
- **October 16, 2025**: Homepage content updates
  - Updated homepage to match original HTML design exactly
  - Added all missing content sections (AI Boyfriend, chat/voice/image/video, AI relationships, subscription options, global support, user activities)
  - Added h3 and link styling to content sections
  - Fixed bottom navigation: changed "Gallery" to "Collection" and corrected Voice Call route to /video
  - Homepage now displays complete content with all sections from original design

- **October 16, 2025**: Built PixelCrush landing page
  - Created Header and BottomNav components
  - Implemented character carousel with auto-rotation
  - Added features grid and FAQ section
  - Fixed module resolution issues for component imports
  - Server running successfully on port 5000

- **October 15, 2025**: Initial Next.js setup with TypeScript, Tailwind CSS, and Replit configuration
  - Configured next.config.ts for iframe embedding (CSP headers)
  - Set up development server on port 5000
  - Added allowedDevOrigins for cross-origin requests
  - Configured workflow for automatic server restart

## Notes
- The app is configured with `frame-ancestors *` in CSP headers to work within Replit's iframe proxy environment
- Development server runs on port 5000 (required for Replit)
- Hot Module Reloading (HMR) WebSocket warnings in console are expected in the Replit environment and don't affect functionality
