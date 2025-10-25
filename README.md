# E-commerce Landing

Modern e-commerce landing page

## Getting Started

This project was created with the Web App Builder and uses Vite + React + TypeScript.

**🚀 Automatic Deployment:** This project includes GitHub Actions workflow for automatic deployment to GitHub Pages. See `DEPLOYMENT.md` for setup instructions.

### Prerequisites

- Node.js 18+ and npm

### Setup

Downloaded files will have prefixed names. Organize them first:

1. Create project folder
2. Extract files, removing the `projectname__` prefix
3. Replace `__` with `/` to restore directory structure
4. Or see SETUP.md for helper scripts

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm start
```

Or:

```bash
npm run dev
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Build

Create a production build:

```bash
npm run build
```

Note: Build runs without TypeScript type checking for faster builds. Run `npm run typecheck` separately if needed.

**Important:** 
- The build automatically cleans the `dist` folder before building to prevent stale files.
- **Always run `npm run build` before publishing/committing to GitHub** to ensure the production build matches your current project state.
- The `dist` folder is tracked in version control for easy deployment.

### Preview

Preview the production build:

```bash
npm run preview
```

## Troubleshooting

### Missing dependencies or styling issues

If you see missing dependencies or styling issues in the production build:

1. Delete `node_modules` and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. Clear the build cache:
   ```bash
   rm -rf dist
   npm run build
   ```

3. Ensure all dependencies are installed (the build system includes all UI component dependencies automatically)

## Project Structure

```
src/
├── pages/          # Page components (one per frame)
├── components/     # Reusable components
├── assets/         # Static assets
├── App.tsx         # Main application component
├── App.css         # Application styles
├── main.tsx        # Entry point
└── index.css       # Global styles
```

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

**Important:** Never commit `.env` to version control!

## Technologies

- React 18
- TypeScript
- Vite


## Last Modified

25.10.2025, 20:33:37

---

Built with ❤️ using Web App Builder
