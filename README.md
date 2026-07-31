# New Hampshire North

**Clear Reporting from the Granite State.**

A statewide digital news publication for New Hampshire, built with Next.js App Router, TypeScript, and Tailwind CSS. Content is stored entirely as Markdown files — there is no database, no CMS, and no authentication layer.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

To build for production:

```bash
npm run build
npm run start
```

The production build completes with no TypeScript errors, no ESLint errors, and no prerendering failures. Every route — home, category archives, regional archives, tag archives, articles, and search — is safe against missing images, invalid dates, and empty content sets.

## Project Structure

```text
src/app/            Route handlers, pages, sitemap, robots
src/components/     Shared UI and homepage "chapter" components
src/lib/            Content engine: articles, categories, locations, search, pagination, metadata
src/types/          Shared TypeScript types
content/articles/   All published Markdown articles
public/images/      Placeholder/fallback image assets
```

## Editorial Naming System

New Hampshire North uses plain technical slugs for routes and Markdown frontmatter, but displays distinctive editorial names in navigation and headings:

| Technical category   | Route                        | Editorial name        |
| --------------------- | ----------------------------- | ---------------------- |
| `new-hampshire`        | `/category/new-hampshire`     | The Granite State       |
| `politics`             | `/category/politics`          | Civic House             |
| `business`             | `/category/business`          | Working North           |
| `technology`           | `/category/technology`        | Working North           |
| `environment`          | `/category/environment`       | White Mountains         |
| `travel`               | `/category/travel`            | The Short Coast         |
| `beauty-wellness`      | `/category/beauty-wellness`   | Well & Good             |
| `sports`               | `/category/sports`            | Winter Game             |
| `culture`              | `/category/culture`           | Lantern Hours           |
| `opinion`              | `/category/opinion`           | The Independent View    |

Local coverage is organized by town and region under `/local/[location]` (e.g. `/local/manchester`, `/local/white-mountains`), and the `/town-lines` page provides a regional index of every location.

## Publishing a New Article

New Hampshire North supports an unlimited number of Markdown articles. Publishing a new story does **not** require any application source code changes.

1. Create a new `.md` file inside `content/articles/`. The filename becomes the article's slug unless overridden by frontmatter.
2. Add valid YAML frontmatter:

   ```yaml
   ---
   title: "Your Headline Here"
   slug: "your-headline-here"
   excerpt: "A one or two sentence summary of the story."
   date: "2026-08-01"
   author: "Your Name"
   authorRole: "Staff Writer"
   category: "new-hampshire"
   location: "Manchester"
   image: "https://images.unsplash.com/photo-xxxxxxx?w=1600&q=80"
   featured: false
   breaking: false
   tags:
     - Example Tag
   ---
   ```

   Valid `category` values: `new-hampshire`, `politics`, `business`, `technology`, `environment`, `travel`, `beauty-wellness`, `sports`, `culture`, `opinion`.

   Valid `location` values (optional, used for `/local/[location]` archives): `Manchester`, `Nashua`, `Concord`, `Portsmouth`, `Dover`, `Keene`, `Derry`, `Exeter`, `Hampton`, `Rye`, `Berlin`, `Littleton`, `North Conway`, `Hanover`, `Lebanon`, `Laconia`, `Rochester`, `Southern New Hampshire`, `Central New Hampshire`, `Seacoast`, `Monadnock Region`, `Lakes Region`, `White Mountains`, `North Country`, `Rural New Hampshire`. Any other string is stored but will not appear in a regional archive.

3. Write the article body in Markdown below the frontmatter — paragraphs, `##`/`###` headings, lists, blockquotes, links, bold/italic, and images are all supported.
4. Commit the file and push to your Git remote.
5. Redeploy (or let your host's automatic deploy pick up the new commit).

The new article will automatically appear in:

- Its category archive (`/category/[category]`)
- Its regional archive (`/local/[location]`), if a valid location is set
- Every matching tag archive (`/tag/[tag]`)
- Site search (`/search` and `/api/search`)
- The sitemap (`/sitemap.xml`)
- Related-articles panels on other stories in the same category, tags, or location

Homepage sections show a curated, limited selection of recent and featured stories — that display limit is not a publishing limit. The full archive (`/archive`), category pages, and regional pages always provide access to every valid article, with pagination for large collections.

## Environment Variables

Set `NEXT_PUBLIC_SITE_URL` to your production URL so canonical links, Open Graph tags, and the sitemap resolve correctly:

```text
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

If unset, it safely falls back to `http://localhost:3000`.

## Git & Deployment

```bash
git init
git add .
git commit -m "Initial New Hampshire North website"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

### Deploying to Vercel

1. Import the repository at [vercel.com/new](https://vercel.com/new).
2. Framework preset: Next.js (auto-detected).
3. Add the `NEXT_PUBLIC_SITE_URL` environment variable in the project's Vercel settings, set to your production domain.
4. Deploy. Every subsequent push to your main branch redeploys automatically.

No database, API keys, or external services are required for the site to build or run.

## Images

Remote images are restricted to `images.unsplash.com` via `next.config.ts`. Any missing, empty, or disallowed image URL in an article's frontmatter automatically falls back to a local placeholder graphic in `public/images/`, so a broken or omitted image never breaks a build or a page render.

## Design System

- **Typography:** Fraunces for the logo, major headlines, article titles, and pull quotes; Public Sans for body copy, navigation, and UI; Roboto Mono for coordinates, edition numbers, and civic document labels.
- **Color:** A restrained cold-weather palette — night, slate, and granite for dark editorial surfaces; frost and snow for light chapter transitions; copper and amber used sparingly for editorial markers and warm interior-light accents. Defined in `src/app/globals.css`.
- **Layout:** Square corners throughout, thin hairline rules as a recurring brand device, no repeated card-grid — every homepage chapter (The Cold Open, Morning Report, The Granite State, Town Lines, White Mountains, Civic House, Working North, The Short Coast, Well & Good, Winter Game, Lantern Hours, The Independent View, North Archive) has its own distinct composition, alternating between cold dark surfaces and warmer frost/snow surfaces.

## Sample Content

The initial site ships with 57 original articles distributed across all ten categories and every New Hampshire region listed above. This is demonstration content only — it is not a publishing limit. The architecture supports hundreds or thousands of Markdown articles without any source code changes.
