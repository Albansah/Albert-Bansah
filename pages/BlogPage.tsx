import * as React from 'react';

const blogPosts = [
  {
    id: 1,
    category: 'Productivity',
    title: '5 Ways to Boost Your Productivity as a Freelancer',
    excerpt: 'Discover proven strategies to stay focused, manage your time effectively, and deliver high-quality work to your clients.',
    imageUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop',
    author: 'Jane Doe',
    date: 'October 26, 2023'
  },
  {
    id: 2,
    category: 'Hiring',
    title: 'How to Write a Job Post That Attracts Top Talent',
    excerpt: 'Learn the secrets to crafting a clear, compelling job description that stands out and attracts the best freelancers for your project.',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop',
    author: 'John Smith',
    date: 'October 22, 2023'
  },
  {
    id: 3,
    category: 'Technology',
    title: 'The Future of AI in the Freelance Economy',
    excerpt: 'Explore how artificial intelligence is transforming the way we work and what it means for the future of freelancing.',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-27032244c438?q=80&w=1974&auto=format&fit=crop',
    author: 'Emily White',
    date: 'October 18, 2023'
  },
];

const BlogPostCard: React.FC<typeof blogPosts[0]> = ({ category, title, excerpt, imageUrl, author, date }) => (
    <a href="#" className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        <div className="overflow-hidden">
            <img src={imageUrl} alt={title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="p-6">
            <p className="text-sm font-semibold text-blue-600">{category}</p>
            <h3 className="mt-2 text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{title}</h3>
            <p className="mt-3 text-slate-600 line-clamp-3">{excerpt}</p>
            <div className="mt-4 pt-4 border-t border-slate-100 text-sm text-slate-500">
                <span>By {author} &middot; {date}</span>
            </div>
        </div>
    </a>
);

const BlogPage: React.FC = () => {
    const featuredPost = blogPosts[0];
    const recentPosts = blogPosts.slice(1);

    return (
        <div className="bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">From the Blog</h1>
                    <p className="mt-4 text-lg text-slate-600">
                        Insights, tips, and stories for the future of work.
                    </p>
                </div>

                {/* Featured Post */}
                <div className="mb-16">
                    <a href="#" className="group grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="overflow-hidden rounded-lg">
                             <img src={featuredPost.imageUrl} alt={featuredPost.title} className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div>
                             <p className="text-md font-semibold text-blue-600">{featuredPost.category}</p>
                            <h2 className="mt-2 text-3xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{featuredPost.title}</h2>
                            <p className="mt-4 text-slate-600 text-lg">{featuredPost.excerpt}</p>
                            <div className="mt-6 text-sm text-slate-500">
                                <span>By {featuredPost.author} &middot; {featuredPost.date}</span>
                            </div>
                        </div>
                    </a>
                </div>

                {/* Recent Posts */}
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Recent Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {recentPosts.map(post => (
                        <BlogPostCard key={post.id} {...post} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;