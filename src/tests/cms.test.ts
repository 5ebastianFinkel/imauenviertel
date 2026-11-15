import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { load } from 'js-yaml';
import { CLOUDINARY_CLOUD } from '../utils/images';

const read = (file: string) => fs.readFileSync(path.join(process.cwd(), file), 'utf8');
const config = load(read('public/admin/config.yml')) as any;
const adminHtml = read('public/admin/index.html');

describe('Sveltia CMS configuration', () => {
  it('should commit to main through the GitHub backend', () => {
    expect(config.backend).toEqual({ name: 'github', repo: '5ebastianFinkel/imauenviertel', branch: 'main' });
  });

  it('should have all required collections', () => {
    expect(config.collections.map((c: any) => c.name)).toEqual(['blog', 'events', 'team', 'documents', 'links']);
  });

  it('should store repository uploads in public/uploads', () => {
    expect(config.media_folder).toBe('public/uploads');
    expect(config.public_folder).toBe('/uploads');
  });

  it('should upload to the Cloudinary cloud whose images the site resizes', () => {
    expect(config.media_libraries.cloudinary.config.cloud_name).toBe(CLOUDINARY_CLOUD);
    expect(config.media_libraries.cloudinary.config).not.toHaveProperty('api_secret');
  });

  it('should shrink photos uploaded to the repository', () => {
    const { raster_image } = config.media_libraries.default.config.transformations;
    expect(raster_image.format).toBe('webp');
    expect(raster_image.width).toBeLessThanOrEqual(2048);
  });

  it('should keep PDFs in the repository', () => {
    const documents = config.collections.find((c: any) => c.name === 'documents');
    const file = documents.fields.find((f: any) => f.name === 'file');
    expect(file.media_libraries.cloudinary).toBe(false);
  });
});

describe('Admin page', () => {
  it('should load a pinned Sveltia CMS version with an SRI hash', () => {
    expect(adminHtml).toMatch(
      /<script src="https:\/\/unpkg\.com\/@sveltia\/cms@\d+\.\d+\.\d+\/dist\/sveltia-cms\.js" integrity="sha384-[A-Za-z0-9+/=]+" crossorigin="anonymous"><\/script>/,
    );
  });

  it('should not load Decap CMS or Netlify Identity any more', () => {
    expect(adminHtml).not.toContain('decap-cms');
    expect(adminHtml).not.toContain('netlify-identity');
    expect(read('src/routes/__root.tsx')).not.toContain('netlify-identity');
  });
});

describe('netlify.toml', () => {
  it('should build with pnpm and protect the admin page', () => {
    const netlify = read('netlify.toml');
    expect(netlify).toContain('pnpm build');
    expect(netlify).toContain('X-Frame-Options = "SAMEORIGIN"');
  });
});
