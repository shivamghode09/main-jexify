# Jexify - Modern JavaScript Tools

This repository contains two main projects:

1. **Jexify CLI** - A smart scaffolding tool for JavaScript projects
2. **Jexify UI Library** - A lightweight JavaScript library for building user interfaces

---

## Jexify CLI - Modern JavaScript Project Scaffolding

Jexify CLI is a smart scaffolding tool that speeds up JavaScript development by reducing boilerplate and automating setup.

### Features

- **Quick Setup**: Creates a production-ready project structure in seconds
- **Pre-configured**: Includes Vite, ESLint, and PostCSS out of the box
- **Dependency Management**: Automatically installs required packages
- **Hot Reloading**: Built-in development server with hot module replacement

### Installation

```bash
# Install global package
npm install -g create-jexify-app

# Create a new project
npx create-jexify-app my-app

# Navigate to project
cd my-app

# Start development server
npm run jexify
```

---

## Jexify UI Library - Modern JavaScript UI Library

A lightweight JavaScript library for building user interfaces with component-based architecture.

### Features

- **Lightning Fast**: Optimized virtual DOM implementation
- **Component-Based**: Create reusable UI components
- **Minimal Size**: Tiny footprint with no dependencies
- **Modern Architecture**: Built with modern JavaScript principles

### Installation

```bash
# Install package
npm install jexify
```

## Quick Start

```javascript
import { h1 } from "jexify";

function App() {
  // Build DOM structure & Render the component
  return h1({ class: "title" }, "Hello Jexify!").build();
}

export default App;
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Guidelines**:

- Follow existing code style
- Write tests for new features
- Update documentation
- Keep PRs focused on single features
- Ensure all tests pass before submitting

## Development Setup

```bash
# Clone the repository
git clone https://github.com/shivamghode09/main-jexify.git

# Navigate to project
cd main-jexify/jexify
```

## License

MIT License © 2025 **Jexify**

## Author

Created by **Shivam Ghode**

## Support

For support, bug reports, or feature requests:

- **GitHub Issues**: https://github.com/shivamghode09/main-jexify/issues
- **Email**: shivamghode2021@gmail.com

### Preferred Support Channels

1. For **bugs** or **feature requests**, please use GitHub Issues
2. For **private inquiries**, use email

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm Version](https://img.shields.io/npm/v/main-jexify)](https://www.npmjs.com/package/main-jexify)
[![Code Coverage](https://img.shields.io/codecov/c/github/shivamghode09/main-jexify)](https://codecov.io/gh/shivamghode09/main-jexify)
[![GitHub Stars](https://img.shields.io/github/stars/shivamghode09/main-jexify)](https://github.com/shivamghode09/main-jexify/stargazers)
[![Downloads](https://img.shields.io/npm/dt/main-jexify)](https://www.npmjs.com/package/main-jexify)

---
