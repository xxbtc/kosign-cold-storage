# Installation Guide

This guide covers different ways to install and run Kosign for maximum security.

## 🌐 Online Version (Quick Start)

The easiest way to try Kosign is through the hosted version:

**Visit: [https://kosign.xyz](https://kosign.xyz)**

⚠️ **Security Note**: For maximum security with sensitive data, use the offline installation methods below.

## 💻 Self-Hosted Installation

### Prerequisites

- **Node.js**: Version 14 or higher
- **npm** or **yarn**: Package manager
- **Git**: For cloning the repository

### Method 1: Standard Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/kosign.git
cd kosign

# Install dependencies
npm install
# or
yarn install

# Start development server
npm start
# or
yarn start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Method 2: Production Build

For better performance and security:

```bash
# Build for production
npm run build
# or
yarn build

# Serve the built files
npx serve -s build -p 3000
```

### Method 3: Docker Installation

```bash
# Build Docker image
docker build -t kosign .

# Run container
docker run -p 3000:3000 kosign
```

## 🔒 Air-Gapped Installation (Maximum Security)

For handling sensitive data like cryptocurrency seeds or master passwords:

### Step 1: Prepare Online Computer

```bash
# On internet-connected computer
git clone https://github.com/yourusername/kosign.git
cd kosign
npm install
npm run build

# Create offline package
tar -czf kosign-offline.tar.gz build/ package.json
```

### Step 2: Transfer to Offline Computer

1. Copy `kosign-offline.tar.gz` to offline computer via USB drive
2. Extract on offline computer:

```bash
# On offline computer
tar -xzf kosign-offline.tar.gz
cd kosign

# Install a simple HTTP server (if not already available)
npm install -g serve

# Serve the application
serve -s build -p 3000
```

### Step 3: Verify Air Gap

- Ensure network interfaces are disabled
- Remove or disable WiFi/Ethernet adapters
- Verify no internet connectivity

## 📱 Mobile Installation

### iOS (Safari)
1. Visit the Kosign URL in Safari
2. Tap the Share button
3. Select "Add to Home Screen"
4. The app will work offline after first load

### Android (Chrome)
1. Visit the Kosign URL in Chrome
2. Tap the menu (three dots)
3. Select "Add to Home screen"
4. The app will work offline after first load

## 🛠️ Development Setup

For contributors and developers:

```bash
# Clone your fork
git clone https://github.com/yourusername/kosign.git
cd kosign

# Install dependencies
npm install

# Start development server with hot reload
npm start

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Build for production
npm run build
```

### Development Tools

Optional but recommended:

```bash
# Install ESLint globally
npm install -g eslint

# Install Prettier globally
npm install -g prettier

# Run linting
npm run lint

# Format code
npm run format
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Optional: Custom port
PORT=3000

# Optional: Build path
BUILD_PATH=build

# Optional: Public URL
PUBLIC_URL=/
```

### Browser Compatibility

Kosign requires a modern browser with:
- Web Crypto API support
- ES6+ JavaScript support
- Canvas API for QR code generation

**Supported Browsers:**
- Chrome/Chromium 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🐳 Docker Installation

### Using Docker Hub

```bash
# Pull and run
docker run -p 3000:3000 kosign/kosign:latest
```

### Building from Source

```bash
# Clone repository
git clone https://github.com/yourusername/kosign.git
cd kosign

# Build image
docker build -t kosign .

# Run container
docker run -p 3000:3000 kosign

# Run in background
docker run -d -p 3000:3000 --name kosign kosign
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  kosign:
    build: .
    ports:
      - "3000:3000"
    restart: unless-stopped
```

Run with:
```bash
docker-compose up -d
```

## 🔍 Verification

### Verify Installation

1. **Check Application Loads**: Navigate to the URL and verify the interface loads
2. **Test Vault Creation**: Create a test vault with dummy data
3. **Test QR Generation**: Verify QR codes generate correctly
4. **Test PDF Export**: Ensure PDF generation works
5. **Test Recovery**: Verify you can recover the test secret

### Security Verification

1. **Network Isolation**: Verify no network requests in browser dev tools
2. **Source Code**: Review the source code for any suspicious modifications
3. **Dependencies**: Audit package.json for unexpected dependencies
4. **Build Integrity**: Verify build matches expected output

## 🚨 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use different port
PORT=3001 npm start
```

**Build Fails**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**QR Codes Don't Generate**
- Ensure Canvas API is supported
- Check browser console for errors
- Try different browser

**PDF Export Fails**
- Verify sufficient memory available
- Check browser console for errors
- Try reducing vault size

### Getting Help

- **Documentation**: Check README.md and inline comments
- **Issues**: Report bugs on GitHub Issues
- **Discussions**: Ask questions in GitHub Discussions
- **Security**: Email security@kosign.xyz for security issues

## 📋 Next Steps

After installation:

1. **Read the Security Guide**: Understand the threat model
2. **Test with Dummy Data**: Practice the workflow
3. **Plan Your Setup**: Decide on key distribution strategy
4. **Create Real Vaults**: Start with less critical data
5. **Backup Strategy**: Plan for key storage and recovery

## 🔄 Updates

### Updating Installation

```bash
# Pull latest changes
git pull origin main

# Update dependencies
npm install

# Rebuild
npm run build
```

### Version Management

```bash
# Check current version
npm list kosign

# View changelog
git log --oneline
```

---

**Remember: Test thoroughly with non-critical data before using with sensitive information!**
