[![Netlify Status](https://api.netlify.com/api/v1/badges/01b8dcc7-da91-408e-b351-3621303bb4e9/deploy-status)](https://app.netlify.com/sites/imauenviertel/deploys)
[![CI](https://github.com/5ebastianFinkel/imauenviertel/actions/workflows/ci.yml/badge.svg)](https://github.com/5ebastianFinkel/imauenviertel/actions/workflows/ci.yml)
![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/5ebastianFinkel/imauenviertel?utm_source=oss&utm_medium=github&utm_campaign=5ebastianFinkel%2Fimauenviertel&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)


# Im Auenviertel - Kleingartenverein

A modern website for the "Im Auenviertel" Kleingartenverein (German allotment garden association) built with TanStack Start. The site provides information about garden activities, events, team members, and downloadable resources for garden members.

## 🌐 Live Site

Visit the website at: [https://imauenviertel.netlify.app](https://imauenviertel.netlify.app)

## 🚀 Tech Stack

- **[TanStack Start](https://tanstack.com/start)** - React framework with file-based routing, prerendered to static HTML
- **[Content Collections](https://www.content-collections.dev/)** - Typed Markdown content
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety with strict configuration
- **[Vitest](https://vitest.dev/)** - Unit testing framework

## 📁 Project Structure

```
content-collections.ts  # Content collection schemas
vite.config.ts          # TanStack Start, prerendering, Tailwind, images
src/
├── components/        # React components
│   └── ui/           # Specific UI components
├── content/          # Content collections (Markdown)
│   ├── blog/         # Blog posts
│   ├── events/       # Event dates for garden activities
│   ├── team/         # Team member profiles
│   ├── documents/    # Downloadable documents
│   └── links/        # External links
├── routes/           # Site pages (file-based routing)
│   └── __root.tsx    # Document shell and layout
├── styles/           # Global, component and page styles
├── utils/            # Utility functions
│   └── icsGenerator.ts # ICS calendar file generation
└── assets/           # Images processed at build time
```

## 🛠️ Development

### Prerequisites

- Node.js 22.12.0 or higher
- pnpm (package manager)

### Installation

```bash
# Clone the repository
git clone [repository-url]
cd imauenviertel

# Install dependencies
pnpm install
```

### Development Commands

```bash
# Start development server
pnpm dev

# Build for production (static site in dist/client)
pnpm build

# Preview production build
pnpm preview

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with UI
pnpm test:ui
```

## ✨ Features

- **Event Management** - Calendar functionality with downloadable ICS files
- **Content Collections** - Organized blog posts, events, and team profiles
- **Document Downloads** - PDF resources in `public/uploads/`
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Type Safety** - Full TypeScript support with strict configuration
- **Testing** - Unit tests with Vitest
- **SEO Optimized** - Per-page head tags and sitemap generation

## 📝 Content Management

Content is managed through content collections (schemas in `content-collections.ts`), either by editing the files or through Decap CMS at `/admin`:

- **Blog Posts**: Add Markdown files to `src/content/blog/`
- **Events**: Add event data to `src/content/events/`
- **Team Members**: Add profiles to `src/content/team/`
- **Documents**: Add an entry to `src/content/documents/` and place the PDF in `public/uploads/`
- **Links**: Add an entry to `src/content/links/`

## 🔧 Path Aliases

The project uses TypeScript path aliases for cleaner imports:

- `@components/*` → `src/components/*`
- `@utils/*` → `src/utils/*`
- `@assets/*` → `src/assets/*`
- `content-collections` → generated content (`.content-collections/generated`)

## 📦 Recent Updates

- ✅ Migrated from Astro to TanStack Start
- ✅ Upgraded from Tailwind CSS v3 to v4
- ✅ Added calendar functionality with ICS file generation
- ✅ Enhanced event management system

## 🚀 Deployment

The site is prerendered to static files (`dist/client`) and automatically deployed to Netlify when changes are pushed to the main branch. The deployment status is shown in the badge at the top of this README.

## 📄 License

This project is private and intended for the Im Auenviertel Kleingartenverein.
