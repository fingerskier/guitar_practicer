import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  // Served from https://fingerskier.github.io/guitar_practicer/ on GitHub Pages.
  // The base must match the repository name (case-sensitive) so assets resolve.
  base: '/guitar_practicer/',
  plugins: [react()],
})
