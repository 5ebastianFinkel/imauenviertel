# CMS Guide

The site's content is edited with [Sveltia CMS](https://sveltiacms.app/), a Git-based CMS. Every change is saved as a commit to the `main` branch of the GitHub repository, and Netlify then rebuilds the site.

- **Production**: https://imauenviertel.netlify.app/admin/
- **Configuration**: `public/admin/config.yml` (collections, fields, media)
- **Page**: `public/admin/index.html` (loads the pinned Sveltia script)

## Setup (once, by the repository owner)

### 1. GitHub OAuth app
1. On GitHub, open Settings → Developer settings → OAuth Apps → New OAuth App (for an organization: the organization's settings).
2. Application name and homepage: anything, e.g. "Im Auenviertel CMS" and `https://imauenviertel.netlify.app`.
3. Authorization callback URL: `https://api.netlify.com/auth/done`
4. Register the app, copy the Client ID, generate a Client Secret and copy it.

### 2. Netlify OAuth provider
1. Netlify dashboard → the site → Project configuration → Security → OAuth (not the Identity section).
2. Install Provider → GitHub → paste Client ID and Client Secret → Save.

### 3. Cloudinary
Images are uploaded to the Cloudinary cloud `dc6swddrn`. The CMS opens Cloudinary's media library, where each editor signs in with their own Cloudinary login: invite editors in the Cloudinary console under user management. The API key in `config.yml` is public; never add the API secret.

## Editors

### Adding an editor
1. The editor creates a free GitHub account.
2. Repository → Settings → Collaborators → Add people → the editor's GitHub name, role **Write**.
3. Optional: invite them to Cloudinary (see above). Without a Cloudinary login they can still upload photos to the repository.

### Removing an editor
Remove them from the repository's collaborators and from Cloudinary.

## Using the CMS
1. Open `/admin/` and sign in with GitHub. The interface follows the browser language (German is available) and can be changed in the settings.
2. Pick a collection (Blog Beiträge, Termine, Team Mitglieder, Dokumente, Links), edit, and save. Saving commits to `main`; the site is live again after Netlify's build (1–2 minutes).
3. Mark an entry as "Entwurf" to keep it off the site. Blog posts and team members with a future publish date appear with the first build after that date.

### Images
- **Cloudinary** (preferred for photos): originals of any size; visitors get resized versions (`src/utils/images.ts`).
- **Repository upload**: photos are converted to WebP and scaled to at most 2048 px before they are committed to `public/uploads/`, so large phone photos (including HEIC) don't bloat the repository.
- **PDFs** for the Dokumente collection always go to `public/uploads/` (Cloudinary is disabled for that field). Maximum file size: 10 MB.

## Local development
`pnpm dev` serves the CMS at http://localhost:4321/admin/. In Chrome or Edge, "Work with Local Repository" edits the files of your checkout directly, without signing in; commit the changes yourself.

## Updating Sveltia CMS
The script is loaded from unpkg with a pinned version and a Subresource Integrity (SRI) hash, so the browser refuses to run it if the file on the CDN is ever altered.

1. Find a release that is at least two weeks old and check the [release notes](https://github.com/sveltia/sveltia-cms/releases):
   ```bash
   npm view @sveltia/cms time --json | tail -20
   ```
2. Compute the SRI hash (replace `X.Y.Z`) and cross-check it against jsDelivr; both must match:
   ```bash
   curl -sSfL https://unpkg.com/@sveltia/cms@X.Y.Z/dist/sveltia-cms.js | openssl dgst -sha384 -binary | openssl base64 -A
   curl -sSfL https://cdn.jsdelivr.net/npm/@sveltia/cms@X.Y.Z/dist/sveltia-cms.js | openssl dgst -sha384 -binary | openssl base64 -A
   ```
3. Update the version in the `src` URL and `integrity="sha384-<hash>"` in `public/admin/index.html`.
4. Run `pnpm build`, open `/admin/` with `pnpm dev` and check that the sign-in screen appears without console errors.

Never use a version range (e.g. `@sveltia/cms@0`) together with `integrity`: a range resolves to new files over time and the hash would stop matching. Sveltia loads its UI translations from the same pinned version on unpkg.

## Troubleshooting

### Admin page stays blank
Open the browser console. `Failed to find a valid digest in the 'integrity' attribute` means version and hash in `public/admin/index.html` don't belong together; recompute the hash.

### Sign-in fails
- Check the Netlify OAuth provider (Project configuration → Security → OAuth) and the callback URL of the GitHub OAuth app.
- The editor needs the Write role on the repository.

### Changes don't appear
- Check the Netlify deploy log; the build validates all content (`content-collections.ts`) and fails on invalid fields.
- Entries marked "Entwurf" or with a future publish date are hidden on purpose.
