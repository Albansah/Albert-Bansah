import * as React from 'react';
import TrustedBy from '../components/TrustedBy';
import ShieldCheckIcon from '../components/icons/ShieldCheckIcon';
import UsersIcon from '../components/icons/UsersIcon';
import BriefcaseIcon from '../components/icons/BriefcaseIcon';
import DocumentReportIcon from '../components/icons/DocumentReportIcon';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';

const FeatureCard: React.FC<{ icon: React.FC<any>, title: string, children: React.ReactNode }> = ({ icon: Icon, title, children }) => (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-slate-100">
        <div className="bg-blue-100 p-4 rounded-full">
            <Icon className="h-8 w-8 text-blue-600" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 text-slate-600">{children}</p>
    </div>
);

const EnterprisePage: React.FC = () => {
    
    const handleContactSales = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const message = `Hello, I'm interested in learning more about Albansah's Enterprise solutions.`;
        const whatsappUrl = `https://wa.me/16509121900?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const enterpriseFeatures = [
        {
            icon: UsersIcon,
            title: 'Top-Tier Vetted Talent',
            description: 'Gain exclusive access to the top 1% of freelance talent, pre-vetted for quality and expertise.'
        },
        {
            icon: BriefcaseIcon,
            title: 'Dedicated Account Management',
            description: 'A dedicated manager to assist with talent sourcing, project management, and ensuring success.'
        },
        {
            icon: ShieldCheckIcon,
            title: 'Enhanced Security & Compliance',
            description: 'Enterprise-grade security protocols, NDAs, and data protection to meet your compliance needs.'
        },
        {
            icon: DocumentReportIcon,
            title: 'Simplified Billing & Reporting',
            description: 'Consolidated invoicing, custom reporting dashboards, and flexible payment options.'
        }
    ];
    
    const comparisonFeatures = [
        { name: 'Access to Global Talent', standard: true, enterprise: true },
        { name: 'Secure Payments', standard: true, enterprise: true },
        { name: '24/7 Support', standard: true, enterprise: true },
        { name: 'Project Tracking Tools', standard: true, enterprise: true },
        { name: 'Vetted Enterprise Talent', standard: false, enterprise: true },
        { name: 'Dedicated Account Manager', standard: false, enterprise: true },
        { name: 'Custom Contracts & NDAs', standard: false, enterprise: true },
        { name: 'Consolidated Invoicing', standard: false, enterprise: true },
        { name: 'Advanced Reporting', standard: false, enterprise: true },
    ];


    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative bg-blue-800 text-white">
                 <div 
                    className="absolute inset-0 bg-cover bg-center opacity-10"
                    style={{backgroundImage: "url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2232&auto-format&fit=crop')"}}
                ></div>
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                        The Scalable Workforce Solution for Modern Business
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
                        Albansah Enterprise provides the tools, talent, and support you need to build a flexible, on-demand team that drives your business forward.
                    </p>
                    <div className="mt-10">
                        <a 
                            href="#"
                            onClick={handleContactSales}
                            className="inline-block bg-white text-blue-700 px-10 py-4 rounded-lg font-bold hover:bg-blue-50 transition-all text-lg shadow-lg transform hover:scale-105"
                        >
                            Contact Sales
                        </a>
                    </div>
                </div>
            </section>
            
            <TrustedBy />

            {/* Features Section */}
            <section className="bg-slate-50 py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                            Designed for the Demands of Enterprise
                        </h2>
                        <p className="mt-4 text-lg text-slate-600">
                            We provide a comprehensive suite of tools and services to help you hire faster, manage projects efficiently, and scale your workforce with confidence.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                       {enterpriseFeatures.map(feature => (
                           <FeatureCard key={feature.title} icon={feature.icon} title={feature.title}>
                               {feature.description}
                           </FeatureCard>
                       ))}
                    </div>
                </div>
            </section>

            {/* Comparison Table Section */}
            <section className="py-20 bg-white">
                 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                            Compare Plans
                        </h2>
                        <p className="mt-4 text-lg text-slate-600">
                            Find the right solution for your business, from individual projects to your entire workforce.
                        </p>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        {/* Mobile View: Cards */}
                        <div className="md:hidden space-y-8">
                            <div className="bg-white shadow-xl border rounded-2xl overflow-hidden">
                                <div className="p-5 text-center bg-slate-50">
                                    <h3 className="font-semibold text-2xl">Marketplace</h3>
                                </div>
                                <ul className="divide-y divide-slate-200 p-6">
                                    {comparisonFeatures.map(feature => (
                                        <li key={feature.name + '-market'} className="py-3 flex items-center">
                                            {feature.standard 
                                                ? <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                                                : <div className="w-6 h-6 mr-3 flex-shrink-0" />
                                            }
                                            <span className="text-slate-700">{feature.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                             <div className="bg-white shadow-xl border rounded-2xl overflow-hidden">
                                <div className="p-5 text-center bg-blue-600 text-white">
                                    <h3 className="font-semibold text-2xl">Enterprise</h3>
                                </div>
                                <ul className="divide-y divide-slate-200 p-6">
                                    {comparisonFeatures.map(feature => (
                                        <li key={feature.name + '-ent'} className="py-3 flex items-center">
                                            {feature.enterprise 
                                                ? <CheckCircleIcon className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0" />
                                                : <div className="w-6 h-6 mr-3 flex-shrink-0" />
                                            }
                                            <span className="text-slate-700">{feature.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Desktop View: Table */}
                        <div className="hidden md:block bg-white shadow-xl border rounded-2xl overflow-hidden">
                            <div className="grid grid-cols-3 font-semibold text-lg">
                                <div className="p-5 text-left">Feature</div>
                                <div className="p-5 text-center bg-slate-50">Marketplace</div>
                                <div className="p-5 text-center text-white bg-blue-600">Enterprise</div>
                            </div>
                            {comparisonFeatures.map((feature, index) => (
                               <div key={feature.name} className={`grid grid-cols-3 items-center ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                                   <div className="p-4 font-medium text-slate-800">{feature.name}</div>
                                   <div className={`p-4 flex justify-center ${index % 2 === 0 ? 'bg-slate-50' : 'bg-slate-100'}`}>
                                       {feature.standard && <CheckCircleIcon className="w-6 h-6 text-green-500" />}
                                   </div>
                                   <div className="p-4 flex justify-center">
                                       {feature.enterprise && <CheckCircleIcon className="w-6 h-6 text-blue-500" />}
                                   </div>
                               </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            

            {/* Final CTA Section */}
            <section className="bg-slate-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Ready to Scale Your Team?
                    </h2>
                    <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                        Talk to one of our consultants to see how Albansah Enterprise can help you achieve your business goals.
                    </p>
                    <a 
                        href="#"
                        onClick={handleContactSales}
                        className="inline-block bg-blue-600 text-white px-10 py-4 rounded-lg font-bold hover:bg-blue-700 transition-all text-lg shadow-lg transform hover:scale-105"
                    >
                        Contact Sales
                    </a>
                </div>
            </section>
        </div>
    );
};

export default EnterprisePage;