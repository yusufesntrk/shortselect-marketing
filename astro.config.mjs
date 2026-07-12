import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.shortselect.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    react(),
    sitemap({
      // noindex-Legal-Seiten aus der Sitemap ausschliessen (agb, datenschutz, impressum).
      // 404 taucht in der Sitemap ohnehin nicht auf.
      filter: (page) => !/\/(agb|datenschutz|impressum|legal\/subprocessors)\/?$/.test(page),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
