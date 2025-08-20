# VS Code Extension

A VS Code extension project template with TypeScript support.

## Features

- TypeScript support
- ESLint configuration
- Testing framework with Mocha
- VS Code debugging configuration
- Build and watch scripts

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- VS Code
- Git

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

- **Compile**: `npm run compile`
- **Watch**: `npm run watch` (automatically recompiles on changes)
- **Lint**: `npm run lint`
- **Test**: `npm test`

### Running the Extension

1. Press `F5` to open a new Extension Development Host window
2. Use the Command Palette (`Ctrl+Shift+P`) and run "Hello World"
3. You should see a notification message

### Debugging

- Use the "Run Extension" configuration in the debug panel
- Set breakpoints in your TypeScript code
- The extension will run in a new VS Code window

## Project Structure

```
├── .vscode/          # VS Code configuration files
├── src/              # Source code
│   ├── extension.ts  # Main extension entry point
│   └── test/         # Test files
├── out/              # Compiled JavaScript (generated)
├── package.json      # Project configuration
├── tsconfig.json     # TypeScript configuration
└── .eslintrc.json    # ESLint configuration
```

## Customization

1. Update `package.json` with your extension details
2. Modify `src/extension.ts` to implement your functionality
3. Add new commands in the `contributes.commands` section
4. Update the README with your extension's specific information

## Publishing

1. Install `vsce`: `npm install -g @vscode/vsce`
2. Package your extension: `vsce package`
3. Publish to the VS Code Marketplace: `vsce publish`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
