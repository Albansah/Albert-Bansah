import * as React from 'react';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';

const jobOpenings = [
    {
        title: 'Senior Frontend Engineer',
        location: 'Remote',
        department: 'Engineering',
        description: 'Join our team to build and scale the user interface of the Albansah platform. Expertise in React, TypeScript, and modern web technologies is a must.'
    },
    {
        title: 'Product Manager, Growth',
        location: 'Remote',
        department: 'Product',
        description: 'Lead the strategy and execution for user acquisition and retention. You will work cross-functionally to drive growth initiatives.'
    },
    {
        title: 'Content Marketing Manager',
        location: 'New York, NY or Remote',
        department: 'Marketing',
        description: 'Create compelling content that tells the Albansah story, attracts new users, and engages our community across multiple channels.'
    },
    {
        title: 'Data Scientist',
        location: 'Remote',
        department: 'Data',
        description: 'Analyze data to uncover insights that will shape our product roadmap and business strategy. Experience with machine learning is a plus.'
    }
];

const handleApplyNow = (jobTitle: string) => {
    const message = `Hello, I'm interested in applying for the ${jobTitle} position at Albansah.`;
    const whatsappUrl = `https://wa.me/16509121900?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
};

const CareersPage: React.FC = () => {
    
    const perks = [
        'Competitive salary and equity',
        'Flexible remote work policy',
        'Comprehensive health benefits',
        'Generous paid time off',
        'Professional development budget',
        'A collaborative and mission-driven culture'
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section 
                className="relative bg-blue-700 text-white py-24 sm:py-32"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="absolute inset-0 bg-blue-800 opacity-80"></div>
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Shape the Future of Work</h1>
                    <p className="mt-6 text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
                        Join our passionate team and help us build a world where anyone can build their business, brand, or dream from anywhere.
                    </p>
                </div>
            </section>

            {/* Culture & Perks Section */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Work With Us</h2>
                            <p className="mt-4 text-lg text-slate-600">
                               At Albansah, we're a team of innovators, thinkers, and doers. We believe in the power of our platform to change lives, and we're looking for talented individuals who share our vision.
                            </p>
                            <ul className="mt-8 space-y-4">
                                {perks.map(perk => (
                                    <li key={perk} className="flex items-center">
                                        <CheckCircleIcon className="h-6 w-6 text-blue-600 mr-3" />
                                        <span className="text-slate-700 font-medium">{perk}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <img 
                                src="https://images.unsplash.com/photo-1556761175-b413da4b248a?q=80&w=1974&auto=format&fit=crop" 
                                alt="Happy team members in an office"
                                className="rounded-xl shadow-lg w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Open Positions Section */}
            <section id="open-positions" className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">
                        Open Positions
                    </h2>
                    <div className="max-w-4xl mx-auto space-y-6">
                        {jobOpenings.map(job => (
                            <div key={job.title} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300">
                                <div className="flex flex-col sm:flex-row justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold text-blue-700">{job.title}</h3>
                                        <p className="text-slate-600 mt-1">{job.department} &middot; {job.location}</p>
                                    </div>
                                    <button 
                                        onClick={() => handleApplyNow(job.title)}
                                        className="mt-4 sm:mt-0 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 text-sm"
                                    >
                                        Apply Now
                                    </button>
                                </div>
                                <p className="mt-4 text-slate-700">{job.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CareersPage;