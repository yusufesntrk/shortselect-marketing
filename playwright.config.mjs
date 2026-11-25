import { defineConfig } from '@playwright/test';

const previewUrl = process.env.MARKETING_PREVIEW_URL || 'http://127.0.0.1:4379';

export default defineConfig({
  testDir: './tests',
  testMatch: 'marketing-design.spec.mjs',
  outputDir: '.playwright-tmp/results',
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true } },
  ],
  use: { baseURL: previewUrl, reducedMotion: 'reduce', screenshot: 'only-on-failure' },
  webServer: process.env.MARKETING_PREVIEW_URL ? undefined : {
    command: 'npm run preview -- --host 127.0.0.1 --port 4379',
    url: previewUrl,
    reuseExistingServer: !process.env.CI,
  },
});
