import * as React from 'react';

const PostJobCTA: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-blue-700 to-blue-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to turn your ideas into reality?
        </h2>
        <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
          Post a job today and get proposals from talented freelancers around the world. It's free and easy to get started.
        </p>
        <a 
          href="#/post-a-job"
          className="inline-block bg-white text-blue-700 px-10 py-4 rounded-lg font-bold hover:bg-blue-50 transition-all text-lg shadow-lg transform hover:scale-105"
          aria-label="Post a Job"
        >
          Post a Job
        </a>
      </div>
    </section>
  );
};

export default PostJobCTA;