# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro v5 website for "Im Auenviertel" Kleingartenverein (German allotment garden association). The site includes event management, blog posts, team profiles, and document downloads.

## Commands

### Development
- `pnpm dev` - Start development server
- `pnpm build` - Build for production  
- `pnpm preview` - Preview production build

### Testing
- `pnpm test` - Run all tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:ui` - Run tests with Vitest UI

### Linting
- `pnpm lint` - Run oxlint on all source files
- `pnpm lint:fix` - Run oxlint with auto-fix for fixable issues
- `pnpm lint:ci` - Run oxlint for CI environments (fails on warnings)

### Type Checking
- `pnpm typecheck` - Run TypeScript type checking without emitting files
- `pnpm typecheck:watch` - Run TypeScript type checking in watch mode
- `pnpm typecheck:ci` - Run strict TypeScript type checking for CI environments

## Architecture

### Framework Stack
- **Astro v5** - Static site generator with islands architecture
- **Tailwind CSS v4** - Utility-first CSS framework (using Vite plugin)
- **TypeScript** - Type safety with strict null checks enabled
- **Vitest** - Unit testing framework
- **MDX** - Rich content authoring for blog posts

### Content Management
Uses Astro's content collections pattern:
- `src/content/blog/` - Blog posts in Markdown/MDX
- `src/content/dates/` - Event dates for garden activities
- `src/content/team/` - Team member profiles
- `src/content/config.ts` - Content collection schemas

### Key Features
- **ICS Calendar Generation** - `src/utils/icsGenerator.ts` creates downloadable calendar files
- **Event Management** - Calendar button component with download functionality
- **Document Downloads** - PDF files in `public/downloads/`
- **Multilingual Content** - German-language focused site

### Path Aliases
Configured in `tsconfig.json`:
- `@components/*` → `src/components/*`
- `@utils/*` → `src/utils/*`
- `@layouts/*` → `src/layouts/*`
- `@assets/*` → `src/assets/*`
- `@pages/*` → `src/pages/*`
- `@lib/*` → `src/lib/*`

### Deployment
- Deployed on Netlify
- Site URL: https://imauenviertel.netlify.app
- Netlify deploy status badge in README.md

### Recent Changes
- Upgraded from Astro v4 to v5 (see ASTRO5_MIGRATION.md)
- Upgraded from Tailwind CSS v3 to v4
- Added calendar functionality with ICS file generation