import { GetServerSideProps } from 'next';

const Robots: React.FC = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Base URL of your website
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://greenwaymarijuana.com';
  
  // Generate robots.txt content
  const robotsTxt = `# www.robotstxt.org/

User-agent: *
Allow: /

# Disallow age verification and checkout pages
Disallow: /age-restriction
Disallow: /checkout
Disallow: /order-confirmation

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml
`;

  // Set appropriate headers
  res.setHeader('Content-Type', 'text/plain');
  res.write(robotsTxt);
  res.end();

  return {
    props: {},
  };
};

export default Robots;