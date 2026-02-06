import * as React from 'react';
import HowItWorks from '../components/HowItWorks';
import TrustedBy from '../components/TrustedBy';
import PostJobCTA from '../components/PostJobCTA';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';
import ShieldCheckIcon from '../components/icons/ShieldCheckIcon';
import StarIcon from '../components/icons/StarIcon';
import BriefcaseIcon from '../components/icons/BriefcaseIcon';

const Benefit: React.FC<{ icon: React.FC<any>, title: string, children: React.ReactNode }> = ({ icon: Icon, title, children }) => (
    <div className="flex">
        <div className="flex-shrink-0">
            <div className="bg-sky-100 p-3 rounded-full">
                <Icon className="h-7 w-7 text-sky-600" />
            </div>
        </div>
        <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="mt-1 text-gray-600">{children}</p>
        </div>
    </div>
);


const WhyAlbansahPage: React.FC = () => {
    
    const benefits = [
        {
            icon: StarIcon,
            title: "Proof of Quality",
            description: "Access a global network of vetted freelancers with detailed profiles, work history, and verified client reviews."
        },
        {
            icon: ShieldCheckIcon,
            title: "Safe and Secure",
            description: "Our escrow system ensures you only pay for work you approve. Your funds are protected every step of the way."
        },
        {
            icon: BriefcaseIcon,
            title: "Tools for Success",
            description: "Chat, share files, and track milestones with our built-in collaboration tools designed for remote work."
        },
        {
            icon: CheckCircleIcon,
            title: "No-Cost to Start",
            description: "Post a job for free, browse proposals, and interview candidates. You only pay for the work you authorize."
        }
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="bg-sky-50 py-20 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                        The Smartest Way to Get Work Done
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover why millions of businesses and freelancers choose Albansah to connect, collaborate, and succeed on projects of every size and scope.
                    </p>
                </div>
            </section>
            
            <TrustedBy />

            {/* Benefits Section */}
             <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                           <h2 className="text-3xl md:text-4xl font-bold text-gray-900">A better way to work together</h2>
                           <p className="mt-4 text-lg text-gray-600">
                               We've built a platform that provides the trust, tools, and talent to help you build your business.
                           </p>
                           <div className="mt-8 space-y-8">
                               {/* FIX: Pass description as children to Benefit to match prop types */}
                               {benefits.map(benefit => <Benefit key={benefit.title} icon={benefit.icon} title={benefit.title}>{benefit.description}</Benefit>)}
                           </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <img 
                                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop" 
                                alt="A diverse team collaborating in a modern workspace"
                                className="rounded-xl shadow-lg w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </section>
            
            <HowItWorks />

            <PostJobCTA />
        </div>
    );
};

export default WhyAlbansahPage;