import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginLess } from '@rsbuild/plugin-less';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  server: {
    port: 7979,
  },
  plugins: [pluginReact(), pluginLess()],
});
