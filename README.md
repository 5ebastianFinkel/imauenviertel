[![Netlify Status](https://api.netlify.com/api/v1/badges/01b8dcc7-da91-408e-b351-3621303bb4e9/deploy-status)](https://app.netlify.com/sites/imauenviertel/deploys)
[![CI](https://github.com/5ebastianFinkel/imauenviertel/actions/workflows/ci.yml/badge.svg)](https://github.com/5ebastianFinkel/imauenviertel/actions/workflows/ci.yml)
![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/5ebastianFinkel/imauenviertel)


# Im Auenviertel - Kleingartenverein

A modern website for the "Im Auenviertel" Kleingartenverein (German allotment garden association) built with Astro v5. The site provides information about garden activities, events, team members, and downloadable resources for garden members.

## 🌐 Live Site

Visit the website at: [https://imauenviertel.netlify.app](https://imauenviertel.netlify.app)

## 🚀 Tech Stack

- **[Astro v5](https://astro.build/)** - Static site generator with islands architecture
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety with strict configuration
- **[Vitest](https://vitest.dev/)** - Unit testing framework
- **[MDX](https://mdxjs.com/)** - Rich content authoring for blog posts

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
│   └── ui/           # Specific UI components
├── content/          # Content collections
│   ├── blog/         # Blog posts (Markdown/MDX)
│   ├── dates/        # Event dates for garden activities
│   ├── team/         # Team member profiles
│   └── config.ts     # Content collection schemas
├── layouts/          # Page layouts
├── pages/            # Site pages
├── utils/            # Utility functions
│   └── icsGenerator.ts # ICS calendar file generation
└── assets/           # Static assets
```

## 🛠️ Development

### Prerequisites

- Node.js 16.12.0 or higher
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

# Build for production
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
- **Document Downloads** - PDF resources in `public/downloads/`
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Type Safety** - Full TypeScript support with strict configuration
- **Testing** - Unit tests with Vitest
- **SEO Optimized** - Built-in SEO components and sitemap generation

## 📝 Content Management

Content is managed through Astro's content collections:

- **Blog Posts**: Add Markdown/MDX files to `src/content/blog/`
- **Events**: Add event data to `src/content/dates/`
- **Team Members**: Add profiles to `src/content/team/`
- **Documents**: Place PDFs in `public/downloads/`

## 🔧 Path Aliases

The project uses TypeScript path aliases for cleaner imports:

- `@components/*` → `src/components/*`
- `@utils/*` → `src/utils/*`
- `@layouts/*` → `src/layouts/*`
- `@assets/*` → `src/assets/*`
- `@pages/*` → `src/pages/*`
- `@lib/*` → `src/lib/*`

## 📦 Recent Updates

- ✅ Upgraded from Astro v4 to v5
- ✅ Upgraded from Tailwind CSS v3 to v4
- ✅ Added calendar functionality with ICS file generation
- ✅ Enhanced event management system

## 🚀 Deployment

The site is automatically deployed to Netlify when changes are pushed to the main branch. The deployment status is shown in the badge at the top of this README.

## 📄 License

This project is private and intended for the Im Auenviertel Kleingartenverein.
