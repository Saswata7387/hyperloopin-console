import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // Automatically opens the app in the browser
    browser: 'chrome', // Specify the browser (e.g., 'chrome', 'firefox', 'edge')
  },
})