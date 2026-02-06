import * as React from 'react';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';

const PricingPage: React.FC = () => {
  const features = [
    'Access to a global talent pool',
    'Secure and simple payments',
    '24/7 customer support',
    'Built-in collaboration tools',
    'Verified freelancers and reviews',
    'Project tracking and milestones'
  ];

  return (
    <section id="pricing" className="bg-slate-50 py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Find the Perfect Plan for Your Needs
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Simple, transparent pricing. No hidden fees. Choose the plan that's right for you and get started today.
          </p>
        </div>
        
        <div className="mt-16 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center">
              <CheckCircleIcon className="h-6 w-6 text-blue-600 flex-shrink-0" />
              <span className="ml-3 text-slate-700 font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPage;