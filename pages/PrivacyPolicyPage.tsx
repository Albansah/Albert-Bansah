import * as React from 'react';

const Section: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">{title}</h2>
        <div className="space-y-4 text-slate-600 leading-relaxed">
            {children}
        </div>
    </div>
);

const PrivacyPolicyPage: React.FC = () => {
    return (
        <div className="bg-white py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">Privacy Policy</h1>
                    <p className="mt-4 text-lg text-slate-600">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </header>

                <main>
                    <Section title="1. Introduction">
                        <p>
                            Albansah Global Inc. ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services (collectively, the "Service").
                        </p>
                    </Section>
                    
                    <Section title="2. Information We Collect">
                        <p>
                           We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, register on the site, place an order, and in connection with other activities, services, features or resources we make available on our Service. Users may be asked for, as appropriate, name, email address, mailing address, phone number.
                        </p>
                    </Section>

                    <Section title="3. How We Use Your Information">
                        <p>
                            We use the information we collect in various ways, including to:
                        </p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Provide, operate, and maintain our Service</li>
                            <li>Improve, personalize, and expand our Service</li>
                            <li>Understand and analyze how you use our Service</li>
                            <li>Develop new products, services, features, and functionality</li>
                            <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the Service, and for marketing and promotional purposes</li>
                            <li>Process your transactions and manage your orders.</li>
                            <li>Find and prevent fraud</li>
                        </ul>
                    </Section>
                    
                    <Section title="4. Sharing Your Information">
                        <p>
                            We do not sell, trade, or rent Users' personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates and advertisers for the purposes outlined above.
                        </p>
                    </Section>

                    <Section title="5. Data Security">
                        <p>
                            We adopt appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information, username, password, transaction information and data stored on our Service.
                        </p>
                    </Section>
                    
                    <Section title="6. Your Data Protection Rights">
                        <p>
                            Depending on your location, you may have the following rights regarding your personal data: The right to access, update or delete the information we have on you. The right of rectification. The right to object. The right of restriction. The right to data portability. The right to withdraw consent.
                        </p>
                    </Section>
                    
                    <Section title="7. Changes to This Privacy Policy">
                        <p>
                           We have the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the top of this page. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect.
                        </p>
                    </Section>

                    <Section title="8. Contact Us">
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at <a href="#/contact" className="text-blue-600 hover:underline">our contact page</a>.
                        </p>
                    </Section>
                </main>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;