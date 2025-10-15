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
│   └── page.tsx
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

## Recent Changes
- **October 15, 2025**: Initial Next.js setup with TypeScript, Tailwind CSS, and Replit configuration
  - Configured next.config.ts for iframe embedding (CSP headers)
  - Set up development server on port 5000
  - Added allowedDevOrigins for cross-origin requests
  - Configured workflow for automatic server restart

## Notes
- The app is configured with `frame-ancestors *` in CSP headers to work within Replit's iframe proxy environment
- Development server runs on port 5000 (required for Replit)
- Hot Module Reloading (HMR) WebSocket warnings in console are expected in the Replit environment and don't affect functionality
