import * as React from 'react';

const FacebookIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22 12c0-5.523-4.477-10-10-10s-10 4.477-10 10c0 5.035 3.734 9.199 8.547 9.874v-7.014h-2.547v-2.86h2.547v-2.179c0-2.521 1.493-3.913 3.8-3.913.915 0 1.914.164 1.914.164v2.44h-1.258c-1.259 0-1.666.79-1.666 1.59v1.898h2.82l-.454 2.86h-2.366v7.014c4.813-.675 8.547-4.839 8.547-9.874z" />
  </svg>
);

export default FacebookIcon;