import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Base relativa (para Hostinger y cualquier hosting)
export default defineConfig({
  base: './',
  plugins: [react()],
})
