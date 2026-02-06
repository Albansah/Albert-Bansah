import * as React from 'react';
import FlyerSlider from './FlyerSlider';

const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const Hero: React.FC = () => {
    const popularTags = ['Web Design', 'WordPress', 'Logo Design', 'AI Services'];
    const [searchTerm, setSearchTerm] = React.useState('');

    const handleSearch = () => {
        if (searchTerm.trim()) {
            window.location.hash = `#/jobs?skills=${encodeURIComponent(searchTerm)}`;
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <section className="relative bg-gradient-to-b from-blue-50 to-white pt-24 md:pt-32 pb-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        Hire Top Freelancers for Any Job, Online.
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
                        Turn your ideas into reality with the help of millions of talented professionals on Albansah.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
                        <div className="relative flex-grow w-full">
                             <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <SearchIcon className="text-slate-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Try 'building mobile app'"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full pl-11 pr-4 py-3.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                aria-label="Search for services"
                            />
                        </div>
                        <button 
                            onClick={handleSearch}
                            className="bg-blue-600 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 w-full sm:w-auto shadow-sm flex-shrink-0">
                            Search
                        </button>
                         <a 
                            href="#/post-a-job"
                            className="bg-white text-blue-600 px-8 py-3.5 rounded-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 w-full sm:w-auto shadow-sm border border-slate-300 hover:border-blue-400 flex-shrink-0">
                            Post a Job
                        </a>
                    </div>
                    <div className="mt-8 flex items-center justify-center flex-wrap gap-x-3 gap-y-2">
                        <span className="font-semibold text-slate-700">Popular:</span>
                        {popularTags.map(tag => (
                            <a key={tag} href={`#/jobs?skills=${encodeURIComponent(tag)}`} className="text-slate-600 border border-slate-300 rounded-full px-4 py-1.5 text-sm hover:bg-slate-100 hover:border-slate-400 transition-colors">
                                {tag}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Flyer Slider Section */}
            <div className="mt-24">
                <FlyerSlider />
            </div>
        </section>
    );
};

export default Hero;