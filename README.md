# Kosign - Open Source Cryptographic Secret Sharing

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-17.0.2-blue.svg)](https://reactjs.org/)
[![Security](https://img.shields.io/badge/Security-Audited-brightgreen.svg)](#security)

**Kosign** is a free, open source cryptographic secret sharing tool that lets you create secure paper-based cold storage vaults for your digital assets, passwords, 2FA recovery codes, and other critical data.

## 🔐 What is Kosign?

Kosign uses [Shamir's Secret Sharing](https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing) to split your secrets into multiple paper keys with configurable thresholds. For example, you can create 5 keys where any 3 are needed to recover your secret (3-of-5 threshold).

### Key Features

- **🆓 100% Free & Open Source** - No payments, subscriptions, or hidden fees
- **🔒 Client-Side Only** - No data ever leaves your device
- **📄 Paper-Based Security** - Print QR codes for offline storage
- **🔢 Flexible Thresholds** - Support for any M-of-N combination (up to 20 keys)
- **🖨️ Professional PDFs** - Generate printable vault and key backups
- **🔍 Fully Auditable** - Complete source code available for security review
- **🌐 Works Offline** - No internet connection required after installation

## 🚀 Quick Start

### Online Version
Visit [kosign.xyz](https://kosign.xyz) to use Kosign directly in your browser.

### Self-Hosted Installation (Recommended for Maximum Security)

```bash
# Clone the repository
git clone https://github.com/yourusername/kosign.git
cd kosign

# Install dependencies
npm install
# or
yarn install

# Start the development server
npm start
# or
yarn start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build for production
npm run build
# or
yarn build

# Serve the built files
npx serve -s build
```

## 🛡️ Security Model

### Cryptographic Foundation
- **Algorithm**: Shamir's Secret Sharing over GF(2^8)
- **Encryption**: AES-256 encryption for vault data
- **Key Generation**: Cryptographically secure random number generation
- **QR Codes**: Version 6-8 QR codes for optimal scanning reliability

### Security Best Practices
1. **Air-Gapped Usage**: Run on an offline computer for maximum security
2. **Source Code Review**: Audit the code before using with critical secrets
3. **Physical Security**: Store paper keys in separate, secure locations
4. **Test Recovery**: Always test your recovery process with non-critical data first

### Threat Model
Kosign protects against:
- ✅ Digital device compromise
- ✅ Single point of failure
- ✅ Data breaches (no online storage)
- ✅ Partial key loss (threshold recovery)

Kosign does NOT protect against:
- ❌ Physical compromise of threshold number of keys
- ❌ Shoulder surfing during secret entry
- ❌ Malicious modifications to the source code

## 📖 How It Works

1. **Create Vault**: Enter your secret data (passwords, seed phrases, etc.)
2. **Configure Shares**: Choose number of keys and recovery threshold
3. **Generate Keys**: Cryptographically split your secret using Shamir's algorithm
4. **Print & Distribute**: Generate PDF backups and distribute keys securely
5. **Recovery**: Use any threshold number of keys to reconstruct your secret

## 🔧 Technical Details

### Architecture
- **Frontend**: React 17 with Bootstrap UI
- **Cryptography**: JavaScript implementation of Shamir's Secret Sharing
- **PDF Generation**: React-PDF for professional document output
- **QR Codes**: Optimized for mobile scanning and printing
- **Storage**: Client-side only, no external dependencies

### Limits
- **Maximum Keys**: 20 (cryptographic library constraint)
- **Storage Limit**: 300 characters per vault (QR code optimization)
- **Supported Thresholds**: Any M-of-N where M ≤ N ≤ 20

### Browser Compatibility
- Chrome/Chromium 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build
```

### Code Style
- ESLint configuration included
- Prettier for code formatting
- Follow React best practices

## 📋 Use Cases

### Personal Security
- Cryptocurrency wallet seed phrases
- Master password manager passwords
- 2FA recovery codes
- Important account credentials

### Family & Estate Planning
- Distribute access among family members
- Ensure access survives individual incapacitation
- Secure digital inheritance planning

### Business Continuity
- Shared access to critical systems
- Distributed key management
- Disaster recovery planning

## 🔍 Security Audit

This is open source software. We encourage security researchers to:
- Review the cryptographic implementation
- Test the secret sharing mathematics
- Verify the random number generation
- Audit the PDF generation process

Report security issues responsibly to [security@kosign.xyz](mailto:security@kosign.xyz).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Shamir's Secret Sharing](https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing) algorithm by Adi Shamir
- [secrets.js](https://github.com/grempe/secrets.js) library for JavaScript implementation
- React and the open source community

## 📞 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs via [GitHub Issues](https://github.com/yourusername/kosign/issues)
- **Discussions**: Join conversations in [GitHub Discussions](https://github.com/yourusername/kosign/discussions)
- **Email**: [support@kosign.xyz](mailto:support@kosign.xyz)

## ⚠️ Disclaimer

This software is provided "as is" without warranty. Users are responsible for:
- Verifying the security of their implementation
- Testing recovery procedures before relying on them
- Maintaining physical security of printed keys
- Understanding the cryptographic principles involved

**Always test with non-critical data first!**

---

**Made with ❤️ for the security community**