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

## Troubleshooting

### Can't access admin panel
- Ensure you have a Netlify Identity account
- Check that Git Gateway is enabled
- Clear browser cache and cookies

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
- Regular backups are recommended