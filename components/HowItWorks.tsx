import * as React from 'react';
import CheckCircleIcon from './icons/CheckCircleIcon';

const HowItWorks: React.FC = () => {

    const steps = [
        {
            id: 1,
            title: "Post a Job (It’s Free)",
            description: "Tell us about your project. Albansah connects you with top talent from around the world, or near you."
        },
        {
            id: 2,
            title: "Receive Proposals",
            description: "Get qualified proposals within 24 hours. Compare bids, reviews, and prior work to hire the best fit."
        },
        {
            id: 3,
            title: "Collaborate with Ease",
            description: "Use Albansah to chat, share files, and track project milestones from your desktop or mobile."
        },
        {
            id: 4,
            title: "Simplified Payments",
            description: "Pay hourly or a fixed-price and receive invoices through Albansah. Pay only for work you authorize."
        }
    ];

    return (
        <section id="how-it-works" className="bg-white py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
                            A whole world of freelance talent at your fingertips
                        </h2>
                        <ul className="space-y-6">
                            {steps.map(step => (
                                <li key={step.id} className="flex">
                                    <div className="flex-shrink-0">
                                        <CheckCircleIcon className="h-7 w-7 text-blue-600"/>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                                        <p className="mt-1 text-slate-600">{step.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="order-1 lg:order-2 h-80 lg:h-full w-full">
                        <img 
                            src="https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop"
                            alt="A team collaborating on a project" 
                            className="w-full h-full object-cover rounded-xl shadow-lg"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;