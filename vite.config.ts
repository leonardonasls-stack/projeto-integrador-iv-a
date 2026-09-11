import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // @ts-expect-error vitest config inline
  test: {
    globals: true,
    environment: 'jsdom',
  },
})


