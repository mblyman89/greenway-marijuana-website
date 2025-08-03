import React, { useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

interface NewsletterIssue {
  id: string;
  title: string;
  date: string;
  thumbnail: string;
  url: string;
}

const mockNewsletterIssues: NewsletterIssue[] = [
  {
    id: 'summer-2025',
    title: 'Summer Specials & New Products',
    date: 'July 15, 2025',
    thumbnail: '/images/newsletter/summer-2025.jpg',
    url: '#'
  },
  {
    id: 'wellness-guide',
    title: 'Cannabis & Wellness Guide',
    date: 'July 1, 2025',
    thumbnail: '/images/newsletter/wellness-guide.jpg',
    url: '#'
  },
  {
    id: 'fathers-day',
    title: 'Father\'s Day Special Edition',
    date: 'June 15, 2025',
    thumbnail: '/images/newsletter/fathers-day.jpg',
    url: '#'
  },
  {
    id: 'summer-kickoff',
    title: 'Summer Kickoff & New Strains',
    date: 'June 1, 2025',
    thumbnail: '/images/newsletter/summer-kickoff.jpg',
    url: '#'
  },
  {
    id: 'concentrates-special',
    title: 'Concentrates Special Edition',
    date: 'May 15, 2025',
    thumbnail: '/images/newsletter/concentrates-special.jpg',
    url: '#'
  },
  {
    id: 'spring-products',
    title: 'Spring Products & Deals',
    date: 'May 1, 2025',
    thumbnail: '/images/newsletter/spring-products.jpg',
    url: '#'
  },
  {
    id: '420-celebration',
    title: '420 Celebration Guide',
    date: 'April 15, 2025',
    thumbnail: '/images/newsletter/420-celebration.jpg',
    url: '#'
  },
  {
    id: 'april-deals',
    title: 'April Deals & New Arrivals',
    date: 'April 1, 2025',
    thumbnail: '/images/newsletter/april-deals.jpg',
    url: '#'
  },
  {
    id: 'spring-strains',
    title: 'Spring Strains & Product Guide',
    date: 'March 15, 2025',
    thumbnail: '/images/newsletter/spring-strains.jpg',
    url: '#'
  }
];

const NewsletterPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
  const [agreePromotions, setAgreePromotions] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [issuesPerPage] = useState<number>(6);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email) {
      setError('Email address is required');
      return;
    }
    
    if (!agreeTerms) {
      setError('You must confirm you are 21 years of age or older');
      return;
    }
    
    // In a real app, this would submit to an API
    console.log('Newsletter signup:', { email, firstName, agreePromotions });
    
    // Show success message
    setSubmitted(true);
    setError(null);
    
    // Reset form
    setEmail('');
    setFirstName('');
    setAgreeTerms(false);
    setAgreePromotions(false);
  };

  // Pagination logic
  const indexOfLastIssue = currentPage * issuesPerPage;
  const indexOfFirstIssue = indexOfLastIssue - issuesPerPage;
  const currentIssues = mockNewsletterIssues.slice(indexOfFirstIssue, indexOfLastIssue);
  const totalPages = Math.ceil(mockNewsletterIssues.length / issuesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Layout 
      title="Newsletter - Greenway Marijuana" 
      description="Subscribe to our newsletter for the latest cannabis news, product updates, and exclusive deals."
    >
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Newsletter</h1>
        
        {/* Newsletter Signup Section */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-gray-700">
                Stay updated with our latest products, promotions, and cannabis education. 
                Our newsletter is sent twice a month and includes exclusive deals for subscribers.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2">
                {submitted ? (
                  <div className="bg-green-100 text-green-800 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-2">Thank You for Subscribing!</h3>
                    <p>
                      You've been added to our newsletter list. Check your email for a confirmation 
                      and welcome message with special offers for new subscribers.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg">
                    {error && (
                      <div className="bg-red-100 text-red-800 p-3 rounded mb-4">
                        {error}
                      </div>
                    )}
                    
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                        Email Address*
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
                        First Name (Optional)
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={agreeTerms}
                          onChange={(e) => setAgreeTerms(e.target.checked)}
                          className="w-4 h-4 accent-primary mr-2"
                          required
                        />
                        <span className="text-sm text-gray-700">
                          I confirm I am 21 years of age or older*
                        </span>
                      </label>
                    </div>
                    
                    <div className="mb-6">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={agreePromotions}
                          onChange={(e) => setAgreePromotions(e.target.checked)}
                          className="w-4 h-4 accent-primary mr-2"
                        />
                        <span className="text-sm text-gray-700">
                          I would like to receive promotional emails about products and special offers
                        </span>
                      </label>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-primary text-white py-3 rounded font-medium hover:bg-primary-dark transition"
                    >
                      Subscribe Now
                    </button>
                    
                    <p className="text-xs text-gray-500 mt-4">
                      By subscribing, you agree to our Privacy Policy and Terms of Service. 
                      You can unsubscribe at any time.
                    </p>
                  </form>
                )}
              </div>
              
              <div className="w-full md:w-1/2">
                <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center p-4">
                    <h3 className="text-xl font-bold mb-2">What to Expect</h3>
                    <ul className="text-left space-y-2">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Exclusive deals and promotions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>New product announcements</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Educational content about cannabis</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Strain spotlights and reviews</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Industry news and updates</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter Archive */}
        <section>
          <h2 className="text-2xl font-bold mb-8">Newsletter Archive</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentIssues.map((issue) => (
              <div 
                key={issue.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-48 bg-gray-200">
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                    Newsletter Thumbnail
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-gray-500 text-sm mb-2">{issue.date}</div>
                  <h3 className="text-xl font-bold mb-3">{issue.title}</h3>
                  <Link href={issue.url}>
                    <a className="block w-full bg-gray-200 text-gray-800 text-center py-2 rounded font-medium hover:bg-gray-300 transition">
                      Read Newsletter
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="flex gap-2">
                <button
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`w-10 h-10 flex items-center justify-center rounded ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'border border-gray-300 hover:bg-gray-100 transition'
                  }`}
                >
                  «
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`w-10 h-10 flex items-center justify-center rounded ${
                      currentPage === index + 1
                        ? 'bg-primary text-white'
                        : 'border border-gray-300 hover:bg-gray-100 transition'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`w-10 h-10 flex items-center justify-center rounded ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'border border-gray-300 hover:bg-gray-100 transition'
                  }`}
                >
                  »
                </button>
              </div>
            </div>
          )}
        </section>
        
        {/* FAQ Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-3">How often will I receive the newsletter?</h3>
              <p className="text-gray-700">
                Our newsletter is sent twice a month, typically on the 1st and 15th. 
                You'll receive updates on new products, promotions, and educational content.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-3">Can I unsubscribe at any time?</h3>
              <p className="text-gray-700">
                Yes, every newsletter includes an unsubscribe link at the bottom. 
                You can opt out at any time with a single click.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-3">Will you share my email address with third parties?</h3>
              <p className="text-gray-700">
                No, we value your privacy. Your email address and personal information will never be shared 
                with third parties. Please see our Privacy Policy for more details.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-3">Are there exclusive deals for newsletter subscribers?</h3>
              <p className="text-gray-700">
                Yes! Our newsletter subscribers get access to exclusive deals and promotions that aren't 
                available elsewhere. It's one of the best ways to save on your favorite products.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default NewsletterPage;