import * as React from 'react';
import ShieldCheckIcon from '../components/icons/ShieldCheckIcon';
import FileTextIcon from '../components/icons/FileTextIcon';
import TrendingUpIcon from '../components/icons/TrendingUpIcon';
import UserPlusIcon from '../components/icons/UserPlusIcon';
import DollarSignIcon from '../components/icons/DollarSignIcon';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';

const BenefitCard: React.FC<{ icon: React.FC<any>, title: string, children: React.ReactNode }> = ({ icon: Icon, title, children }) => (
    <div className="p-6 border border-slate-100 rounded-xl hover:shadow-lg transition-shadow bg-white">
        <Icon className="h-8 w-8 text-blue-600" />
        <h3 className="text-xl font-semibold text-slate-900 mt-4">{title}</h3>
        <p className="mt-2 text-slate-600">{children}</p>
    </div>
);

const Step: React.FC<{ icon: React.FC<any>, title: string, children: React.ReactNode, stepNumber: number }> = ({ icon: Icon, title, children, stepNumber }) => (
    <div className="flex">
        <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
                {stepNumber}
            </div>
        </div>
        <div className="ml-6">
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <p className="mt-1 text-slate-600">{children}</p>
        </div>
    </div>
);

const DirectContractsPage: React.FC = () => {
    
    const handleCreateContract = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const message = `Hello, I'm a freelancer interested in creating a Direct Contract on Albansah.`;
        const whatsappUrl = `https://wa.me/16509121900?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const benefits = [
        {
            icon: ShieldCheckIcon,
            title: 'Payment Protection',
            description: 'Secure your earnings with our trusted escrow service. Funds are held until milestones are approved.'
        },
        {
            icon: FileTextIcon,
            title: 'Simple Invoicing',
            description: 'Automate your billing with professional invoices, saving you time on administrative tasks.'
        },
        {
            icon: TrendingUpIcon,
            title: 'Build Your Reputation',
            description: 'Work from Direct Contracts contributes to your on-platform stats, enhancing your profile.'
        }
    ];

    const steps = [
        { icon: FileTextIcon, title: "Create a Contract", description: "Define the project scope, terms, and payment schedule in a few simple steps." },
        { icon: UserPlusIcon, title: "Invite Your Client", description: "Send a secure link to your client to review and accept the contract terms." },
        { icon: DollarSignIcon, title: "Client Deposits Funds", description: "Your client funds the project in escrow, giving you the confidence to start work." },
        { icon: CheckCircleIcon, title: "Get Paid Securely", description: "Receive your payment automatically and on time once work is approved." }
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="bg-blue-50 py-20 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
                        Work Directly with Your Clients, Securely
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
                        Bring your existing client relationships to Albansah. Direct Contracts offers payment protection, simple invoicing, and helps you build your on-platform reputation.
                    </p>
                    <div className="mt-10">
                        <a 
                            href="#"
                            onClick={handleCreateContract}
                            className="inline-block bg-blue-600 text-white px-10 py-4 rounded-lg font-bold hover:bg-blue-700 transition-all text-lg shadow-md transform hover:scale-105"
                        >
                            Create a Contract
                        </a>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Why Use Direct Contracts?</h2>
                        <p className="mt-4 text-lg text-slate-600">Enjoy the best of both worlds: the freedom of direct relationships and the security of the Albansah platform.</p>
                    </div>
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {benefits.map(benefit => (
                            <BenefitCard key={benefit.title} icon={benefit.icon} title={benefit.title}>
                                {benefit.description}
                            </BenefitCard>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* How It Works Section */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                           <img 
                                src="https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=2070&auto=format&fit=crop" 
                                alt="Freelancer and client shaking hands over a contract"
                                className="rounded-xl shadow-lg w-full h-auto"
                            />
                        </div>
                        <div className="space-y-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Simple Steps to Get Started</h2>
                            {steps.map((step, index) => (
                                <Step key={step.title} icon={step.icon} title={step.title} stepNumber={index + 1}>
                                    {step.description}
                                </Step>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

             {/* Final CTA Section */}
            <section className="bg-blue-600">
                 <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to Simplify Your Client Work?
                    </h2>
                    <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                       Create your first Direct Contract today and experience a better way to work with your clients.
                    </p>
                    <a 
                        href="#"
                        onClick={handleCreateContract}
                        className="inline-block bg-white text-blue-700 px-10 py-4 rounded-lg font-bold hover:bg-blue-50 transition-all text-lg shadow-lg transform hover:scale-105"
                    >
                        Create Your First Contract
                    </a>
                </div>
            </section>
        </div>
    );
};

export default DirectContractsPage;