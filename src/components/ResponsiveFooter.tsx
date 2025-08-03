import React, { useState } from 'react';
import Link from 'next/link';
import useResponsive from '../hooks/useResponsive';

interface FooterSection {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}

const footerSections: FooterSection[] = [
  {
    title: 'Shop',
    links: [
      { label: 'Flower', href: '/products/flower' },
      { label: 'Pre-Rolls', href: '/products/pre-rolls' },
      { label: 'Vaporizers', href: '/products/vaporizers' },
      { label: 'Concentrates', href: '/products/concentrates' },
      { label: 'Edibles', href: '/products/edibles' },
      { label: 'Topicals', href: '/products/topicals' },
      { label: 'Accessories', href: '/products/accessories' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Our Story', href: '/about' },
      { label: 'Location & Hours', href: '/about#location-hours' },
      { label: 'Careers', href: '/about#careers' },
      { label: 'Blog', href: '/blog' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Customer Service',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Loyalty Program', href: '/loyalty' },
      { label: 'Return Policy', href: '/return-policy' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
    ],
  },
];

const ResponsiveFooter: React.FC = () => {
  const { isMobile, isTablet } = useResponsive();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (title: string) => {
    if (expandedSection === title) {
      setExpandedSection(null);
    } else {
      setExpandedSection(title);
    }
  };

  return (
    <footer className="bg-black text-white pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              {/* Mobile Accordion */}
              {(isMobile || isTablet) && (
                <div className="border-b border-gray-800 pb-2">
                  <button
                    className="flex justify-between items-center w-full text-left"
                    onClick={() => toggleSection(section.title)}
                  >
                    <h4 className="text-primary text-lg font-medium">{section.title}</h4>
                    <span className="text-gray-400">
                      {expandedSection === section.title ? '−' : '+'}
                    </span>
                  </button>
                  
                  {expandedSection === section.title && (
                    <ul className="space-y-2 mt-4 pl-2">
                      {section.links.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href}>
                            <a className="text-gray-300 hover:text-primary transition">
                              {link.label}
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              
              {/* Desktop Links */}
              {!isMobile && !isTablet && (
                <>
                  <h4 className="text-primary text-lg font-medium mb-4">{section.title}</h4>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href}>
                          <a className="text-gray-300 hover:text-primary transition">
                            {link.label}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
          
          {/* Connect With Us Section */}
          <div>
            <h4 className="text-primary text-lg font-medium mb-4">Connect With Us</h4>
            <p className="text-gray-300 mb-4">
              Follow us on social media for the latest updates and promotions.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition"
                aria-label="Facebook"
              >
                FB
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition"
                aria-label="Instagram"
              >
                IG
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition"
                aria-label="Twitter"
              >
                TW
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright and Legal */}
        <div className="text-center text-gray-400 text-sm pt-6 border-t border-gray-800">
          <p>&copy; {new Date().getFullYear()} Greenway Marijuana. All rights reserved.</p>
          <div className="mt-4 p-4 bg-gray-800 rounded-lg text-sm">
            <p>
              You must be 21 years of age or older to view this website and purchase products.
              Cannabis products may be purchased only by adults 21 years of age or older.
              Keep out of reach of children. It is illegal to drive while under the influence of cannabis.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ResponsiveFooter;