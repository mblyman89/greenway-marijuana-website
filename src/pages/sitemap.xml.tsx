import { GetServerSideProps } from 'next';

const Sitemap: React.FC = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Base URL of your website
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://greenwaymarijuana.com';
  
  // Define all static routes
  const staticRoutes = [
    '',
    '/products',
    '/products/flower',
    '/products/pre-rolls',
    '/products/vaporizers',
    '/products/concentrates',
    '/products/edibles',
    '/products/topicals',
    '/products/accessories',
    '/blog',
    '/loyalty',
    '/newsletter',
    '/cart',
    '/checkout',
  ];

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticRoutes
        .map((route) => {
          return `
            <url>
              <loc>${baseUrl}${route}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>${route === '' ? 'daily' : 'weekly'}</changefreq>
              <priority>${route === '' ? '1.0' : '0.8'}</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

  // Set appropriate headers
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;