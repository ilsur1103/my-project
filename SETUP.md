# Setup Instructions

## 📦 Downloaded Files Organization

Your project has been exported as multiple files. Follow these steps to set it up:

### Step 1: Create Project Folder

```bash
mkdir e-commerce-landing
cd e-commerce-landing
```

### Step 2: Organize Files

All downloaded files have the format: `e-commerce-landing__path__to__file.ext`

You need to:
1. Remove the `e-commerce-landing__` prefix
2. Replace `__` with `/` to recreate directories
3. Move files to their proper locations

### Option A: Automated Script (Mac/Linux)

Create this script as `organize.sh`:

```bash
#!/bin/bash

# Move all downloaded files to current directory
mv ~/Downloads/e-commerce-landing__* .

# Organize files
for file in e-commerce-landing__*; do
  # Remove project prefix
  newname="${file#e-commerce-landing__}"
  
  # Replace __ with /
  newname="${newname//__//}"
  
  # Create directory if needed
  mkdir -p "$(dirname "$newname")"
  
  # Move file
  mv "$file" "$newname"
  
  echo "Organized: $newname"
done

echo "✅ Files organized successfully!"
```

Run it:
```bash
chmod +x organize.sh
./organize.sh
```

### Option B: Manual Organization

Example transformations:
- `e-commerce-landing__package.json` → `package.json`
- `e-commerce-landing__src__App.tsx` → `src/App.tsx`
- `e-commerce-landing__src__pages__HomePage.tsx` → `src/pages/HomePage.tsx`

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Setup Environment Variables (if needed)

If your project uses environment variables:

```bash
cp .env.example .env
```

Edit `.env` and add your actual values.

### Step 5: Start Development Server

```bash
npm start
```

Your app will open at: **http://localhost:3000**

## 🚀 Quick Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production (no type checking) |
| `npm run preview` | Preview production build |
| `npm run typecheck` | Run TypeScript type checking |

## 📁 Expected Project Structure

After organizing, you should have:

```
e-commerce-landing/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .gitignore
├── .env.example
├── README.md
├── SETUP.md (this file)
├── project.json
├── index.html
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   ├── pages/
│   ├── components/
│   └── assets/
└── public/
```

## ❓ Troubleshooting

**Files still have double underscores in names?**
- Make sure to run the organization script or manually rename files

**npm install fails?**
- Ensure Node.js 18+ is installed: `node --version`
- Try: `npm cache clean --force` then `npm install`

**Port 3000 already in use?**
- Edit `vite.config.ts` and change the port number
- Or stop the process using port 3000

**Environment variables not working?**
- Ensure variables start with `VITE_`
- Restart dev server after editing `.env`

**Visual styling differences in production build?**
- All UI component dependencies (lucide-react, @radix-ui/*, etc.) are included automatically
- Run `npm run build` - it automatically cleans the dist folder before building
- If issues persist, delete node_modules and reinstall: `rm -rf node_modules && npm install`

**Custom components not displaying?**
- The build system automatically extracts and includes all custom components
- Clear the build cache: `rm -rf dist` then `npm run build`

## 🎯 Next Steps

1. ✅ Organize files (you're doing this now!)
2. ✅ Install dependencies
3. ✅ Configure environment variables
4. ✅ Start development server
5. 🎨 Start coding!
6. 🚀 Deploy to GitHub Pages (see DEPLOYMENT.md)

## 🔄 Re-editing in Builder

To edit this project in the visual builder again:
1. Locate `project.json` file
2. Import it back into the Web App Builder
3. All your frames and components will be restored

---

Need help? Check README.md for more details!
