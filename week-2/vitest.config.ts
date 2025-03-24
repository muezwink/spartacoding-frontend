import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['src/**/*.test.tsx', 'src/**/*.spec.tsx'],
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setupTests.js'],
  },
});
