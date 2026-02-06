import * as React from 'react';

const LeafIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M11 20.5a9.5 9.5 0 01-8.5-9.5c0-2.618 1.5-5.237 3.5-7.5C8.763 1 12 .5 12 .5s3.237.5 6 3c2 2.263 2.5 4.882 2.5 7.5a9.5 9.5 0 01-9.5 9.5z" />
    <path d="M12 2v20" />
  </svg>
);
export default LeafIcon;