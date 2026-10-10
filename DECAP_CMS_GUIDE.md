# Decap CMS Guide

## Overview
Decap CMS (formerly Netlify CMS) has been integrated into the Im Auenviertel website to provide a user-friendly interface for managing content.

## Access
- **Local Development**: http://localhost:4321/admin
- **Production**: https://imauenviertel.netlify.app/admin

## Setup Requirements

### 1. Enable Netlify Identity
1. Go to your Netlify dashboard
2. Navigate to Site Settings → Identity
3. Click "Enable Identity"
4. Under Registration, choose either:
   - Open registration (anyone can sign up)
   - Invite-only (recommended for security)

### 2. Enable Git Gateway
1. In Identity settings, go to Services → Git Gateway
2. Click "Enable Git Gateway"
3. This allows the CMS to commit changes to your repository

### 3. Invite Users
1. In Identity → Users
2. Click "Invite users"
3. Enter email addresses of content editors
4. They'll receive an invitation to create an account

## Content Collections

### Blog Posts (`/src/content/blog/`)
- **Fields**: Title, Image, Publish Date, Author, Category, Tags, Content
- **File naming**: Use kebab-case (e.g., `mein-neuer-beitrag.md`)

### Events/Dates (`/src/content/dates/`)
- **Fields**: Title, Date, Description
- **File naming**: `{event-type}-{month}.md` (e.g., `gemeinschaftsarbeit-april.md`)

### Team Members (`/src/content/team/`)
- **Fields**: Name, Title, Avatar, Publish Date
- **File naming**: `{number}_{firstname}_{lastname}.md`

### Documents (`/public/downloads/`)
- **Upload PDF files for member downloads**
- Files are publicly accessible

## Usage

1. Navigate to `/admin` on your site
2. Log in with your Netlify Identity credentials
3. Select a collection to edit
4. Make your changes using the visual editor
5. Click "Save" to create a draft
6. Click "Publish" to commit changes to the repository

## Media Management
- Images are stored in `/public/uploads/`
- Use the media library to upload and manage images
- Supported formats: JPG, PNG, WebP, GIF

## Workflow
1. **Draft**: Changes are saved locally in the CMS
2. **Review**: Preview your changes before publishing
3. **Publish**: Commits changes to the Git repository
4. **Deploy**: Netlify automatically rebuilds the site

## Updating Decap CMS
The CMS script is loaded from unpkg with a pinned version and a Subresource Integrity (SRI) hash, so the browser refuses to run it if the file served by the CDN is ever altered. The script tag appears in **two files**, which must stay identical:

- `public/admin/index.html` (served in production)
- `src/pages/admin/index.astro` (used by the dev server)

```html
<script src="https://unpkg.com/decap-cms@3.16.3/dist/decap-cms.js"
        integrity="sha384-..."
        crossorigin="anonymous"></script>
```

To upgrade:

1. Find the latest 3.x release and its publish date:
   ```bash
   npm view decap-cms@^3 version
   npm view decap-cms time --json | grep '"3\.'
   ```
   Prefer a release that is at least two weeks old, and check the [changelog](https://github.com/decaporg/decap-cms/releases) for breaking changes.
2. Compute the SRI hash for the new version (replace `X.Y.Z`):
   ```bash
   curl -sSfL https://unpkg.com/decap-cms@X.Y.Z/dist/decap-cms.js \
     | openssl dgst -sha384 -binary | openssl base64 -A
   ```
   Optionally cross-check against jsDelivr (`https://cdn.jsdelivr.net/npm/decap-cms@X.Y.Z/dist/decap-cms.js`); both hashes must match.
3. Update the version in the `src` URL and set `integrity="sha384-<hash>"` in **both** files.
4. Run `pnpm build` and confirm `dist/admin/index.html` contains the new tag, then open `/admin` with `pnpm dev` and log in to verify the CMS loads.

Never use a version range (e.g. `@^3.0.0`) together with `integrity`: a range resolves to new files over time and the hash would stop matching.

The Netlify Identity widget (`identity.netlify.com/v1/netlify-identity-widget.js`) has no SRI hash because Netlify updates that file in place.

## Troubleshooting

### Can't access admin panel
- Ensure you have a Netlify Identity account
- Check that Git Gateway is enabled
- Clear browser cache and cookies

### Admin panel stays blank
- Open the browser console. An error like `Failed to find a valid digest in the 'integrity' attribute` means the SRI hash doesn't match the script. Recompute it as described in [Updating Decap CMS](#updating-decap-cms) and make sure the version and hash are identical in both admin files.

### Changes not appearing
- Ensure changes are published (not just saved)
- Wait for Netlify to rebuild the site (1-2 minutes)
- Check the Netlify deploy logs

### Authentication errors
- Verify Git Gateway is properly configured
- Check that your user has appropriate permissions
- Try logging out and back in

## Security Notes
- Only invited users can access the CMS
- All changes are tracked in Git history
- The CMS script is version-pinned and SRI-protected (see [Updating Decap CMS](#updating-decap-cms))
- Regular backups are recommended