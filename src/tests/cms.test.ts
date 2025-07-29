import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

describe('Decap CMS Configuration', () => {
  it('should have admin index.html file', () => {
    const adminPath = path.join(process.cwd(), 'public/admin/index.html');
    expect(fs.existsSync(adminPath)).toBe(true);
  });

  it('should have admin config.yml file', () => {
    const configPath = path.join(process.cwd(), 'public/admin/config.yml');
    expect(fs.existsSync(configPath)).toBe(true);
  });

  it('should have valid YAML configuration', () => {
    const configPath = path.join(process.cwd(), 'public/admin/config.yml');
    const configContent = fs.readFileSync(configPath, 'utf8');
    
    expect(() => yaml.load(configContent)).not.toThrow();
  });

  it('should have correct backend configuration', () => {
    const configPath = path.join(process.cwd(), 'public/admin/config.yml');
    const configContent = fs.readFileSync(configPath, 'utf8');
    const config = yaml.load(configContent) as any;
    
    expect(config.backend).toBeDefined();
    expect(config.backend.name).toBe('git-gateway');
    expect(config.backend.branch).toBe('main');
  });

  it('should have all required collections', () => {
    const configPath = path.join(process.cwd(), 'public/admin/config.yml');
    const configContent = fs.readFileSync(configPath, 'utf8');
    const config = yaml.load(configContent) as any;
    
    expect(config.collections).toBeDefined();
    expect(config.collections).toHaveLength(4);
    
    const collectionNames = config.collections.map((c: any) => c.name);
    expect(collectionNames).toContain('blog');
    expect(collectionNames).toContain('dates');
    expect(collectionNames).toContain('team');
    expect(collectionNames).toContain('documents');
  });

  it('should have correct media folder configuration', () => {
    const configPath = path.join(process.cwd(), 'public/admin/config.yml');
    const configContent = fs.readFileSync(configPath, 'utf8');
    const config = yaml.load(configContent) as any;
    
    expect(config.media_folder).toBe('public/uploads');
    expect(config.public_folder).toBe('/uploads');
  });

  it('should have Netlify Identity script in admin HTML', () => {
    const adminPath = path.join(process.cwd(), 'public/admin/index.html');
    const adminContent = fs.readFileSync(adminPath, 'utf8');
    
    expect(adminContent).toContain('https://identity.netlify.com/v1/netlify-identity-widget.js');
    expect(adminContent).toContain('decap-cms');
  });

  it('should have netlify.toml configuration', () => {
    const netlifyPath = path.join(process.cwd(), 'netlify.toml');
    expect(fs.existsSync(netlifyPath)).toBe(true);
    
    const netlifyContent = fs.readFileSync(netlifyPath, 'utf8');
    expect(netlifyContent).toContain('pnpm build');
    expect(netlifyContent).toContain('X-Frame-Options = "SAMEORIGIN"');
    expect(netlifyContent).toContain('GIT_LFS_ENABLED = "true"');
  });
});