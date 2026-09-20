// @ts-check
import { defineConfig, fontProviders } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

import { SITE } from './src/consts.ts'

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  // GitHub Pages publishes the `docs/` directory of this repository.
  outDir: './docs',
  trailingSlash: 'never',
  integrations: [sitemap()],
  // Self-hosted at build time, so there is no render-blocking request to Google.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: [400, 600, 800],
      styles: ['normal'],
      subsets: ['latin', 'cyrillic'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
  ],
  // Honour a host-assigned port (CI previews, sandboxes); 4321 is Astro's default.
  server: { port: Number(process.env.PORT) || 4321 },
  vite: {
    plugins: [tailwindcss()],
  },
})
