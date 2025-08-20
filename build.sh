

#!/usr/bin/env bashgaf 

# VS Code Extension Build Script
# This script automates the process of building and packaging the extension

set -e  # Exit on any error

echo "🚀 Starting VS Code Extension Build Process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the extension root directory."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_status "Node.js version: $(node --version)"
print_status "npm version: $(npm --version)"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    print_status "Installing dependencies..."
    npm install
    print_success "Dependencies installed successfully"
else
    print_status "Dependencies already installed, checking for updates..."
    npm install
    print_success "Dependencies up to date"
fi

# Check if vsce is available
if ! npx vsce --version &> /dev/null; then
    print_status "Installing @vscode/vsce locally..."
    npm install --save-dev @vscode/vsce
    print_success "vsce installed successfully"
fi

# Clean previous builds
print_status "Cleaning previous builds..."
rm -rf out/
rm -f *.vsix
print_success "Previous builds cleaned"

# Compile TypeScript
print_status "Compiling TypeScript..."
npm run compile
if [ $? -eq 0 ]; then
    print_success "TypeScript compilation completed"
else
    print_error "TypeScript compilation failed"
    exit 1
fi

# Run linting
print_status "Running linting..."
npm run lint
if [ $? -eq 0 ]; then
    print_success "Linting passed"
else
    print_warning "Linting failed, but continuing with build"
fi

# Package the extension
print_status "Packaging extension into .vsix file..."
npx vsce package
if [ $? -eq 0 ]; then
    print_success "Extension packaged successfully"
else
    print_error "Packaging failed"
    exit 1
fi

# Get the created .vsix file
VSIX_FILE=$(ls -t *.vsix 2>/dev/null | head -1)

if [ -n "$VSIX_FILE" ]; then
    # Get file size
    FILE_SIZE=$(du -h "$VSIX_FILE" | cut -f1)
    
    print_success "Build completed successfully! 🎉"
    echo ""
    echo "📦 Extension Package Details:"
    echo "   File: $VSIX_FILE"
    echo "   Size: $FILE_SIZE"
    echo "   Location: $(pwd)/$VSIX_FILE"
    echo ""
    echo "💡 To install this extension in VS Code:"
    echo "   1. Open VS Code"
    echo "   2. Press Ctrl+Shift+P (Cmd+Shift+P on Mac)"
    echo "   3. Type 'Extensions: Install from VSIX...'"
    echo "   4. Select this file: $VSIX_FILE"
    echo ""
    echo "🚀 To distribute this extension, share the .vsix file with others."
else
    print_error "No .vsix file was created"
    exit 1
fi
