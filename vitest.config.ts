import { defineConfig } from 'vitest/config';

export default defineConfig({
  // Path aliases (@components, @utils, ...) come from tsconfig.json
  resolve: { tsconfigPaths: true },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/tests/setup.ts'],
  },
});
