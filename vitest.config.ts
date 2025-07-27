import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/tests/setup.ts'],
  },
  resolve: {
    alias: {
      '@components': '/src/components',
      '@utils': '/src/utils',
      '@layouts': '/src/layouts',
      '@assets': '/src/assets',
      '@pages': '/src/pages',
      '@lib': '/src/lib',
      'astro:content': '/src/tests/mocks/astro-content.ts',
    },
  },
});