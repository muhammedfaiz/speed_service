import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// vite.config.js
export default defineConfig({
  plugins: [react()],
  optimizeDeps:{
    include:['chart.js']
  },
  build:{
    chunkSizeWarningLimit: 1000
  }
})
