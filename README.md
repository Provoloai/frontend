# Provolo

A React + Vite application with TypeScript, Tailwind CSS, and automated code quality checks.

## 🚀 Quick Setup

### Prerequisites
- Node.js (v18 or higher)
- pnpm (will be installed automatically if not present)

### Installation

#### macOS/Linux:
```bash
chmod +x setup.sh
./setup.sh
```

#### Windows:
```cmd
setup.bat
```

#### Manual Setup:
```bash
pnpm install
pnpm exec husky init
```

## 🛠️ Development

```bash
# Start development server
pnpm run dev

# Build for production
pnpm run build

# Run linting
pnpm run lint

# Fix linting issues
pnpm run lint:fix

# Run type checking
pnpm run type-check

# Format code
pnpm run format
```

## 🔧 Git Hooks

This project uses Husky for automated code quality checks:

- **Pre-commit**: Runs linting and type checking
- **Pre-push**: Runs build to ensure everything compiles

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── landing/        # Landing page components
│   ├── header/         # Header components
│   ├── footer/         # Footer components
│   └── ...
├── pages/              # Main page components
│   ├── auth/           # Login, signup, etc.
│   ├── landing/        # Landing page sections
│   └── ...
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── constants/          # Application constants
├── utils/              # Utility functions
├── assets/             # Images, fonts, etc.
└── routes/             # TanStack Router routes
```

## 🚀 Running the App

```bash
# Start development server
pnpm run dev

# Open http://localhost:5173 in your browser
```

## 🧪 Testing

```bash
# Test git hooks
git add .
git commit -m "test: setup verification"
```
