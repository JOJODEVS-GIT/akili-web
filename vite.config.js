import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), './src'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    target: 'es2018',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Découpage en chunks vendor — chaque lib lourde devient son propre fichier
        // pour : (1) cache long-terme efficace (le code app change, les vendors non),
        // (2) parallélisation des téléchargements, (3) initial paint plus rapide.
        manualChunks: {
          'vendor-react':    ['react', 'react-dom', 'react-router-dom'],
          'vendor-supabase': ['@supabase/supabase-js'],
          'vendor-motion':   ['framer-motion'],
          'vendor-icons':    ['@phosphor-icons/react', 'react-icons/si', 'react-icons/fa6'],
          'vendor-utils':    ['clsx', 'tailwind-merge'],
        },
      },
    },
  },
});
