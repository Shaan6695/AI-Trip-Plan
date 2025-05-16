import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "/AI-Trip-Plan",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['react-icons/ai', 'react-icons/fa6', 'react-icons/fc']
  }
})