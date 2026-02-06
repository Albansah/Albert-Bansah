import * as React from 'react';

const faqData = {
    'For Clients': [
        {
            question: 'How do I post a job?',
            answer: 'To post a job, simply click the "Post a Job" button in the header, fill out the required details about your project, set a budget, and submit it for freelancers to view.'
        },
        {
            question: 'How do I choose the right freelancer?',
            answer: 'Review freelancer profiles, portfolios, ratings, and reviews. You can also interview top candidates to ensure they are the perfect fit for your project.'
        },
        {
            question: 'How do payments work?',
            answer: 'Payments are held in escrow and are only released to the freelancer once you approve the work or milestones are met. This ensures a secure transaction for both parties.'
        },
    ],
    'For Freelancers': [
        {
            question: 'How do I find work?',
            answer: 'Browse the jobs list page, use filters to find projects that match your skills, and submit compelling proposals to clients.'
        },
        {
            question: 'How do I get paid?',
            answer: 'Once you connect your Stripe account, payments for completed work are transferred directly to your account after client approval.'
        },
        {
            question: 'What are the fees?',
            answer: 'Albansah charges a standard service fee on all earnings. Please refer to our pricing page for detailed information on our fee structure.'
        },
    ]
};

const AccordionItem: React.FC<{ q: string; a: string; }> = ({ q, a }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="border-b border-slate-200 py-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left text-lg font-semibold text-slate-800"
                aria-expanded={isOpen}
            >
                <span>{q}</span>
                <svg
                    className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen mt-2' : 'max-h-0'}`}
            >
                <p className="text-slate-600 pr-4">{a}</p>
            </div>
        </div>
    );
};

const HelpSupportPage: React.FC = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="bg-blue-50 py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">Help & Support Center</h1>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                        Welcome! Find answers to your questions and learn how to make the most of Albansah.
                    </p>
                </div>
            </section>
            
            {/* FAQ Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        {Object.entries(faqData).map(([category, faqs]) => (
                            <div key={category} className="mb-12">
                                <h2 className="text-3xl font-bold text-slate-900 mb-6">{category}</h2>
                                <div className="space-y-2">
                                    {faqs.map((faq) => (
                                        <AccordionItem key={faq.question} q={faq.question} a={faq.answer} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Contact CTA Section */}
            <section className="bg-slate-50 py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-slate-900">Still need help?</h2>
                    <p className="mt-4 text-lg text-slate-600 max-w-xl mx-auto">
                        Our support team is always here to assist you. Get in touch with us for personalized help.
                    </p>
                    <a 
                        href="#/contact"
                        className="mt-8 inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all text-lg shadow-md transform hover:scale-105"
                    >
                        Contact Us
                    </a>
                </div>
            </section>
        </div>
    );
};

export default HelpSupportPage;