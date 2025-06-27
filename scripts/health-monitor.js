const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class HealthMonitor {
  constructor() {
    this.logFile = path.join(process.cwd(), 'health-monitor.log');
    this.healthChecks = [];
    this.criticalErrors = [];
    this.warnings = [];
  }

  log(message, level = 'info') {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    
    console.log(logMessage);
    fs.appendFileSync(this.logFile, logMessage + '\n');
    
    if (level === 'error') this.criticalErrors.push(message);
    if (level === 'warn') this.warnings.push(message);
  }

  async checkSystemHealth() {
    this.log('Starting comprehensive system health check...');
    
    const checks = [
      { name: 'Node.js Version', fn: () => this.checkNodeVersion() },
      { name: 'Dependencies', fn: () => this.checkDependencies() },
      { name: 'File Structure', fn: () => this.checkFileStructure() },
      { name: 'Environment Variables', fn: () => this.checkEnvironment() },
      { name: 'Port Availability', fn: () => this.checkPortAvailability() },
      { name: 'Build System', fn: () => this.checkBuildSystem() },
      { name: 'TypeScript Config', fn: () => this.checkTypeScriptConfig() },
      { name: 'Vite Config', fn: () => this.checkViteConfig() }
    ];

    for (const check of checks) {
      try {
        this.log(`Running check: ${check.name}`);
        const result = await check.fn();
        this.healthChecks.push({ name: check.name, status: 'pass', result });
        this.log(`✅ ${check.name}: PASS`);
      } catch (error) {
        this.healthChecks.push({ name: check.name, status: 'fail', error: error.message });
        this.log(`❌ ${check.name}: FAIL - ${error.message}`, 'error');
      }
    }

    return this.generateHealthReport();
  }

  checkNodeVersion() {
    const nodeVersion = process.version;
    const majorVersion = parseInt(nodeVersion.slice(1));
    
    if (majorVersion < 18) {
      throw new Error(`Node.js ${nodeVersion} is below minimum required version 18`);
    }
    
    return { version: nodeVersion, status: 'compatible' };
  }

  checkDependencies() {
    if (!fs.existsSync('package.json')) {
      throw new Error('package.json not found');
    }

    if (!fs.existsSync('node_modules')) {
      throw new Error('node_modules not found - run npm install');
    }

    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const criticalDeps = ['react', 'react-dom', 'vite', 'typescript'];
    
    const missingDeps = criticalDeps.filter(dep => {
      const depPath = path.join('node_modules', dep);
      return !fs.existsSync(depPath);
    });

    if (missingDeps.length > 0) {
      throw new Error(`Missing critical dependencies: ${missingDeps.join(', ')}`);
    }

    return { dependencies: criticalDeps.length, missing: 0 };
  }

  checkFileStructure() {
    const requiredFiles = [
      'src/main.tsx',
      'src/App.tsx',
      'index.html',
      'vite.config.ts',
      'tsconfig.json',
      'tailwind.config.js'
    ];

    const missingFiles = requiredFiles.filter(file => !fs.existsSync(file));
    
    if (missingFiles.length > 0) {
      throw new Error(`Missing required files: ${missingFiles.join(', ')}`);
    }

    return { requiredFiles: requiredFiles.length, found: requiredFiles.length };
  }

  checkEnvironment() {
    const envFiles = ['.env', '.env.example'];
    const foundEnvFiles = envFiles.filter(file => fs.existsSync(file));
    
    if (foundEnvFiles.length === 0) {
      this.log('No environment files found', 'warn');
    }

    return { envFiles: foundEnvFiles };
  }

  async checkPortAvailability() {
    const net = require('net');
    const ports = [5199, 5200]; // Main port and HMR port
    
    for (const port of ports) {
      const isAvailable = await new Promise((resolve) => {
        const server = net.createServer();
        
        server.listen(port, () => {
          server.once('close', () => resolve(true));
          server.close();
        });
        
        server.on('error', () => resolve(false));
      });

      if (!isAvailable) {
        this.log(`Port ${port} is in use`, 'warn');
      }
    }

    return { portsChecked: ports.length };
  }

  checkBuildSystem() {
    try {
      // Test if build command exists and can be parsed
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      
      if (!packageJson.scripts?.build) {
        throw new Error('Build script not found in package.json');
      }

      if (!packageJson.scripts?.dev) {
        throw new Error('Dev script not found in package.json');
      }

      return { buildScript: true, devScript: true };
    } catch (error) {
      throw new Error(`Build system check failed: ${error.message}`);
    }
  }

  checkTypeScriptConfig() {
    if (!fs.existsSync('tsconfig.json')) {
      throw new Error('tsconfig.json not found');
    }

    try {
      const tsConfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
      
      if (!tsConfig.compilerOptions) {
        throw new Error('Invalid tsconfig.json - missing compilerOptions');
      }

      return { valid: true, jsx: tsConfig.compilerOptions.jsx };
    } catch (error) {
      throw new Error(`TypeScript config invalid: ${error.message}`);
    }
  }

  checkViteConfig() {
    const viteConfigs = ['vite.config.ts', 'vite.config.js'];
    const foundConfig = viteConfigs.find(config => fs.existsSync(config));
    
    if (!foundConfig) {
      throw new Error('Vite configuration file not found');
    }

    return { configFile: foundConfig };
  }

  generateHealthReport() {
    const report = {
      timestamp: new Date().toISOString(),
      overallStatus: this.criticalErrors.length === 0 ? 'healthy' : 'unhealthy',
      checks: this.healthChecks,
      errors: this.criticalErrors,
      warnings: this.warnings,
      summary: {
        totalChecks: this.healthChecks.length,
        passed: this.healthChecks.filter(c => c.status === 'pass').length,
        failed: this.healthChecks.filter(c => c.status === 'fail').length,
        errorCount: this.criticalErrors.length,
        warningCount: this.warnings.length
      }
    };

    fs.writeFileSync('health-report.json', JSON.stringify(report, null, 2));
    
    this.log(`Health check completed: ${report.overallStatus}`);
    this.log(`Passed: ${report.summary.passed}/${report.summary.totalChecks}`);
    
    if (report.summary.errorCount > 0) {
      this.log(`Critical errors found: ${report.summary.errorCount}`, 'error');
    }
    
    if (report.summary.warningCount > 0) {
      this.log(`Warnings: ${report.summary.warningCount}`, 'warn');
    }

    return report;
  }

  async autoRepair() {
    this.log('Starting auto-repair process...');
    
    const repairs = [];

    // Repair missing node_modules
    if (!fs.existsSync('node_modules')) {
      this.log('Repairing: Installing dependencies...');
      try {
        execSync('npm install', { stdio: 'inherit' });
        repairs.push('Dependencies installed');
      } catch (error) {
        this.log(`Failed to install dependencies: ${error.message}`, 'error');
      }
    }

    // Repair missing .env
    if (!fs.existsSync('.env') && fs.existsSync('.env.example')) {
      this.log('Repairing: Creating .env from .env.example...');
      fs.copyFileSync('.env.example', '.env');
      repairs.push('Environment file created');
    }

    // Repair TypeScript issues
    if (fs.existsSync('tsconfig.json')) {
      try {
        const tsConfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
        if (!tsConfig.compilerOptions?.jsx) {
          tsConfig.compilerOptions = tsConfig.compilerOptions || {};
          tsConfig.compilerOptions.jsx = 'react-jsx';
          fs.writeFileSync('tsconfig.json', JSON.stringify(tsConfig, null, 2));
          repairs.push('TypeScript JSX configuration fixed');
        }
      } catch (error) {
        this.log(`Could not repair TypeScript config: ${error.message}`, 'warn');
      }
    }

    this.log(`Auto-repair completed. Repairs made: ${repairs.length}`);
    return repairs;
  }
}

// CLI interface
if (require.main === module) {
  const monitor = new HealthMonitor();
  const command = process.argv[2];

  if (command === 'repair') {
    monitor.autoRepair().then(() => {
      return monitor.checkSystemHealth();
    }).then(report => {
      process.exit(report.overallStatus === 'healthy' ? 0 : 1);
    }).catch(console.error);
  } else {
    monitor.checkSystemHealth().then(report => {
      process.exit(report.overallStatus === 'healthy' ? 0 : 1);
    }).catch(console.error);
  }
}

module.exports = HealthMonitor;