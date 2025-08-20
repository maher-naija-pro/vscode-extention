

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

