import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/",
  server: { 
    port: 3001, 
    proxy: {
      // string shorthand: http://localhost:3000/api -> http://localhost:8080/api
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: false,
        secure: false,
      }
    }
  },  
  plugins: [react()],
})
