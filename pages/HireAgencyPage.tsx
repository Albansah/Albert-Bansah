import * as React from 'react';
import UsersIcon from '../components/icons/UsersIcon';
import BriefcaseIcon from '../components/icons/BriefcaseIcon';
import BarChartIcon from '../components/icons/BarChartIcon';
import LightbulbIcon from '../components/icons/LightbulbIcon';

interface Agency {
    name: string;
    logoUrl: string;
    tagline: string;
    specializations: string[];
    description: string;
    projects: {
        title: string;
        imageUrl: string;
        description: string;
    }[];
}

const agencies: Agency[] = [
    {
        name: 'Innovate Solutions',
        logoUrl: 'https://cdn.iconscout.com/icon/free/png-256/free-letter-i-1793475-1522854.png',
        tagline: 'End-to-end web & mobile development.',
        specializations: ['React Native', 'Node.js', 'UI/UX', 'Cloud Architecture'],
        description: 'Innovate Solutions is a premier software development agency specializing in creating bespoke, high-performance web and mobile applications. Our team of expert engineers and designers work collaboratively to turn your vision into a reality, focusing on scalable architecture and user-centric design to deliver products that excel in the market.',
        projects: [
            { title: 'E-commerce Platform Overhaul', imageUrl: 'https://images.unsplash.com/photo-1556742044-538a7c4a1a1b?q=80&w=2070&auto=format&fit=crop', description: 'Rebuilt a major retail client\'s e-commerce site, improving performance by 200%.' },
            { title: 'Healthcare Mobile App', imageUrl: 'https://images.unsplash.com/photo-1620912189874-3d08fddd13b7?q=80&w=1964&auto=format&fit=crop', description: 'Developed a HIPAA-compliant app for patient-doctor communication.' },
        ]
    },
    {
        name: 'Pixel Perfect Creative',
        logoUrl: 'https://cdn.iconscout.com/icon/free/png-256/free-letter-p-1793481-1522860.png',
        tagline: 'Branding and design that tells a story.',
        specializations: ['Logo Design', 'Brand Strategy', 'Animation', 'Figma'],
        description: 'At Pixel Perfect Creative, we believe that great design is about more than just aesthetics; it\'s about creating a connection. We partner with brands to develop memorable identities, engaging animations, and intuitive digital experiences that captivate audiences and drive results.',
        projects: [
            { title: 'Startup Rebranding Initiative', imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2070&auto=format&fit=crop', description: 'Crafted a new brand identity for a fast-growing tech startup, including logo, and style guides.' },
            { title: 'Animated Explainer Video Series', imageUrl: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?q=80&w=2070&auto=format&fit=crop', description: 'Produced a series of animated videos to simplify a complex software product for new users.' },
        ]
    },
    {
        name: 'Growth Hackers Marketing',
        logoUrl: 'https://cdn.iconscout.com/icon/free/png-256/free-letter-g-1793473-1522852.png',
        tagline: 'Data-driven marketing for scalable growth.',
        specializations: ['SEO', 'PPC', 'Content Marketing', 'Social Media'],
        description: 'Growth Hackers is a digital marketing agency obsessed with results. We combine creative content strategies with rigorous data analysis to deliver measurable growth for our clients. From search engine optimization to paid advertising campaigns, we build and execute strategies that convert.',
        projects: [
            { title: 'SEO Strategy for SaaS Company', imageUrl: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2070&auto=format&fit=crop', description: 'Increased organic traffic by 150% in 6 months through targeted content and technical SEO.' },
            { title: 'Global Social Media Campaign', imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop', description: 'Managed a multi-platform social media campaign that reached over 10 million users.' },
        ]
    }
];

const handleContactAgency = (agencyName: string) => {
    const message = `Hello, I'm interested in working with the agency: ${agencyName}.`;
    const whatsappUrl = `https://wa.me/16509121900?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
};


const AgencyCard: React.FC<{ agency: Agency, onSelect: (agency: Agency) => void }> = ({ agency, onSelect }) => (
    <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6 flex flex-col text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <img src={agency.logoUrl} alt={`${agency.name} logo`} className="w-16 h-16 mx-auto" />
        <h3 className="mt-4 text-xl font-bold text-slate-900">{agency.name}</h3>
        <p className="mt-1 text-slate-600 flex-grow">{agency.tagline}</p>
        <div className="mt-4 pt-4 border-t border-slate-100">
            <h4 className="font-semibold text-sm text-slate-800 mb-2">Specializes in:</h4>
            <div className="flex flex-wrap gap-2 justify-center">
                {agency.specializations.map(skill => (
                    <span key={skill} className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full text-xs font-medium">
                        {skill}
                    </span>
                ))}
            </div>
        </div>
        <div className="mt-6">
            <button
                onClick={() => onSelect(agency)}
                className="w-full bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105"
            >
                View Details
            </button>
        </div>
    </div>
);

const AgencyDetailPage: React.FC<{ agency: Agency; onBack: () => void; }> = ({ agency, onBack }) => {
    return (
        <div className="bg-slate-50 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <button
                    onClick={onBack}
                    className="mb-8 font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to All Agencies
                </button>

                <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                        <img src={agency.logoUrl} alt={`${agency.name} logo`} className="w-24 h-24 flex-shrink-0" />
                        <div className="flex-grow">
                            <h1 className="text-3xl font-extrabold text-slate-900">{agency.name}</h1>
                            <p className="mt-2 text-lg text-slate-600">{agency.tagline}</p>
                             <div className="mt-4 flex flex-wrap gap-2">
                                {agency.specializations.map(skill => (
                                    <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <button
                            onClick={() => handleContactAgency(agency.name)}
                            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 flex-shrink-0"
                        >
                            Contact Agency
                        </button>
                    </div>
                    <div className="border-t my-8"></div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">About {agency.name}</h2>
                        <p className="text-slate-700 leading-relaxed">{agency.description}</p>
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Featured Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {agency.projects.map(project => (
                            <div key={project.title} className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                                <img src={project.imageUrl} alt={project.title} className="w-full h-56 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-slate-900">{project.title}</h3>
                                    <p className="mt-2 text-slate-600">{project.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


const BenefitCard: React.FC<{ icon: React.FC<any>, title: string, children: React.ReactNode }> = ({ icon: Icon, title, children }) => (
    <div className="flex">
        <div className="flex-shrink-0">
            <div className="bg-blue-100 p-3 rounded-full">
                <Icon className="h-7 w-7 text-blue-600" />
            </div>
        </div>
        <div className="ml-4">
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <p className="mt-1 text-slate-600">{children}</p>
        </div>
    </div>
);


const AgencyListPage: React.FC<{ onSelectAgency: (agency: Agency) => void }> = ({ onSelectAgency }) => {
    const benefits = [
        { icon: UsersIcon, title: "Access to Vetted Teams", description: "Work with coordinated teams of experts, from developers to marketers, all under one roof." },
        { icon: BriefcaseIcon, title: "Streamlined Project Management", description: "Agencies provide a single point of contact, simplifying communication and project oversight." },
        { icon: BarChartIcon, title: "Scalable for Large Projects", description: "Tackle ambitious projects with the full force of a dedicated agency team." },
        { icon: LightbulbIcon, title: "Strategic Expertise", description: "Leverage the strategic insights and industry experience that agencies bring to the table." }
    ];

    const handleGetExpertMatches = () => {
        const message = `Hello, I need expert help finding the right agency for my project.`;
        const whatsappUrl = `https://wa.me/16509121900?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };
    
    return (
         <div className="bg-white">
            {/* Hero Section */}
            <section className="bg-slate-50 py-20 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
                        Hire a Top Agency for Your Business Needs
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
                        Scale your team and accelerate your projects by partnering with our curated selection of expert agencies on Albansah.
                    </p>
                    <div className="mt-10">
                        <button 
                            onClick={handleGetExpertMatches}
                            className="inline-block bg-blue-600 text-white px-10 py-4 rounded-lg font-bold hover:bg-blue-700 transition-all text-lg shadow-md transform hover:scale-105"
                        >
                            Get Expert Agency Matches
                        </button>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                           <h2 className="text-3xl md:text-4xl font-bold text-slate-900">The Power of a Team</h2>
                           <p className="mt-4 text-lg text-slate-600">
                               Hiring an agency on Albansah gives you access to a cohesive team of specialists who can handle every aspect of your project, from strategy to execution.
                           </p>
                           <div className="mt-8 space-y-8">
                               {/* FIX: Pass description as children to BenefitCard to match prop types */}
                               {benefits.map(benefit => <BenefitCard key={benefit.title} icon={benefit.icon} title={benefit.title}>{benefit.description}</BenefitCard>)}
                           </div>
                        </div>
                        <div>
                            <img 
                                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2232&auto-format&fit=crop" 
                                alt="A team of professionals collaborating in a modern office"
                                className="rounded-xl shadow-lg w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Agencies Section */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Featured Agencies</h2>
                        <p className="mt-4 text-lg text-slate-600">Explore some of the top-rated agencies available on our platform.</p>
                    </div>
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {agencies.map(agency => (
                            <AgencyCard key={agency.name} agency={agency} onSelect={onSelectAgency} />
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

const HireAgencyPage: React.FC = () => {
    const [selectedAgency, setSelectedAgency] = React.useState<Agency | null>(null);

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [selectedAgency]);

    if (selectedAgency) {
        return <AgencyDetailPage agency={selectedAgency} onBack={() => setSelectedAgency(null)} />;
    }

    return <AgencyListPage onSelectAgency={setSelectedAgency} />;
};


export default HireAgencyPage;