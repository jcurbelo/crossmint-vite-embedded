import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Polyfill Node.js modules with browser-compatible versions
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      assert: 'assert',
      http: 'stream-http',
      https: 'https-browserify',
      os: 'os-browserify/browser',
      url: 'url',
      buffer: 'buffer',
      process: 'process/browser',
    },
  },
  optimizeDeps: {
    include: [
      'crypto-browserify',
      'stream-browserify',
      'assert',
      'buffer',
      'util',
      'process',
    ],
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
      // Remove NodeModulesPolyfillPlugin to prevent conflicts
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
      ],
    },
  },
})
