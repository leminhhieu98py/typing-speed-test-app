import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/rspack';

const isProd = process.env.NODE_ENV === 'production';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  server: {
    port: 7979,
  },
  plugins: [pluginReact()],
  tools: {
    rspack: {
      plugins: [
        tanstackRouter({
          target: 'react',
          autoCodeSplitting: true,
        }),
      ],
    },
  },
  source: {
    tsconfigPath: './tsconfig.json',
    define: {
      'import.meta.env.RESULT_PAGE_KEY': JSON.stringify(process.env.RESULT_PAGE_KEY),
    },
  },
  html: {
    title: 'Just type',
    meta: {
      description:
        'A lightweight typing speed test application. You can use it on mobile, tablet, and PC and share result with your friend as well',
      'og:type': {
        property: 'og:type',
        content: 'website',
      },
      'og:title': {
        property: 'og:title',
        content: 'Typing speed test app',
      },
      'og:description': {
        property: 'og:description',
        content:
          "I've just broken my personal record on Just Type! Click the link to take the challenge, beat my WPM score",
      },
      // TODO: change image and link later
      'og:image': {
        property: 'og:image',
        content: 'https://just-type-vn.netlify.app/logo.png',
      },
      'og:url': {
        property: 'og:url',
        content: 'https://just-type-vn.netlify.app',
      },
    },
  },
  performance: {
    chunkSplit: {
      strategy: 'split-by-size',
      maxSize: 30000,
    },
  },
  resolve: {
    dedupe: ['immer'],
  },
  output: {
    assetPrefix: isProd ? 'https://just-type-vn.netlify.app' : '/',
  },
});
