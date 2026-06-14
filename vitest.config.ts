import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    watch: false,
    testTimeout: 10000,
    clearMocks: true,
    //setupFiles:['src/util/setup-vitest.ts'],
    alias: {
      "@": path.resolve(__dirname, 'src/'),
    }
    // ...
  },
})