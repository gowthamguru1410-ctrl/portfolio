import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'gsap': ['gsap'],
          'framer': ['framer-motion'],
          'three': ['three', '@react-three/fiber', '@react-three/drei'],
        }
      }
    },
    // Increase chunk size limit warning
    chunkSizeWarningLimit: 600,
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      }
    }
  }
})
