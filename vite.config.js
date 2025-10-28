import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,      // allow Docker to bind 0.0.0.0
    port: 5173,
    strictPort: true,
    open: false,
  }
})
