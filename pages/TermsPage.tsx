import * as React from 'react';

const Section: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
            {children}
        </div>
    </div>
);

const TermsPage: React.FC = () => {
    return (
        <div className="bg-white py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Terms of Service</h1>
                    <p className="mt-4 text-lg text-gray-600">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </header>

                <main>
                    <Section title="1. Acceptance of Terms">
                        <p>
                            By accessing or using the Albansah platform ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, then you may not access the Service. These Terms apply to all visitors, users, and others who access or use the Service.
                        </p>
                    </Section>
                    
                    <Section title="2. Description of Service">
                        <p>
                            Albansah is an online marketplace that connects clients ("Clients") with freelance professionals ("Freelancers"). We provide tools for collaboration, communication, and payment processing to facilitate projects between Clients and Freelancers.
                        </p>
                    </Section>

                    <Section title="3. User Accounts">
                        <p>
                            When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                        </p>
                        <p>
                            You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party.
                        </p>
                    </Section>
                    
                    <Section title="4. Payments and Fees">
                        <p>
                            Clients pay Albansah for projects in advance. Albansah holds these funds in escrow and releases them to the Freelancer upon successful completion and approval of the work.
                        </p>
                        <p>
                            Albansah charges a service fee to both Clients and Freelancers on each transaction. These fees are subject to change and will be clearly communicated.
                        </p>
                    </Section>

                    <Section title="5. Intellectual Property">
                        <p>
                            The Service and its original content, features, and functionality are and will remain the exclusive property of Albansah Global Inc. and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
                        </p>
                        <p>
                            Upon full payment, the Client shall own the work product delivered by the Freelancer, unless otherwise agreed upon in writing.
                        </p>
                    </Section>
                    
                    <Section title="6. Termination">
                        <p>
                            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                        </p>
                    </Section>
                    
                     <Section title="7. Limitation of Liability">
                        <p>
                            In no event shall Albansah, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                        </p>
                    </Section>
                    
                    <Section title="8. Changes to Terms">
                        <p>
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                        </p>
                    </Section>

                    <Section title="9. Contact Us">
                        <p>
                            If you have any questions about these Terms, please contact us at <a href="#/contact" className="text-sky-600 hover:underline">our contact page</a>.
                        </p>
                    </Section>
                </main>
            </div>
        </div>
    );
};

export default TermsPage;
