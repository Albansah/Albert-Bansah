import * as React from 'react';

const TrustedBy: React.FC = () => {
  const logos = [
    { name: 'Client Logo 1', url: 'https://assets.zyrosite.com/YZ9E4PjRPRipZNO5/untitled-design-41-mv0PwJ80jPU061qz.png' },
    { name: 'Client Logo 2', url: 'https://assets.zyrosite.com/YZ9E4PjRPRipZNO5/logo-drc-f-pTPRrUTx5ThqIbxc.png' },
    { name: 'Client Logo 3', url: 'https://assets.zyrosite.com/YZ9E4PjRPRipZNO5/channels4_profile-5-KDPzeuTRb9lOGkqv.jpg' },
    { name: 'Client Logo 4', url: 'https://assets.zyrosite.com/YZ9E4PjRPRipZNO5/whatsapp-image-2025-10-14-at-8.40.02-pm-2-C4eUnCJDtKTvHGFs.jpeg' },
    { name: 'Client Logo 5', url: 'https://assets.zyrosite.com/YZ9E4PjRPRipZNO5/chatgpt-image-oct-19-2025-04_41_11-am-aPXXB3iRWrxwzMHd.png' },
    { name: 'Client Logo 6', url: 'https://assets.zyrosite.com/YZ9E4PjRPRipZNO5/untitled-design-39-RIuE2lFgXcacC2d6.png' },
    { name: 'Client Logo 7', url: 'https://assets.zyrosite.com/YZ9E4PjRPRipZNO5/whatsapp-image-2025-10-11-at-9.29.00-pm-t8wTUkGqdsi6lLTN.jpeg' },
    { name: 'Client Logo 8', url: 'https://assets.zyrosite.com/dWxbok0JZnFlo1q3/abelieve-logo-56-Yg2yWaGZqlfWJozj.png' },
    { name: 'Client Logo 9', url: 'https://assets.zyrosite.com/Y4LDM1z2v9F5q3eW/untitled-design-34-YrDJZ6vXbXte8qx2.png' },
  ];

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold text-slate-600">
          Trusted by the world's leading brands
        </h2>
        <div
          className="mt-10 group w-full inline-flex flex-nowrap overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          }}
        >
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll group-hover:[animation-play-state:paused]">
            {logos.map((logo, index) => (
              <li key={index}>
                <img
                  className="h-14 sm:h-20 object-contain transition-all duration-300"
                  src={logo.url}
                  alt={`${logo.name} logo`}
                />
              </li>
            ))}
          </ul>
           <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll group-hover:[animation-play-state:paused]" aria-hidden="true">
            {logos.map((logo, index) => (
              <li key={index}>
                <img
                  className="h-14 sm:h-20 object-contain transition-all duration-300"
                  src={logo.url}
                  alt={`${logo.name} logo`}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;