const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ErrorRecovery {
  constructor() {
    this.logFile = path.join(process.cwd(), 'error-recovery.log');
    this.recoveryActions = [];
  }

  log(message, level = 'info') {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    
    console.log(logMessage);
    fs.appendFileSync(this.logFile, logMessage + '\n');
  }

  async handleCommonErrors() {
    this.log('Starting error recovery process...');

    const errorHandlers = [
      { name: 'Port Conflicts', fn: () => this.handlePortConflicts() },
      { name: 'Dependency Issues', fn: () => this.handleDependencyIssues() },
      { name: 'Build Failures', fn: () => this.handleBuildFailures() },
      { name: 'TypeScript Errors', fn: () => this.handleTypeScriptErrors() },
      { name: 'Environment Issues', fn: () => this.handleEnvironmentIssues() },
      { name: 'Vite Configuration', fn: () => this.handleViteConfig() }
    ];

    for (const handler of errorHandlers) {
      try {
        this.log(`Checking: ${handler.name}`);
        const result = await handler.fn();
        if (result.fixed) {
          this.recoveryActions.push(`${handler.name}: ${result.action}`);
        }
      } catch (error) {
        this.log(`Error in ${handler.name}: ${error.message}`, 'error');
      }
    }

    return this.generateRecoveryReport();
  }

  async handlePortConflicts() {
    const net = require('net');
    const defaultPort = 5199;
    
    return new Promise((resolve) => {
      const server = net.createServer();
      
      server.listen(defaultPort, () => {
        server.once('close', () => {
          resolve({ fixed: false, action: 'No port conflict detected' });
        });
        server.close();
      });
      
      server.on('error', () => {
        // Port is in use, update vite config to use a different port
        try {
          const viteConfigPath = fs.existsSync('vite.config.ts') ? 'vite.config.ts' : 'vite.config.js';
          if (fs.existsSync(viteConfigPath)) {
            let viteConfig = fs.readFileSync(viteConfigPath, 'utf8');
            
            // Find an available port
            let alternativePort = 3000;
            while (alternativePort < 4000) {
              try {
                const testServer = net.createServer();
                testServer.listen(alternativePort);
                testServer.close();
                break;
              } catch (e) {
                alternativePort++;
              }
            }
            
            // Update port in vite config
            viteConfig = viteConfig.replace(/port:\s*\d+/, `port: ${alternativePort}`);
            fs.writeFileSync(viteConfigPath, viteConfig);
            
            resolve({ 
              fixed: true, 
              action: `Updated port from ${defaultPort} to ${alternativePort} in ${viteConfigPath}` 
            });
          } else {
            resolve({ fixed: false, action: 'Vite config not found' });
          }
        } catch (error) {
          resolve({ fixed: false, action: `Failed to update port: ${error.message}` });
        }
      });
    });
  }

  async handleDependencyIssues() {
    if (!fs.existsSync('package.json')) {
      return { fixed: false, action: 'package.json not found' };
    }

    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      
      // Check for common dependency issues
      const criticalDeps = ['react', 'react-dom', 'vite'];
      const missingDeps = criticalDeps.filter(dep => {
        return !packageJson.dependencies?.[dep] && !packageJson.devDependencies?.[dep];
      });
      
      if (missingDeps.length > 0) {
        // Add missing dependencies
        this.log(`Adding missing dependencies: ${missingDeps.join(', ')}`);
        
        for (const dep of missingDeps) {
          if (dep === 'vite') {
            packageJson.devDependencies = packageJson.devDependencies || {};
            packageJson.devDependencies.vite = "^5.0.0";
          } else {
            packageJson.dependencies = packageJson.dependencies || {};
            packageJson.dependencies[dep] = dep === 'react' || dep === 'react-dom' ? "^18.2.0" : "latest";
          }
        }
        
        fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
        
        // Install dependencies
        execSync('npm install', { stdio: 'inherit' });
        
        return { fixed: true, action: `Added missing dependencies: ${missingDeps.join(', ')}` };
      }
      
      return { fixed: false, action: 'No dependency issues detected' };
    } catch (error) {
      return { fixed: false, action: `Failed to fix dependencies: ${error.message}` };
    }
  }

  async handleBuildFailures() {
    if (!fs.existsSync('package.json')) {
      return { fixed: false, action: 'package.json not found' };
    }

    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      
      // Ensure build script exists
      if (!packageJson.scripts?.build) {
        packageJson.scripts = packageJson.scripts || {};
        packageJson.scripts.build = "tsc && vite build";
        fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
        return { fixed: true, action: 'Added missing build script to package.json' };
      }
      
      return { fixed: false, action: 'Build script already exists' };
    } catch (error) {
      return { fixed: false, action: `Failed to fix build script: ${error.message}` };
    }
  }

  async handleTypeScriptErrors() {
    if (!fs.existsSync('tsconfig.json')) {
      return { fixed: false, action: 'tsconfig.json not found' };
    }

    try {
      const tsConfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
      let modified = false;
      
      // Fix common TypeScript configuration issues
      if (!tsConfig.compilerOptions) {
        tsConfig.compilerOptions = {};
        modified = true;
      }
      
      if (!tsConfig.compilerOptions.jsx) {
        tsConfig.compilerOptions.jsx = "react-jsx";
        modified = true;
      }
      
      if (!tsConfig.include) {
        tsConfig.include = ["src"];
        modified = true;
      }
      
      if (modified) {
        fs.writeFileSync('tsconfig.json', JSON.stringify(tsConfig, null, 2));
        return { fixed: true, action: 'Fixed TypeScript configuration' };
      }
      
      return { fixed: false, action: 'TypeScript configuration is valid' };
    } catch (error) {
      return { fixed: false, action: `Failed to fix TypeScript configuration: ${error.message}` };
    }
  }

  async handleEnvironmentIssues() {
    if (!fs.existsSync('.env') && fs.existsSync('.env.example')) {
      try {
        fs.copyFileSync('.env.example', '.env');
        return { fixed: true, action: 'Created .env file from .env.example' };
      } catch (error) {
        return { fixed: false, action: `Failed to create .env file: ${error.message}` };
      }
    }
    
    return { fixed: false, action: 'No environment issues detected' };
  }

  async handleViteConfig() {
    const viteConfigPath = fs.existsSync('vite.config.ts') ? 'vite.config.ts' : 'vite.config.js';
    
    if (!fs.existsSync(viteConfigPath)) {
      try {
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
        fs.writeFileSync(viteConfigPath, viteConfig);
        return { fixed: true, action: `Created default ${viteConfigPath}` };
      } catch (error) {
        return { fixed: false, action: `Failed to create Vite config: ${error.message}` };
      }
    }
    
    return { fixed: false, action: 'Vite configuration exists' };
  }

  generateRecoveryReport() {
    const report = {
      timestamp: new Date().toISOString(),
      recoveryActions: this.recoveryActions,
      status: this.recoveryActions.length > 0 ? 'recovered' : 'no_action_needed'
    };

    fs.writeFileSync('recovery-report.json', JSON.stringify(report, null, 2));
    
    this.log(`Recovery process completed. Actions taken: ${this.recoveryActions.length}`);
    this.recoveryActions.forEach(action => this.log(`- ${action}`));
    
    return report;
  }
}

// CLI interface
if (require.main === module) {
  const recovery = new ErrorRecovery();
  recovery.handleCommonErrors().then(report => {
    process.exit(report.recoveryActions.length > 0 ? 0 : 1);
  }).catch(console.error);
}

module.exports = ErrorRecovery;