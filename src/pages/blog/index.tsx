import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { mockBlogPosts, blogCategories, getRecentBlogPosts } from '../../data/mockBlogPosts';
import { BlogPost } from '../../types/Blog';

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [popularPosts, setPopularPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Get all posts and sort by date
    const sortedPosts = [...mockBlogPosts].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
    
    // Set featured post (first featured post or first post)
    const featured = sortedPosts.find(post => post.featured) || sortedPosts[0];
    setFeaturedPost(featured);
    
    // Set remaining posts (excluding featured)
    setPosts(sortedPosts.filter(post => post.id !== featured.id));
    setFilteredPosts(sortedPosts.filter(post => post.id !== featured.id));
    
    // Set popular posts (could be based on other criteria in a real app)
    setPopularPosts(getRecentBlogPosts(3));
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      let filtered = [...posts];
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(
          post =>
            post.title.toLowerCase().includes(query) ||
            post.excerpt.toLowerCase().includes(query) ||
            post.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }
      
      // Filter by category
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(post => post.category === selectedCategory);
      }
      
      setFilteredPosts(filtered);
    }
  }, [searchQuery, selectedCategory, posts]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <Layout 
      title="Blog - Greenway Marijuana" 
      description="Explore cannabis education, product spotlights, industry news, and more on the Greenway Marijuana blog."
    >
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Cannabis Education & News</h1>
        
        {/* Featured Post */}
        {featuredPost && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="h-64 md:h-full bg-gray-200 relative">
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                    {featuredPost.coverImage ? (
                      <img 
                        src={featuredPost.coverImage} 
                        alt={featuredPost.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      "Featured Image"
                    )}
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {blogCategories.find(cat => cat.id === featuredPost.category)?.name || featuredPost.category}
                    </span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <span>{formatDate(featuredPost.publishedAt)}</span>
                  <span className="mx-2">•</span>
                  <span>{featuredPost.readTime} min read</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">{featuredPost.title}</h2>
                <p className="text-gray-700 mb-6">{featuredPost.excerpt}</p>
                <Link href={`/blog/${featuredPost.slug}`}>
                  <a className="bg-primary text-white py-2 px-4 rounded font-medium hover:bg-primary-dark transition">
                    Read More
                  </a>
                </Link>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="w-full lg:w-2/3">
            {/* Search and Filter */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-2/3">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="w-full md:w-1/3">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="all">All Categories</option>
                    {blogCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {/* Blog Posts */}
            {filteredPosts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">No articles found</h2>
                <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="bg-primary text-white py-2 px-6 rounded-lg font-medium hover:bg-primary-dark transition"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <Link href={`/blog/${post.slug}`}>
                      <a>
                        <div className="h-48 bg-gray-200 relative">
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                            {post.coverImage ? (
                              <img 
                                src={post.coverImage} 
                                alt={post.title} 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              "Article Image"
                            )}
                          </div>
                          <div className="absolute top-4 left-4">
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              {blogCategories.find(cat => cat.id === post.category)?.name || post.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center text-gray-500 text-sm mb-3">
                            <span>{formatDate(post.publishedAt)}</span>
                            <span className="mx-2">•</span>
                            <span>{post.readTime} min read</span>
                          </div>
                          <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                          <p className="text-gray-700 mb-4">{post.excerpt}</p>
                          <span className="text-primary font-medium hover:text-primary-dark transition">
                            Read More →
                          </span>
                        </div>
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
            )}
            
            {/* Pagination */}
            {filteredPosts.length > 0 && (
              <div className="flex justify-center mt-12">
                <div className="flex gap-2">
                  <a href="#" className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 transition">
                    «
                  </a>
                  <a href="#" className="w-10 h-10 bg-primary text-white rounded flex items-center justify-center">
                    1
                  </a>
                  <a href="#" className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 transition">
                    2
                  </a>
                  <a href="#" className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 transition">
                    3
                  </a>
                  <a href="#" className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 transition">
                    »
                  </a>
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="w-full lg:w-1/3">
            {/* Categories */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Categories</h3>
              <ul className="space-y-2">
                {blogCategories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex justify-between items-center w-full text-left py-1 ${
                        selectedCategory === category.id ? 'text-primary' : 'text-gray-700 hover:text-primary'
                      } transition`}
                    >
                      <span>{category.name}</span>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Popular Posts */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Popular Posts</h3>
              <div className="space-y-4">
                {popularPosts.map((post) => (
                  <Link href={`/blog/${post.slug}`} key={post.id}>
                    <a className="flex gap-4 group">
                      <div className="w-20 h-20 bg-gray-200 flex-shrink-0 rounded">
                        {post.coverImage ? (
                          <img 
                            src={post.coverImage} 
                            alt={post.title} 
                            className="w-full h-full object-cover rounded"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                            No Image
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium group-hover:text-primary transition line-clamp-2">
                          {post.title}
                        </h4>
                        <div className="text-gray-500 text-sm">{formatDate(post.publishedAt)}</div>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Tags */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(mockBlogPosts.flatMap(post => post.tags))).map((tag, index) => (
                  <a
                    key={index}
                    href="#"
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-green-100 hover:text-green-700 transition"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Subscribe to Our Newsletter</h3>
              <p className="text-gray-700 mb-4">Get the latest cannabis education and news delivered to your inbox.</p>
              <form>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary-dark transition"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-gray-500 text-xs mt-2">
                By subscribing, you confirm that you are 21 years of age or older.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;