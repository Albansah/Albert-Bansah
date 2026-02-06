import * as React from 'react';

interface Story {
  quote: string;
  name: string;
  title: string;
  imageUrl: string;
  projectUrl?: string;
}

const stories: Story[] = [
  {
    quote: "We hired Albert Bansah through Albansah to build a website for our non-profit, the Drconnexion Foundation. He perfectly captured our vision of empowering entrepreneurs in the Congo and delivered a beautiful, responsible website. The process was seamless and we couldn't be happier.",
    name: 'Elizabeth Katuna',
    title: 'Founder, Drconnexion Foundation',
    imageUrl: 'https://images.unsplash.com/photo-1542103749-8ef59b94f475?q=80&w=2070&auto=format&fit=crop',
    projectUrl: 'https://www.drconnexion.org/'
  },
  {
    quote: "Working with a developer from Albansah was a game-changer for our startup. We went from idea to a fully-functional MVP in just six weeks. The talent and professionalism are unmatched.",
    name: 'Jane Doe',
    title: 'CEO, Tech Innovators Inc.',
    imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1887&auto=format&fit=crop'
  },
  {
    quote: "As a freelance designer, Albansah has provided me with a steady stream of high-quality projects. I've been able to grow my business and work with amazing clients from all over the world.",
    name: 'John Smith',
    title: 'Freelance Graphic Designer',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop'
  },
  {
    quote: "The platform's project management tools made collaboration seamless. We hired an entire team of freelancers for a major campaign, and the results exceeded all our expectations.",
    name: 'Emily Johnson',
    title: 'Marketing Director, Global Brands',
    imageUrl: 'https://images.unsplash.com/photo-1488426862026-39b1ac907a93?q=80&w=1887&auto=format&fit=crop'
  }
];

const SuccessStoryCard: React.FC<Story> = ({ quote, name, title, imageUrl, projectUrl }) => (
    <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden flex flex-col md:flex-row items-center">
        <img src={imageUrl} alt={name} className="w-full md:w-1/3 h-64 md:h-full object-cover" />
        <div className="p-8 flex-1">
            <p className="text-xl italic text-slate-700">"{quote}"</p>
            <div className="mt-6">
                <p className="font-bold text-slate-900">{name}</p>
                <p className="text-blue-600 font-semibold">{title}</p>
                {projectUrl && (
                    <a 
                        href={projectUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-4 inline-block font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        View Project &rarr;
                    </a>
                )}
            </div>
        </div>
    </div>
);


const SuccessStoriesPage: React.FC = () => {
    return (
        <div className="bg-slate-50">
            {/* Hero Section */}
            <section 
                className="relative bg-blue-700 text-white py-24 sm:py-32"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1887&auto=format&fit=crop')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="absolute inset-0 bg-blue-800 opacity-70"></div>
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Success Stories</h1>
                    <p className="mt-6 text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
                        Discover how businesses and freelancers are achieving their goals on Albansah.
                    </p>
                </div>
            </section>
            
            {/* Stories Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto space-y-12">
                        {stories.map((story, index) => (
                            <SuccessStoryCard key={index} {...story} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SuccessStoriesPage;