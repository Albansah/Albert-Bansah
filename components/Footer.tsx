import * as React from 'react';

const Footer: React.FC = () => {
  const footerLinks = {
    'For Clients': [
      { text: 'How to Hire', href: '#/#how-it-works' },
      { text: 'Talent Marketplace', href: '#/' },
      { text: 'Project Catalog', href: '#/jobs' },
      { text: 'Hire an Agency', href: '#/hire-agency' },
      { text: 'Pricing', href: '#/pricing' },
    ],
    'For Talent': [
      { text: 'How to Find Work', href: '#/jobs' },
      { text: 'Direct Contracts', href: '#/direct-contracts' },
      { text: 'Find Freelance Jobs', href: '#/jobs' }
    ],
    'Resources': [
      { text: 'Help & Support', href: '#/help' },
      { text: 'Success Stories', href: '#/success-stories' },
      { text: 'Albansah Reviews', href: '#/reviews' },
      { text: 'Blog', href: '#/blog' }
    ],
    'Company': [
      { text: 'About Us', href: '#/about' },
      { text: 'Leadership', href: '#/leadership' },
      { text: 'Careers', href: '#/careers' },
      { text: 'Contact Us', href: '#/contact' }
    ],
    'Legal': [
        { text: 'Terms & Policies', href: '#/terms' },
        { text: 'Privacy Policy', href: '#/privacy' },
        { text: 'Refund Policy', href: '#/refund' },
    ]
  };

  const socialIcons = [
    { name: 'Facebook', path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
    { name: 'Twitter', path: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
    { name: 'LinkedIn', path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z' },
    { name: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.148-3.225 1.664-4.771 4.919 4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z' },
  ];

  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase">{title}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.text}>
                    <a href={link.href} className="text-base text-slate-500 hover:text-blue-600 transition-colors">{link.text}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col-reverse sm:flex-row justify-between items-center gap-6">
           <div className="text-center sm:text-left">
              <p className="text-base text-slate-500">&copy; {new Date().getFullYear()} Albansah Global Inc. All rights reserved.</p>
              <a href="https://climate.stripe.com/9116Az" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm text-slate-500 hover:text-blue-600 transition-colors">
                ALBANSAH PLATFORM, we contribute 0.5% of our revenue to carbon removal.
              </a>
           </div>
          <div className="flex space-x-6">
            {socialIcons.map((icon) => (
              <a key={icon.name} href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                <span className="sr-only">{icon.name}</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d={icon.name === 'LinkedIn' ? `${icon.path} M7 9h4v12H7z M4.5 5.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z` : icon.path} clipRule="evenodd" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;