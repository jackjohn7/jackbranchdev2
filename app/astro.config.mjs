import { defineConfig } from 'astro/config';

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import mdx from "@astrojs/mdx";

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import svelte from "@astrojs/svelte";

// https://astro.build/config
import netlify from "@astrojs/netlify/functions";

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: 'dracula'
      wrap: false
    }
  },
  site: "https://jackbranch.dev",
  integrations: [tailwind(), mdx(), sitemap(), svelte()],
  output: "static",
  adapter: netlify()
});
