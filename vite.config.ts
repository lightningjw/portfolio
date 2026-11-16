import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// GitHub Pages serves this repo at lightningjw.github.io/portfolio/.
export default defineConfig({
  base: '/portfolio/',
  plugins: [react(), tailwindcss()],
});
