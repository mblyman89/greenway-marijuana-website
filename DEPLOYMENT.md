# Greenway Marijuana Website Deployment Guide

This document outlines the deployment process for the Greenway Marijuana website.

## Prerequisites

- Node.js 18.x or later
- npm 9.x or later
- Access to the production environment
- Vercel account with appropriate permissions
- Environment variables configured in Vercel

## Environment Variables

The following environment variables must be configured in your production environment:

```
# Application
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://greenwaymarijuana.com

# Database
DATABASE_URL=postgresql://username:password@host:5432/greenway_marijuana

# Authentication
NEXTAUTH_URL=https://greenwaymarijuana.com
NEXTAUTH_SECRET=your-nextauth-secret-key-here

# Third-Party Integrations
# Leafly API
LEAFLY_API_KEY=your-leafly-api-key
LEAFLY_API_SECRET=your-leafly-api-secret

# Weedmaps API
WEEDMAPS_API_KEY=your-weedmaps-api-key
WEEDMAPS_API_SECRET=your-weedmaps-api-secret
WEEDMAPS_WEBHOOK_SECRET=your-weedmaps-webhook-secret

# CultiveraPOS
CULTIVERA_POS_API_KEY=your-cultivera-pos-api-key
CULTIVERA_POS_API_URL=https://api.cultivera.com/v1

# Email Service
EMAIL_SERVER=smtp://username:password@smtp.example.com:587
EMAIL_FROM=noreply@greenwaymarijuana.com

# Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Feature Flags
ENABLE_LOYALTY_PROGRAM=true
ENABLE_BLOG=true
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. **Connect your GitHub repository to Vercel**
   - Log in to Vercel and create a new project
   - Connect to your GitHub repository
   - Configure the environment variables in the Vercel project settings

2. **Configure build settings**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm ci`

3. **Deploy**
   - Vercel will automatically deploy when changes are pushed to the main branch
   - You can also trigger manual deployments from the Vercel dashboard

### Option 2: Manual Deployment

1. **Build the application**
   ```bash
   npm ci
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

3. **Configure a process manager (PM2)**
   ```bash
   npm install -g pm2
   pm2 start npm --name "greenway-website" -- start
   pm2 save
   pm2 startup
   ```

### Option 3: Docker Deployment

1. **Build the Docker image**
   ```bash
   docker build -t greenway-marijuana-website .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 --env-file .env.production greenway-marijuana-website
   ```

## CI/CD Pipeline

We use GitHub Actions for continuous integration and deployment:

1. **CI Pipeline**
   - Runs on every pull request
   - Lints code
   - Type checks with TypeScript
   - Builds the application

2. **CD Pipeline**
   - Deploys to staging automatically when changes are merged to main
   - Requires manual approval for production deployment

## Post-Deployment Verification

After deployment, verify the following:

1. **Website functionality**
   - Age verification works correctly
   - Product browsing and filtering works
   - Cart and checkout process functions properly
   - Loyalty program features are accessible

2. **Third-party integrations**
   - Leafly integration is working
   - Weedmaps integration is working
   - CultiveraPOS integration is working

3. **Performance**
   - Run Lighthouse audit to ensure good performance scores
   - Check Core Web Vitals in Google Search Console

4. **SEO**
   - Verify sitemap.xml is accessible
   - Verify robots.txt is accessible
   - Check meta tags and structured data

## Rollback Procedure

If issues are detected after deployment:

1. **Vercel Deployment**
   - Go to the Vercel dashboard
   - Select the project
   - Navigate to the "Deployments" tab
   - Find the previous working deployment
   - Click "..." and select "Promote to Production"

2. **Manual Deployment**
   - Revert to the previous version in Git
   - Rebuild and redeploy

## Monitoring

Monitor the application using:

1. **Vercel Analytics** (if using Vercel)
2. **Google Analytics**
3. **Server monitoring** (e.g., New Relic, Datadog)
4. **Error tracking** (e.g., Sentry)

## Backup Strategy

1. **Database Backups**
   - Automated daily backups
   - Weekly full backups
   - Monthly backups stored long-term

2. **Code Backups**
   - GitHub repository serves as the primary code backup
   - Consider additional backups of the repository

## Contact Information

For deployment issues, contact:

- **Technical Lead**: [Name] - [Email] - [Phone]
- **DevOps Engineer**: [Name] - [Email] - [Phone]
- **Project Manager**: [Name] - [Email] - [Phone]