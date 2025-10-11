# Contributing to Kosign

Thank you for your interest in contributing to Kosign! This document provides guidelines and information for contributors.

## 🤝 Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please be respectful and constructive in all interactions.

## 🚀 Getting Started

### Prerequisites
- Node.js 14+ and npm/yarn
- Git
- Basic understanding of React and JavaScript
- Familiarity with cryptographic concepts (helpful but not required)

### Development Setup

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/yourusername/kosign.git
   cd kosign
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run tests**
   ```bash
   npm test
   # or
   yarn test
   ```

## 📋 How to Contribute

### Reporting Bugs

1. **Check existing issues** first to avoid duplicates
2. **Use the bug report template** when creating new issues
3. **Include reproduction steps** and environment details
4. **For security issues**, see [SECURITY.md](SECURITY.md)

### Suggesting Features

1. **Check existing feature requests** to avoid duplicates
2. **Use the feature request template**
3. **Explain the use case** and expected behavior
4. **Consider security implications** for cryptographic features

### Code Contributions

#### Types of Contributions Welcome
- 🐛 Bug fixes
- ✨ New features (discuss first in issues)
- 📚 Documentation improvements
- 🎨 UI/UX enhancements
- 🔒 Security improvements
- 🧪 Test coverage improvements
- ♿ Accessibility improvements

#### Before You Start
1. **Create or comment on an issue** to discuss your planned changes
2. **Check if someone else is already working** on the same thing
3. **For large changes**, consider creating a design document first

## 🔧 Development Guidelines

### Code Style
- **ESLint**: Follow the included ESLint configuration
- **Prettier**: Use Prettier for code formatting
- **React**: Follow React best practices and hooks patterns
- **Comments**: Document complex cryptographic operations

### Commit Messages
Use conventional commit format:
```
type(scope): description

Examples:
feat(crypto): add support for larger key sizes
fix(ui): resolve QR code scanning on mobile
docs(readme): update installation instructions
test(sharing): add tests for edge cases
```

### Branch Naming
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

### Pull Request Process

1. **Create a feature branch** from `main`
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the guidelines
3. **Add tests** for new functionality
4. **Update documentation** if needed
5. **Test thoroughly** including edge cases
6. **Create pull request** with detailed description

#### Pull Request Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Tests added/updated and passing
- [ ] Documentation updated
- [ ] No breaking changes (or clearly documented)
- [ ] Security implications considered
- [ ] Performance impact assessed

## 🧪 Testing

### Test Categories
- **Unit Tests**: Individual function testing
- **Integration Tests**: Component interaction testing
- **Cryptographic Tests**: Verify mathematical correctness
- **UI Tests**: User interface functionality
- **Security Tests**: Vulnerability and edge case testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Writing Tests
- Test cryptographic functions thoroughly
- Include edge cases and error conditions
- Mock external dependencies
- Test UI components with user interactions

## 🔒 Security Considerations

### Cryptographic Code
- **Peer Review Required**: All crypto code must be reviewed
- **Test Vectors**: Include standard test vectors where applicable
- **Constant Time**: Consider timing attack resistance
- **Memory Safety**: Clear sensitive data when possible

### Dependencies
- **Minimize Dependencies**: Avoid unnecessary third-party libraries
- **Audit Dependencies**: Regularly check for vulnerabilities
- **Pin Versions**: Use exact versions for security-critical dependencies

### Code Review Focus Areas
- Input validation and sanitization
- Cryptographic implementation correctness
- Random number generation quality
- Memory handling of sensitive data
- Error handling and information leakage

## 📚 Documentation

### Types of Documentation
- **Code Comments**: Explain complex algorithms
- **API Documentation**: Document public interfaces
- **User Guides**: Help users understand features
- **Security Documentation**: Explain security model
- **Architecture Documentation**: System design and decisions

### Documentation Standards
- Clear and concise language
- Include examples where helpful
- Keep documentation up-to-date with code changes
- Consider non-native English speakers

## 🎯 Areas Needing Help

### High Priority
- 🔒 Security audit and testing
- 🧪 Comprehensive test coverage
- 📱 Mobile UI improvements
- ♿ Accessibility enhancements
- 🌍 Internationalization support

### Medium Priority
- 📊 Performance optimizations
- 🎨 UI/UX improvements
- 📚 Documentation expansion
- 🔧 Developer tooling improvements

### Good First Issues
Look for issues labeled `good-first-issue` - these are designed for new contributors and include extra guidance.

## 🏗️ Architecture Overview

### Key Components
- **EncryptionService**: Core cryptographic operations
- **ProFeatureService**: Feature and limit management
- **CreateVault**: Main vault creation workflow
- **QR Components**: QR code generation and scanning
- **PDF Components**: Document generation

### Data Flow
1. User enters secret data
2. Data encrypted with AES-256
3. Encrypted data split using Shamir's Secret Sharing
4. Shares encoded into QR codes
5. QR codes rendered in printable PDFs

## 🤔 Questions?

- **General Questions**: Create a GitHub Discussion
- **Bug Reports**: Create a GitHub Issue
- **Security Issues**: Email [security@kosign.xyz](mailto:security@kosign.xyz)
- **Feature Requests**: Create a GitHub Issue with feature template

## 🙏 Recognition

Contributors will be recognized in:
- GitHub contributors list
- Release notes for significant contributions
- README acknowledgments section

## 📄 License

By contributing to Kosign, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for helping make Kosign more secure and accessible for everyone!** 🎉
