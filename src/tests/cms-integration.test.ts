import { describe, it, expect } from 'vitest';

describe.skip('CMS Integration Tests (requires running dev server)', () => {
  const baseUrl = 'http://localhost:4321';

  it('should serve admin page at /admin/index.html', async () => {
    const response = await fetch(`${baseUrl}/admin/index.html`);
    expect(response.status).toBe(200);
    
    const html = await response.text();
    expect(html).toContain('Content Manager - Im Auenviertel');
    expect(html).toContain('decap-cms');
    expect(html).toContain('netlify-identity-widget.js');
  });

  it('should serve admin config.yml', async () => {
    const response = await fetch(`${baseUrl}/admin/config.yml`);
    expect(response.status).toBe(200);
    
    const content = await response.text();
    expect(content).toContain('backend:');
    expect(content).toContain('name: git-gateway');
    expect(content).toContain('collections:');
  });

  it('should have correct content-type for config.yml', async () => {
    const response = await fetch(`${baseUrl}/admin/config.yml`);
    const contentType = response.headers.get('content-type');
    expect(contentType).toMatch(/yaml|yml|text/);
  });

  it('should load Decap CMS JavaScript', async () => {
    const response = await fetch('https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js');
    expect(response.status).toBe(200);
  });

  it('should load Netlify Identity widget', async () => {
    const response = await fetch('https://identity.netlify.com/v1/netlify-identity-widget.js');
    expect(response.status).toBe(200);
  });
});