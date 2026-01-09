import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/rspack';

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
        content:
          'https://images.unsplash.com/photo-1552053831-71594a27632d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nc3xlbnwwfHwwfHx8MA%3D%3D',
      },
      'og:url': {
        property: 'og:url',
        content: 'http://localhost:7979/',
      },
    },
  },
});
