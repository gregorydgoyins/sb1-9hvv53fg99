const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class DevEnvironmentSetup {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.logFile = path.join(process.cwd(), 'dev-setup.log');
  }

  log(message, level = 'info') {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    
    console.log(logMessage);
    fs.appendFileSync(this.logFile, logMessage + '\n');
    
    if (level === 'error') this.errors.push(message);
    if (level === 'warn') this.warnings.push(message);
  }

  async validateEnvironment() {
    this.log('Starting environment validation...');
    
    try {
      // Check Node.js version
      const nodeVersion = process.version;
      this.log(`Node.js version: ${nodeVersion}`);
      
      if (parseInt(nodeVersion.slice(1)) < 18) {
        this.log('Node.js version should be 18 or higher', 'warn');
      }

      // Check package.json
      if (!fs.existsSync('package.json')) {
        throw new Error('package.json not found');
      }
      
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      this.log(`Project: ${packageJson.name} v${packageJson.version}`);

      // Validate required dependencies
      const requiredDeps = ['react', 'react-dom', 'vite', 'typescript'];
      const missingDeps = requiredDeps.filter(dep => 
        !packageJson.dependencies?.[dep] && !packageJson.devDependencies?.[dep]
      );
      
      if (missingDeps.length > 0) {
        throw new Error(`Missing required dependencies: ${missingDeps.join(', ')}`);
      }

      // Check environment files
      if (!fs.existsSync('.env')) {
        this.log('.env file not found, creating from .env.example', 'warn');
        if (fs.existsSync('.env.example')) {
          fs.copyFileSync('.env.example', '.env');
        }
      }

      // Validate Vite config
      if (!fs.existsSync('vite.config.ts') && !fs.existsSync('vite.config.js')) {
        throw new Error('Vite configuration file not found');
      }

      this.log('Environment validation completed successfully');
      return true;
    } catch (error) {
      this.log(`Environment validation failed: ${error.message}`, 'error');
      return false;
    }
  }

  async installDependencies() {
    this.log('Installing dependencies...');
    
    try {
      // Clean install
      if (fs.existsSync('node_modules')) {
        this.log('Removing existing node_modules...');
        execSync('rm -rf node_modules', { stdio: 'inherit' });
      }
      
      if (fs.existsSync('package-lock.json')) {
        this.log('Removing package-lock.json...');
        fs.unlinkSync('package-lock.json');
      }

      this.log('Running npm install...');
      execSync('npm install', { stdio: 'inherit' });
      
      this.log('Dependencies installed successfully');
      return true;
    } catch (error) {
      this.log(`Dependency installation failed: ${error.message}`, 'error');
      return false;
    }
  }

  async validateBuild() {
    this.log('Validating build process...');
    
    try {
      this.log('Running build test...');
      execSync('npm run build', { stdio: 'inherit' });
      
      if (!fs.existsSync('dist')) {
        throw new Error('Build output directory not found');
      }
      
      this.log('Build validation completed successfully');
      return true;
    } catch (error) {
      this.log(`Build validation failed: ${error.message}`, 'error');
      return false;
    }
  }

  async setupHealthChecks() {
    this.log('Setting up health check endpoints...');
    
    const healthCheckContent = `
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
            version: process.env.npm_package_version || '1.0.0'
          }));
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
    port: 5199,
    strictPort: true,
    host: true,
    hmr: {
      overlay: true
    }
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
          icons: ['lucide-react']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'recharts', 'lucide-react']
  }
});
`;
    
    fs.writeFileSync('vite.config.ts', healthCheckContent);
    this.log('Health check endpoints configured');
  }

  async generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      status: this.errors.length === 0 ? 'success' : 'failed',
      errors: this.errors,
      warnings: this.warnings,
      environment: {
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
        cwd: process.cwd()
      }
    };

    fs.writeFileSync('dev-setup-report.json', JSON.stringify(report, null, 2));
    this.log(`Setup report generated: ${report.status}`);
    
    return report;
  }

  async run() {
    this.log('Starting development environment setup...');
    
    const steps = [
      { name: 'Environment Validation', fn: () => this.validateEnvironment() },
      { name: 'Dependency Installation', fn: () => this.installDependencies() },
      { name: 'Build Validation', fn: () => this.validateBuild() },
      { name: 'Health Check Setup', fn: () => this.setupHealthChecks() }
    ];

    for (const step of steps) {
      this.log(`Running: ${step.name}`);
      const success = await step.fn();
      
      if (!success) {
        this.log(`Step failed: ${step.name}`, 'error');
        break;
      }
    }

    const report = await this.generateReport();
    
    if (report.status === 'success') {
      this.log('Development environment setup completed successfully!');
      console.log('\n✅ Setup Complete! Run "npm run dev" to start the development server.');
    } else {
      this.log('Development environment setup failed. Check the logs for details.', 'error');
      console.log('\n❌ Setup Failed! Check dev-setup.log for details.');
    }

    return report;
  }
}

// Run setup if called directly
if (require.main === module) {
  const setup = new DevEnvironmentSetup();
  setup.run().catch(console.error);
}

module.exports = DevEnvironmentSetup;