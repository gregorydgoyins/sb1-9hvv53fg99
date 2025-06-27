const fs = require('fs');
const path = require('path');
const net = require('net');

class PreDevCheck {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.logFile = path.join(process.cwd(), 'pre-dev-check.log');
    this.startTime = Date.now();
  }

  log(message, level = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = level === 'error' ? '❌' : level === 'warn' ? '⚠️' : 'ℹ️';
    const logMessage = `${prefix} ${message}`;
    
    console.log(logMessage);
    fs.appendFileSync(this.logFile, `[${timestamp}] [${level.toUpperCase()}] ${message}\n`);
    
    if (level === 'error') this.errors.push(message);
    if (level === 'warn') this.warnings.push(message);
  }

  checkNodeVersion() {
    const nodeVersion = process.version;
    const majorVersion = parseInt(nodeVersion.slice(1));
    
    if (majorVersion < 18) {
      this.log(`Node.js ${nodeVersion} detected. Version 18+ required.`, 'error');
      return false;
    } else {
      this.log(`Node.js ${nodeVersion} ✓`);
      return true;
    }
  }

  checkRequiredFiles() {
    const requiredFiles = [
      'package.json',
      'vite.config.ts',
      'tsconfig.json',
      'src/main.tsx',
      'src/App.tsx',
      'index.html'
    ];

    const missingFiles = [];
    requiredFiles.forEach(file => {
      if (fs.existsSync(file)) {
        this.log(`${file} ✓`);
      } else {
        this.log(`Missing required file: ${file}`, 'error');
        missingFiles.push(file);
      }
    });

    return missingFiles.length === 0;
  }

  checkDependencies() {
    if (!fs.existsSync('node_modules')) {
      this.log('node_modules not found. Run "npm install" first.', 'error');
      return false;
    }

    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const criticalDeps = ['react', 'react-dom', 'vite'];
    const missingDeps = [];
    
    criticalDeps.forEach(dep => {
      const depPath = path.join('node_modules', dep);
      if (fs.existsSync(depPath)) {
        this.log(`${dep} ✓`);
      } else {
        this.log(`Missing dependency: ${dep}`, 'error');
        missingDeps.push(dep);
      }
    });

    return missingDeps.length === 0;
  }

  checkEnvironment() {
    if (fs.existsSync('.env')) {
      this.log('.env file found ✓');
      return true;
    } else if (fs.existsSync('.env.example')) {
      this.log('.env file missing, but .env.example found', 'warn');
      this.log('Creating .env from .env.example...');
      try {
        fs.copyFileSync('.env.example', '.env');
        this.log('.env file created ✓');
        return true;
      } catch (error) {
        this.log(`Failed to create .env file: ${error.message}`, 'error');
        return false;
      }
    } else {
      this.log('No environment files found', 'warn');
      return true; // Not critical
    }
  }

  async checkPort() {
    const port = 5199;
    
    return new Promise((resolve) => {
      const server = net.createServer();
      
      server.listen(port, () => {
        server.once('close', () => {
          this.log(`Port ${port} is available ✓`);
          resolve(true);
        });
        server.close();
      });
      
      server.on('error', () => {
        this.log(`Port ${port} is already in use`, 'warn');
        this.log('The dev server may fail to start or use a different port');
        resolve(false);
      });
    });
  }

  checkTypeScriptConfig() {
    if (!fs.existsSync('tsconfig.json')) {
      this.log('tsconfig.json not found', 'error');
      return false;
    }

    try {
      const tsConfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
      
      if (!tsConfig.compilerOptions) {
        this.log('Invalid tsconfig.json - missing compilerOptions', 'error');
        return false;
      }

      if (!tsConfig.compilerOptions.jsx) {
        this.log('tsconfig.json missing JSX configuration', 'warn');
      }

      return true;
    } catch (error) {
      this.log(`Failed to parse tsconfig.json: ${error.message}`, 'error');
      return false;
    }
  }

  checkViteConfig() {
    const viteConfigPath = fs.existsSync('vite.config.ts') ? 'vite.config.ts' : 'vite.config.js';
    
    if (!fs.existsSync(viteConfigPath)) {
      this.log('Vite configuration file not found', 'error');
      return false;
    }

    return true;
  }

  checkPackageScripts() {
    if (!fs.existsSync('package.json')) {
      this.log('package.json not found', 'error');
      return false;
    }

    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      
      const requiredScripts = ['dev', 'build', 'start'];
      const missingScripts = [];
      
      requiredScripts.forEach(script => {
        if (!packageJson.scripts?.[script]) {
          missingScripts.push(script);
        }
      });
      
      if (missingScripts.length > 0) {
        this.log(`Missing required scripts in package.json: ${missingScripts.join(', ')}`, 'error');
        return false;
      }
      
      return true;
    } catch (error) {
      this.log(`Failed to parse package.json: ${error.message}`, 'error');
      return false;
    }
  }

  async attemptRepairs() {
    this.log('Attempting to repair issues...');
    
    // Create missing files
    if (!fs.existsSync('vite.config.ts') && !fs.existsSync('vite.config.js')) {
      this.log('Creating default vite.config.ts...');
      const viteConfig = `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  server: {
    port: 5199,
    strictPort: true
  }
});
`;
      fs.writeFileSync('vite.config.ts', viteConfig);
      this.log('Created vite.config.ts ✓');
    }

    // Fix package.json scripts
    if (fs.existsSync('package.json')) {
      try {
        const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        let modified = false;
        
        packageJson.scripts = packageJson.scripts || {};
        
        if (!packageJson.scripts.dev) {
          packageJson.scripts.dev = "vite";
          modified = true;
        }
        
        if (!packageJson.scripts.build) {
          packageJson.scripts.build = "tsc && vite build";
          modified = true;
        }
        
        if (!packageJson.scripts.start) {
          packageJson.scripts.start = "vite preview";
          modified = true;
        }
        
        if (modified) {
          fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
          this.log('Updated package.json scripts ✓');
        }
      } catch (error) {
        this.log(`Failed to fix package.json: ${error.message}`, 'error');
      }
    }

    // Create .env from .env.example if needed
    if (!fs.existsSync('.env') && fs.existsSync('.env.example')) {
      this.log('Creating .env from .env.example...');
      fs.copyFileSync('.env.example', '.env');
      this.log('Created .env file ✓');
    }
  }

  async run() {
    console.log('🔍 Running pre-development checks...\n');
    
    // Run all checks
    const nodeVersionOk = this.checkNodeVersion();
    const filesOk = this.checkRequiredFiles();
    const depsOk = this.checkDependencies();
    const envOk = this.checkEnvironment();
    const tsConfigOk = this.checkTypeScriptConfig();
    const viteConfigOk = this.checkViteConfig();
    const scriptsOk = this.checkPackageScripts();
    const portOk = await this.checkPort();
    
    // Attempt repairs if needed
    if (!filesOk || !envOk || !tsConfigOk || !viteConfigOk || !scriptsOk) {
      await this.attemptRepairs();
    }
    
    const elapsedTime = ((Date.now() - this.startTime) / 1000).toFixed(2);
    console.log(`\n📊 Check Summary (completed in ${elapsedTime}s):`);
    console.log(`   Errors: ${this.errors.length}`);
    console.log(`   Warnings: ${this.warnings.length}`);
    
    if (this.errors.length > 0) {
      console.log('\n❌ Pre-development checks failed!');
      console.log('Please fix the errors above before starting the dev server.');
      process.exit(1);
    } else if (this.warnings.length > 0) {
      console.log('\n⚠️ Pre-development checks completed with warnings.');
      console.log('The dev server should start, but consider addressing the warnings.');
    } else {
      console.log('\n✅ All pre-development checks passed!');
    }
    
    console.log('🚀 Starting development server...\n');
  }
}

// Run checks if called directly
if (require.main === module) {
  const checker = new PreDevCheck();
  checker.run().catch(console.error);
}

module.exports = PreDevCheck;