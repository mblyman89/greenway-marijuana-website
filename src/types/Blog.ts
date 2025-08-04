export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: string;
  authorImage?: string;
  publishedAt: string;
  readTime: number;
  featured?: boolean;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export type BlogCategoryType = 
  | 'cannabis-education'
  | 'product-spotlights'
  | 'industry-news'
  | 'health-wellness'
  | 'recipes';
