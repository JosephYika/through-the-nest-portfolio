# Vercel Deployment Guide

## 🚀 Deployment Steps

### 1. Build Verification
The project is configured as a monorepo with proper Vercel integration:

```bash
npm run build
```

This builds:
- **Frontend**: React app → `dist/public/`
- **Backend**: Express server → `dist/index.js`
- **Images**: All portfolio images copied to build output

### 2. Vercel Configuration
The `vercel.json` is optimized for this full-stack setup:

- **Static Build**: Handles React frontend
- **Serverless Function**: Handles Express API routes
- **Image Routing**: Serves optimized images properly
- **SPA Routing**: All routes fallback to `index.html`

### 3. Environment Variables in Vercel
Set these in your Vercel project dashboard:

```
RESEND_API_KEY=re_your_actual_api_key_here
CONTACT_EMAIL=austin@throughthenest.com
NODE_ENV=production
```

### 4. Domain Configuration
Your app will be available at:
- **Production**: `through-the-nest.vercel.app`
- **API Endpoints**: `through-the-nest.vercel.app/api/contact`

## 🔧 File Structure
```
dist/
├── public/           # Built React app
│   ├── index.html
│   ├── assets/       # JS/CSS bundles
│   └── images/       # All portfolio images
│       ├── featured/ # Featured works (WebP optimized)
│       └── wedding/  # Wedding gallery (optimized)
└── index.js          # Express server (serverless function)
```

## ✅ What's Deployed
- ✓ **Portfolio Gallery**: All optimized images with lazy loading
- ✓ **Contact Form**: Email functionality with Resend integration
- ✓ **Featured Works**: WebP optimized images
- ✓ **Mobile Optimization**: Responsive portfolio filters
- ✓ **SEO Ready**: Proper meta tags and structure

## 🐛 Troubleshooting

### 404 Errors
The current vercel.json fixes routing issues by:
1. API routes go to serverless function
2. Static assets served from build output
3. All other routes serve the React SPA

### Image Loading Issues
- Images are copied from `client/public/images/` to build output
- All image paths are relative and work in production
- Optimized images maintain folder structure

### Build Failures
- Run `npm run build` locally to test
- Check that all dependencies are in package.json
- Verify TypeScript compilation passes