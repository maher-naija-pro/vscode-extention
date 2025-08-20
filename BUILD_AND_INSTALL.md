# Building and Installing the VS Code Extension

This guide explains how to build, package, and install this VS Code extension for development and distribution.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)
- **VS Code** (latest stable version)
- **Git** (for version control)

## Development Setup

### 1. Install Dependencies

First, install all required dependencies:

```bash
npm install
```

### 2. Build the Extension

The extension is written in TypeScript and needs to be compiled to JavaScript:

```bash
# Compile once
npm run compile

# Or watch for changes and recompile automatically
npm run watch
```

The compiled JavaScript files will be placed in the `out/` directory.

### 3. Run in Development Mode

To test the extension during development:

1. Open the project in VS Code
2. Press `F5` or go to Run → Start Debugging
3. Select "Run Extension" configuration
4. A new Extension Development Host window will open
5. Your extension will be loaded and active in this window

**Note**: The extension only runs in the Extension Development Host window, not in your main VS Code instance.

## Building for Distribution

### 1. Install vsce (VS Code Extension Manager)

Install the `vsce` tool globally to package and publish extensions:

```bash
npm install -g @vscode/vsce
```

### 2. Package the Extension

Create a distributable `.vsix` file:

```bash
# Basic packaging
vsce package

# Package with specific version
vsce package --major

# Package with custom output name
vsce package --out my-extension.vsix
```

This creates a `.vsix` file that can be installed or distributed.

### 3. Build Production Version

Before packaging, ensure you have a clean production build:

```bash
# Clean previous builds
rm -rf out/

# Compile for production
npm run compile

# Package the extension
vsce package
```

## Installing the Extension

### Method 1: Install from VSIX File (Recommended for Testing)

1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X`)
3. Click the "..." menu (three dots) at the top of the Extensions panel
4. Select "Install from VSIX..."
5. Choose your `.vsix` file
6. Reload VS Code when prompted

### Method 2: Install from Source (Development)

1. Clone the repository to a folder
2. Open the folder in VS Code
3. Press `F5` to run in Extension Development Host
4. The extension will be active in the new window

### Method 3: Install Globally (System-wide)

```bash
# Install the extension globally
code --install-extension your-extension.vsix

# Or install from a local path
code --install-extension /path/to/your-extension.vsix
```

## Publishing to VS Code Marketplace

### 1. Prepare for Publishing

Update your `package.json` with proper metadata:

```json
{
  "publisher": "your-publisher-name",
  "repository": {
    "type": "git",
    "url": "https://github.com/your-username/vscode-extension.git"
  },
  "homepage": "https://github.com/your-username/vscode-extension#readme",
  "bugs": "https://github.com/your-username/vscode-extension/issues"
}
```

### 2. Create a Personal Access Token

1. Go to [Azure DevOps](https://dev.azure.com)
2. Create or sign in to your organization
3. Go to User Settings → Personal Access Tokens
4. Create a new token with Marketplace (Publish) permissions

### 3. Publish the Extension

```bash
# Login with your Personal Access Token
vsce login your-publisher-name

# Publish the extension
vsce publish

# Publish with specific version
vsce publish patch  # patch, minor, or major
```

## Troubleshooting

### Common Build Issues

**TypeScript compilation errors:**
```bash
# Check for TypeScript errors
npx tsc --noEmit

# Fix linting issues
npm run lint
```

**Missing dependencies:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

**Extension not loading:**
- Check the Developer Console (`Help → Toggle Developer Tools`)
- Verify the `main` field in `package.json` points to the correct file
- Ensure all required files are in the `out/` directory

### Installation Issues

**Extension fails to install:**
- Verify the `.vsix` file is not corrupted
- Check VS Code version compatibility
- Ensure you have sufficient permissions

**Extension not appearing:**
- Reload VS Code (`Ctrl+Shift+P` → "Developer: Reload Window")
- Check the Extensions panel for any error messages
- Verify the extension is enabled

## Development Workflow

### Recommended Development Process

1. **Make changes** to TypeScript files in `src/`
2. **Watch for changes**: `npm run watch` (in a separate terminal)
3. **Test changes**: Press `F5` to open Extension Development Host
4. **Debug**: Set breakpoints and use VS Code's debugging tools
5. **Package**: `vsce package` when ready to test installation
6. **Install**: Install the `.vsix` file to test the packaged version
7. **Publish**: When satisfied, publish to the marketplace

### Testing Your Extension

- Use the Extension Development Host for quick testing
- Install the `.vsix` file to test the actual installation process
- Test on different VS Code versions if possible
- Verify all commands and features work as expected

## File Structure

```
├── src/                    # TypeScript source code
│   ├── extension.ts       # Main extension entry point
│   └── test/              # Test files
├── out/                   # Compiled JavaScript (generated)
├── package.json           # Extension manifest and scripts
├── tsconfig.json          # TypeScript configuration
├── .eslintrc.json         # ESLint configuration
└── .vscode/               # VS Code workspace settings
```

## Additional Resources

- [VS Code Extension API Documentation](https://code.visualstudio.com/api)
- [Extension Publishing Guide](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [Extension Manifest Reference](https://code.visualstudio.com/api/references/extension-manifest)
- [vsce Documentation](https://github.com/microsoft/vscode-vsce)

## Support

If you encounter issues:

1. Check the VS Code Developer Console for error messages
2. Review the extension's activation logs
3. Verify all prerequisites are met
4. Check the troubleshooting section above
5. Open an issue on the project's GitHub repository

---

**Happy coding!** 🚀
