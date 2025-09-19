// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Configuration optimisée pour le développement et la production
export default defineConfig({
  plugins: [
    react()
  ],
  
  resolve: {
    // Alias pour les imports absolus
    alias: {
      '@': resolve(__dirname, 'src'),
      '@/components': resolve(__dirname, 'src/components'),
      '@/pages': resolve(__dirname, 'src/pages'),
      '@/services': resolve(__dirname, 'src/services'),
      '@/hooks': resolve(__dirname, 'src/hooks'),
      '@/store': resolve(__dirname, 'src/store'),
      '@/types': resolve(__dirname, 'src/types'),
      '@/utils': resolve(__dirname, 'src/utils'),
      '@/routes': resolve(__dirname, 'src/routes'),
      '@/styles': resolve(__dirname, 'src/styles')
    }
  },

  // Variables d'environnement
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },

  // Configuration du serveur de développement
  server: {
    port: 3000,
    host: true,
    cors: true,
    proxy: {
      // Proxy pour les requêtes API vers le backend Spring Boot
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('Erreur proxy:', err)
          })
          proxy.on('proxyReq', (_proxyReq, req, _res) => {
            console.log('Proxying request:', req.method, req.url)
          })
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received response:', proxyRes.statusCode, req.url)
          })
        }
      }
    }
  },

  // Configuration pour la production
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: process.env.NODE_ENV === 'development',
    
    // Optimisation du bundle
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@headlessui/react', '@heroicons/react'],
          utils: ['zustand', 'react-hook-form', '@hookform/resolvers', 'zod'],
          http: ['axios'],
        }
      }
    },
    
    // Taille limite des chunks
    chunkSizeWarningLimit: 1000,
    
    // Minification
    minify: 'terser'
  },

  // Optimisation des dépendances
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'zustand',
      'axios',
      'react-hook-form',
      '@hookform/resolvers/zod',
      'zod',
      'react-hot-toast',
      '@headlessui/react',
      '@heroicons/react/24/outline',
      '@heroicons/react/24/solid'
    ]
  },

  // Variables d'environnement publiques
  envPrefix: 'VITE_',
  
  // Configuration CSS
  css: {
    postcss: './postcss.config.js',
    devSourcemap: true
  }
})