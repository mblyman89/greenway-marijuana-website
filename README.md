# Greenway Marijuana Website

This repository contains the development files for the Greenway Marijuana retail cannabis store website based in Port Orchard, Washington.

## Project Overview

The Greenway Marijuana website is a modern e-commerce platform designed to showcase cannabis products, enable online ordering for in-store pickup, and provide a loyalty program for customers. The website integrates with Leafly, Weedmaps, and CultiveraPOS for inventory management and order processing.

## Key Features

- Age verification gateway (21+)
- Product catalog with detailed product information and filtering
- Shopping cart and checkout functionality
- Loyalty program with tiered membership, points tracking, and rewards
- Integration with Leafly, Weedmaps, and CultiveraPOS
- Blog and content sections
- Mobile-responsive design
- SEO optimized with structured data
- Performance optimized with lazy loading and image optimization

## Technology Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: PostgreSQL with Prisma ORM
- **Deployment**: Vercel, Docker, Nginx
- **CI/CD**: GitHub Actions
- **Third-party Integrations**: Leafly API, Weedmaps API, CultiveraPOS

## Project Structure

```
/
├── .github/             # GitHub Actions workflows
├── nginx/               # Nginx configuration
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   ├── context/         # React context providers
│   ├── data/            # Mock data and data utilities
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Library code and API clients
│   ├── pages/           # Next.js pages
│   ├── styles/          # Global styles
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
├── .env.example         # Example environment variables
├── .env.production      # Production environment variables
├── Dockerfile           # Docker configuration
├── docker-compose.yml   # Docker Compose configuration
├── next.config.js       # Next.js configuration
└── tailwind.config.js   # Tailwind CSS configuration
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- PostgreSQL database (optional for local development)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-organization/greenway-marijuana-website.git
   cd greenway-marijuana-website
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Copy the example environment file and update with your values:
   ```bash
   cp .env.example .env.local
   ```

4. Set up the database:
   ```bash
   npm run db:setup
   # or
   yarn db:setup
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Using Docker

1. Build and start the containers:
   ```bash
   docker-compose up -d
   ```

2. Open [http://localhost:80](http://localhost:80) in your browser.

## Development Workflow

### Branch Strategy

- `main`: Production-ready code
- `develop`: Development branch for integration
- `feature/*`: Feature branches for new functionality
- `bugfix/*`: Bug fix branches

### Commit Guidelines

Please follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding or updating tests
- `chore:` for maintenance tasks

### Pull Request Process

1. Create a feature or bugfix branch from `develop`
2. Make your changes and commit following the commit guidelines
3. Push your branch and create a pull request to `develop`
4. Ensure all tests pass and code meets quality standards
5. Request review from at least one team member
6. Once approved, merge your pull request

## API Integration

### Leafly API

The website integrates with Leafly's Menu API for product information and catalog synchronization. Configuration is done through environment variables:

```
LEAFLY_API_KEY=your-leafly-api-key
LEAFLY_API_SECRET=your-leafly-api-secret
```

### Weedmaps API

The website uses Weedmaps' Orders API for online ordering functionality. Configuration is done through environment variables:

```
WEEDMAPS_API_KEY=your-weedmaps-api-key
WEEDMAPS_API_SECRET=your-weedmaps-api-secret
WEEDMAPS_WEBHOOK_SECRET=your-weedmaps-webhook-secret
```

### CultiveraPOS Integration

The website connects to CultiveraPOS for inventory management and order processing. Configuration is done through environment variables:

```
CULTIVERA_POS_API_KEY=your-cultivera-pos-api-key
CULTIVERA_POS_API_URL=https://api.cultivera.com/v1
```

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

### Production Deployment

1. Merge changes to the `main` branch
2. GitHub Actions will automatically build and test the changes
3. After manual approval, changes are deployed to production
4. Verify the deployment at [https://www.greenwaymarijuana.com](https://www.greenwaymarijuana.com)

### Staging Deployment

1. Merge changes to the `develop` branch
2. GitHub Actions automatically deploys the changes to staging
3. Verify the deployment at [https://staging.greenwaymarijuana.com](https://staging.greenwaymarijuana.com)

## Testing

### Running Tests

```bash
npm run test
# or
yarn test
```

### Testing Strategy

- Unit tests for components and utility functions
- Integration tests for API endpoints
- End-to-end tests for critical user flows (age verification, product browsing, checkout)

## Performance Optimization

The website includes several performance optimizations:

- Lazy loading of images and components
- Code splitting for reduced bundle size
- Image optimization with responsive sizes
- Caching strategies for static assets
- Server-side rendering for improved SEO and initial load time

## SEO Features

The website includes comprehensive SEO features:

- Meta tags for all pages
- Structured data using schema.org markup
- Canonical URLs to prevent duplicate content
- Sitemap.xml for search engine indexing
- Robots.txt for crawler directives
- Optimized page titles and descriptions

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

## Contact

For questions or support, please contact:
- Project Manager: [Name] - [email@example.com]
- Lead Developer: [Name] - [email@example.com]