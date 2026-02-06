import * as React from 'react';

const EyeOffIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a10.05 10.05 0 013.548-4.474m5.432-1.638A10.02 10.02 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.05 10.05 0 01-1.328 2.93m-1.212-1.212A3 3 0 1012 15a3 3 0 00.212-1.212M1 1l22 22" />
  </svg>
);

export default EyeOffIcon;