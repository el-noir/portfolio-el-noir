# GitHub Pages Deployment

This portfolio is automatically deployed to GitHub Pages using GitHub Actions.

## Setup Instructions

1. Go to your repository settings on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Build and deployment**:
   - Source: Select **GitHub Actions**
4. Push to the `main` branch to trigger automatic deployment

## Configuration

- The workflow is defined in `.github/workflows/deploy.yml`
- Next.js is configured for static export in `next.config.ts`
- The site will be available at: `https://<username>.github.io/<repository>/`

## Manual Deployment

You can also trigger deployment manually from the **Actions** tab in your repository.
