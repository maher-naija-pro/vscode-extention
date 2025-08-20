@echo off
REM VS Code Extension Build Script for Windows
REM This script automates the process of building and packaging the extension

echo 🚀 Starting VS Code Extension Build Process...

REM Check if we're in the right directory
if not exist "package.json" (
    echo [ERROR] package.json not found. Please run this script from the extension root directory.
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed. Please install Node.js first.
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm is not installed. Please install npm first.
    exit /b 1
)

echo [INFO] Node.js version: 
node --version
echo [INFO] npm version: 
npm --version

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo [INFO] Installing dependencies...
    npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install dependencies
        exit /b 1
    )
    echo [SUCCESS] Dependencies installed successfully
) else (
    echo [INFO] Dependencies already installed, checking for updates...
    npm install
    echo [SUCCESS] Dependencies up to date
)

REM Check if vsce is available
npx vsce --version >nul 2>&1
if errorlevel 1 (
    echo [INFO] Installing @vscode/vsce locally...
    npm install --save-dev @vscode/vsce
    if errorlevel 1 (
        echo [ERROR] Failed to install vsce
        exit /b 1
    )
    echo [SUCCESS] vsce installed successfully
)

REM Clean previous builds
echo [INFO] Cleaning previous builds...
if exist "out" rmdir /s /q "out"
del /q *.vsix 2>nul
echo [SUCCESS] Previous builds cleaned

REM Compile TypeScript
echo [INFO] Compiling TypeScript...
npm run compile
if errorlevel 1 (
    echo [ERROR] TypeScript compilation failed
    exit /b 1
)
echo [SUCCESS] TypeScript compilation completed

REM Run linting
echo [INFO] Running linting...
npm run lint
if errorlevel 1 (
    echo [WARNING] Linting failed, but continuing with build
) else (
    echo [SUCCESS] Linting passed
)

REM Package the extension
echo [INFO] Packaging extension into .vsix file...
npx vsce package
if errorlevel 1 (
    echo [ERROR] Packaging failed
    exit /b 1
)
echo [SUCCESS] Extension packaged successfully

REM Find the created .vsix file
for %%f in (*.vsix) do (
    echo.
    echo [SUCCESS] Build completed successfully! 🎉
    echo.
    echo 📦 Extension Package Details:
    echo    File: %%f
    echo    Location: %cd%\%%f
    echo.
    echo 💡 To install this extension in VS Code:
    echo    1. Open VS Code
    echo    2. Press Ctrl+Shift+P
    echo    3. Type 'Extensions: Install from VSIX...'
    echo    4. Select this file: %%f
    echo.
    echo 🚀 To distribute this extension, share the .vsix file with others.
    goto :end
)

echo [ERROR] No .vsix file was created
exit /b 1

:end
pause
