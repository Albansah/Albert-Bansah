import * as React from 'react';

const Section: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">{title}</h2>
        <div className="space-y-4 text-slate-600 leading-relaxed">
            {children}
        </div>
    </div>
);

const RefundPolicyPage: React.FC = () => {
    return (
        <div className="bg-white py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">Refund Policy</h1>
                    <p className="mt-4 text-lg text-slate-600">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </header>

                <main>
                    <Section title="1. Overview">
                        <p>
                            Our Refund Policy is designed to ensure a fair and transparent process for both clients and freelancers. We utilize an escrow system to protect payments until work is approved. This policy outlines the conditions under which refunds may be issued.
                        </p>
                    </Section>
                    
                    <Section title="2. Client Refunds">
                        <p>
                           Clients may be eligible for a full or partial refund under the following circumstances:
                        </p>
                        <ul className="list-disc list-inside space-y-2">
                            <li><strong>Non-delivery of work:</strong> If a freelancer fails to deliver the agreed-upon work within the specified timeframe and does not respond to communications for an extended period.</li>
                            <li><strong>Work not as described:</strong> If the delivered work significantly deviates from the project requirements and scope agreed upon at the start.</li>
                            <li><strong>Mutual agreement:</strong> If both the client and the freelancer agree to cancel the project and issue a refund.</li>
                        </ul>
                        <p className="mt-4">
                            To request a refund, clients must open a dispute through our Resolution Center. Our support team will review the case and mediate a solution.
                        </p>
                    </Section>

                    <Section title="3. Ineligibility for Refunds">
                        <p>
                            Refunds will generally not be issued in the following situations:
                        </p>
                         <ul className="list-disc list-inside space-y-2">
                            <li>Once funds have been released from escrow to the freelancer, the transaction is considered final.</li>
                            <li>If the client has approved the work or milestones.</li>
                            <li>For changes in project scope or requirements that were not agreed upon by both parties.</li>
                        </ul>
                    </Section>
                    
                    <Section title="4. Freelancer Service Fees">
                        <p>
                            Service fees charged by Albansah are non-refundable, except in cases where a project is canceled before any work has begun.
                        </p>
                    </Section>

                    <Section title="5. Dispute Resolution">
                        <p>
                           If a client and freelancer cannot agree on a resolution, the dispute can be escalated to Albansah's mediation team. Our team will review all evidence, including communication history and work delivered, to make a fair and impartial decision. This decision is binding.
                        </p>
                    </Section>
                    
                    <Section title="6. Contact Us">
                        <p>
                            For any questions regarding our Refund Policy, please visit our <a href="#/help" className="text-blue-600 hover:underline">Help & Support page</a> or <a href="#/contact" className="text-blue-600 hover:underline">contact us</a> directly.
                        </p>
                    </Section>
                </main>
            </div>
        </div>
    );
};

export default RefundPolicyPage;
