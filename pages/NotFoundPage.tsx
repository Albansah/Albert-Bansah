import * as React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center bg-gray-50 py-20 px-4 sm:px-6 lg:px-8 min-h-[60vh]">
        <h1 className="text-6xl font-extrabold text-sky-600">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">
            Page Not Found
        </h2>
        <p className="mt-4 text-lg text-gray-600">
            Sorry, we couldn’t find the page you’re looking for.
        </p>
        <a
            href="#/"
            className="mt-8 inline-block bg-sky-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-sky-700 transition-colors"
        >
            Go back home
        </a>
    </div>
  );
};

export default NotFoundPage;