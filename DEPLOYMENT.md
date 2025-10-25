# Deployment Guide

This project is configured to automatically deploy to GitHub Pages when you push to the main branch.

## ⚠️ Important: Production Build

**The GitHub Actions workflow automatically builds your project on every push.** However, for best practices:

- The `dist` folder is tracked in version control as a fallback
- When making changes in the Web App Builder, the builder will export updated source files
- GitHub Actions will build from source when you push

## Automatic Deployment with GitHub Actions

### Setup (One-Time)

1. **Enable GitHub Pages:**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Under "Build and deployment":
     - Source: Choose "GitHub Actions"
   - Save the settings

2. **Push your code:**
   ```bash
   git push origin main
   ```

3. **Wait for deployment:**
   - Go to the "Actions" tab in your GitHub repository
   - You'll see the workflow running
   - Once complete, your site will be live!

### Your Deployed Site

After the first successful deployment, your site will be available at:

```
https://<your-username>.github.io/e-commerce-landing/
```

Or if using a custom domain:

```
https://your-custom-domain.com
```

### Workflow Details

The included `.github/workflows/deploy.yml` file:

- ✅ Triggers on every push to `main` branch
- ✅ Installs dependencies with `npm ci`
- ✅ Builds the project with `npm run build`
- ✅ Deploys the `dist` folder to GitHub Pages
- ✅ Automatic - no manual intervention needed

### Manual Deployment Trigger

You can also manually trigger deployment:

1. Go to "Actions" tab
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"
4. Select the branch and click "Run workflow"

## Alternative: Manual Deployment

If you prefer to deploy manually without GitHub Actions:

### Deploy to GitHub Pages (gh-pages branch)

```bash
# Install gh-pages package
npm install --save-dev gh-pages

# Add deploy script to package.json
# "deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

### Deploy to Other Platforms

#### Vercel

```bash
npm install -g vercel
vercel
```

#### Netlify

```bash
npm install -g netlify-cli
netlify deploy
```

#### Build Configuration

All platforms can use these build settings:

- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

## Environment Variables for Deployment

If your app uses environment variables:

1. **For GitHub Pages:**
   - Go to Repository Settings → Secrets and variables → Actions
   - Add secrets with your variable values
   - Update the workflow file to pass them during build

2. **For other platforms:**
   - Add environment variables in their dashboard/settings
   - Ensure they start with `VITE_` to be exposed to your app

## Build Verification

Before deploying, test the production build locally:

```bash
npm run build
npm run preview
```

Then visit http://localhost:4173 to verify everything works.

## Troubleshooting

### Deployment fails with "ENOENT: no such file or directory"

- Ensure `dist` folder is created during build
- Check that `npm run build` completes successfully
- Verify vite.config.ts has `outDir: 'dist'`

### Site shows 404 errors

- Check the base path in vite.config.ts matches your repository name
- For GitHub Pages at `username.github.io/repo`:
  ```typescript
  export default defineConfig({
    base: '/e-commerce-landing/',
    // ...
  });
  ```

### Assets not loading

- Ensure all asset paths are relative
- Check that the base URL is configured correctly
- Verify build output includes all assets

### GitHub Actions workflow not running

- Check that the workflow file is in `.github/workflows/` directory
- Ensure the branch name matches (default is 'main')
- Verify GitHub Actions is enabled in repository settings

## Custom Domain

To use a custom domain with GitHub Pages:

1. Add a `CNAME` file to `public/` directory with your domain:
   ```
   example.com
   ```

2. Configure DNS records with your domain provider:
   - For apex domain (example.com):
     - A records pointing to GitHub Pages IPs
   - For subdomain (www.example.com):
     - CNAME record pointing to `<username>.github.io`

3. Enable HTTPS in GitHub Pages settings

---

**Note:** The `dist` folder is excluded from git (in .gitignore) because it's built automatically by GitHub Actions. This is a best practice to keep your repository clean and avoid merge conflicts.
