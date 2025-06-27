import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'health-check',
      configureServer(server) {
        server.middlewares.use('/health', (req, res, next) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            version: process.env.npm_package_version || '1.0.0',
            environment: 'development'
          }));
        });

        server.middlewares.use('/api/status', (req, res, next) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            server: 'running',
            hmr: 'enabled',
            routes: 'active',
            assets: 'loaded'
          }));
        });

        // Error recovery middleware
        server.middlewares.use((err, req, res, next) => {
          if (err) {
            console.error('Server error:', err);
            res.statusCode = 500;
            res.end(JSON.stringify({
              error: 'Internal Server Error',
              message: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred',
              timestamp: new Date().toISOString()
            }));
            return;
          }
          next();
        });
      }
    }
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    hmr: {
      overlay: true,
      port: 5174
    },
    watch: {
      usePolling: false,
      interval: 100
    },
    middlewareMode: false
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          charts: ['recharts'],
          icons: ['lucide-react'],
          utils: ['zustand']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    reportCompressedSize: true,
    emptyOutDir: true
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      'recharts', 
      'lucide-react',
      'zustand'
    ],
    exclude: []
  },
  define: {
    __DEV__: JSON.stringify(true),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0')
  },
  css: {
    devSourcemap: true
  },
  preview: {
    port: 4173,
    strictPort: true,
    host: true
  }
});