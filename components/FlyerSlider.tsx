import * as React from 'react';
import { flyersData } from '../data/flyers';

const FlyerSlider: React.FC = () => {
  return (
    <div
      className="group w-full inline-flex flex-nowrap overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
      }}
    >
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 animate-flyer-scroll group-hover:[animation-play-state:paused]">
        {flyersData.map((flyer) => (
          <li key={flyer.id}>
            <img
              className="h-56 w-auto object-cover rounded-lg shadow-md"
              src={flyer.imageUrl}
              alt={flyer.alt}
            />
          </li>
        ))}
      </ul>
       <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 animate-flyer-scroll group-hover:[animation-play-state:paused]" aria-hidden="true">
        {flyersData.map((flyer) => (
          <li key={flyer.id}>
            <img
              className="h-56 w-auto object-cover rounded-lg shadow-md"
              src={flyer.imageUrl}
              alt={flyer.alt}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlyerSlider;
