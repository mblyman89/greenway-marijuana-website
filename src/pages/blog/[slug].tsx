import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { getBlogPostBySlug, getRecentBlogPosts, blogCategories } from '../../data/mockBlogPosts';
import { BlogPost } from '../../types/Blog';
import ReactMarkdown from 'react-markdown';

const BlogPostPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (slug) {
      const blogPost = getBlogPostBySlug(slug as string);
      
      if (blogPost) {
        setPost(blogPost);
        // Get related posts (same category, excluding current post)
        const related = getRecentBlogPosts(3).filter(p => p.id !== blogPost.id);
        setRelatedPosts(related);
      }
      
      setLoading(false);
    }
  }, [slug]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
            <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
            <Link href="/blog">
              <a className="bg-primary text-white py-3 px-8 rounded-lg font-medium hover:bg-primary-dark transition">
                Back to Blog
              </a>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      title={`${post.title} - Greenway Marijuana Blog`}
      description={post.excerpt}
    >
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <nav className="flex text-sm">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/">
                  <a className="text-gray-500 hover:text-primary">Home</a>
                </Link>
              </li>
              <li>
                <span className="text-gray-500 mx-2">/</span>
              </li>
              <li>
                <Link href="/blog">
                  <a className="text-gray-500 hover:text-primary">Blog</a>
                </Link>
              </li>
              <li>
                <span className="text-gray-500 mx-2">/</span>
              </li>
              <li className="text-gray-900 font-medium">{post.title}</li>
            </ol>
          </nav>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="w-full lg:w-2/3">
            <article className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Featured Image */}
              <div className="h-64 md:h-96 bg-gray-200">
                {post.coverImage ? (
                  <img 
                    src={post.coverImage} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Featured Image
                  </div>
                )}
              </div>
              
              {/* Article Header */}
              <div className="p-8">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {blogCategories.find(cat => cat.id === post.category)?.name || post.category}
                  </span>
                  
                  <span className="text-gray-500 text-sm">
                    {formatDate(post.publishedAt)}
                  </span>
                  
                  <span className="text-gray-500 text-sm">
                    • {post.readTime} min read
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>
                
                <div className="flex items-center mb-8">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3">
                    {post.authorImage ? (
                      <img 
                        src={post.authorImage} 
                        alt={post.author} 
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs rounded-full">
                        AU
                      </div>
                    )}
                  </div>
                  <span className="font-medium">{post.author}</span>
                </div>
                
                {/* Article Content */}
                <div className="prose max-w-none">
                  <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
                
                {/* Tags */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
            
            {/* Share Buttons */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-8">
              <h3 className="font-bold mb-4">Share This Article</h3>
              <div className="flex gap-4">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    `https://greenwaymarijuana.com/blog/${post.slug}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition"
                >
                  F
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    `https://greenwaymarijuana.com/blog/${post.slug}`
                  )}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition"
                >
                  T
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                    `https://greenwaymarijuana.com/blog/${post.slug}`
                  )}&title=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-800 text-white rounded-full flex items-center justify-center hover:bg-blue-900 transition"
                >
                  L
                </a>
                <a
                  href={`mailto:?subject=${encodeURIComponent(
                    post.title
                  )}&body=${encodeURIComponent(
                    `Check out this article: https://greenwaymarijuana.com/blog/${post.slug}`
                  )}`}
                  className="w-10 h-10 bg-gray-500 text-white rounded-full flex items-center justify-center hover:bg-gray-600 transition"
                >
                  E
                </a>
              </div>
            </div>
            
            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link href={`/blog/${relatedPost.slug}`} key={relatedPost.id}>
                      <a className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                        <div className="h-40 bg-gray-200">
                          {relatedPost.coverImage ? (
                            <img 
                              src={relatedPost.coverImage} 
                              alt={relatedPost.title} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              No Image
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold mb-2 line-clamp-2">{relatedPost.title}</h3>
                          <div className="text-gray-500 text-sm">
                            {formatDate(relatedPost.publishedAt)}
                          </div>
                        </div>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="w-full lg:w-1/3">
            {/* Author Bio */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">About the Author</h3>
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full mr-4">
                  {post.authorImage ? (
                    <img 
                      src={post.authorImage} 
                      alt={post.author} 
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm rounded-full">
                      AU
                    </div>
                  )}
                </div>
                <h4 className="text-lg font-bold">{post.author}</h4>
              </div>
              <p className="text-gray-700">
                Cannabis enthusiast and industry expert with years of experience in the Washington cannabis market.
              </p>
            </div>
            
            {/* Categories */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Categories</h3>
              <ul className="space-y-2">
                {blogCategories.map((category) => (
                  <li key={category.id}>
                    <Link href={`/blog?category=${category.id}`}>
                      <a className="flex justify-between items-center text-gray-700 hover:text-primary transition">
                        <span>{category.name}</span>
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                          {category.count}
                        </span>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
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

export default BlogPostPage;