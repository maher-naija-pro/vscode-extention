# Build Scripts for VS Code Extension

This document explains how to use the automated build scripts to create distributable `.vsix` files for your VS Code extension.

## 🚀 Quick Start

### Option 1: Using npm scripts (Recommended)
```bash
# Full build with all checks and packaging
npm run build

# Quick build - just compile and package
npm run build:vsix
```

### Option 2: Using shell scripts directly
```bash
# On Linux/macOS
./build.sh

# On Windows
build.bat
```

## 📋 What the Build Scripts Do

The build scripts automate the entire process:

1. **Environment Check** - Verifies Node.js, npm, and required tools
2. **Dependency Management** - Installs/updates npm dependencies
3. **Tool Installation** - Ensures `@vscode/vsce` is available
4. **Clean Build** - Removes previous builds and artifacts
5. **TypeScript Compilation** - Compiles source code to JavaScript
6. **Code Quality** - Runs ESLint for code quality checks
7. **Packaging** - Creates the final `.vsix` file
8. **Success Report** - Shows file details and installation instructions

## 🛠️ Prerequisites

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)
- **Git** (for version control)

## 📁 Generated Files

After a successful build, you'll get:

- `vscode-extension-{version}.vsix` - The distributable extension package
- `out/` directory - Compiled JavaScript files
- Source maps for debugging

## 🔧 Customization

### Modifying Build Behavior

You can customize the build process by editing the scripts:

- **build.sh** - Linux/macOS shell script
- **build.bat** - Windows batch script
- **package.json** - npm scripts

### Adding Build Steps

To add custom build steps, modify the appropriate script file or add new npm scripts to `package.json`.

## 🚨 Troubleshooting

### Common Issues

1. **Permission Denied** - Make sure the script is executable: `chmod +x build.sh`
2. **Node.js Not Found** - Install Node.js from [nodejs.org](https://nodejs.org/)
3. **Build Fails** - Check the error messages and ensure all dependencies are installed
4. **TypeScript Errors** - Fix any TypeScript compilation errors before building

### Debug Mode

For detailed debugging, you can run individual steps:

```bash
# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Run linting
npm run lint

# Package extension
npx vsce package
```

## 📦 Distribution

Once you have a `.vsix` file, you can:

1. **Install Locally** - Use "Extensions: Install from VSIX..." in VS Code
2. **Share with Others** - Send the `.vsix` file to other developers
3. **Publish to Marketplace** - Use `npx vsce publish` (requires publisher account)

## 🔄 Continuous Integration

These scripts are designed to work in CI/CD environments:

```yaml
# Example GitHub Actions workflow
- name: Build Extension
  run: |
    chmod +x build.sh
    ./build.sh
```

## 📝 Version Management

Remember to update the version in `package.json` before building:

```json
{
  "version": "1.0.0"
}
```

The generated `.vsix` file will include this version number in its filename.

---

**Happy Building! 🎉**
