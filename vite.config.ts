import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Project Pages live at /gamecock-consulting/; keep / for local `npm run dev`.
const pages = process.env.GITHUB_PAGES === 'true'

export default defineConfig({
  base: pages ? '/gamecock-consulting/' : '/',
  plugins: [react(), tailwindcss()],
})

