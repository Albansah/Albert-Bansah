import * as React from 'react';
import { workDoneData, WorkDone } from '../data/workDone';

const WorkDoneCard: React.FC<{ item: WorkDone }> = ({ item }) => (
  <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
    <div className="overflow-hidden h-56">
      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <div>
        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          {item.category}
        </span>
        <h3 className="mt-4 text-xl font-bold text-slate-900">{item.title}</h3>
        <p className="mt-2 text-slate-600 flex-grow">{item.description}</p>
      </div>
      {item.projectUrl && item.projectUrl !== '#' && (
        <div className="mt-6">
          <a
            href={item.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-600 hover:text-blue-800 transition-colors"
          >
            View Project &rarr;
          </a>
        </div>
      )}
    </div>
  </div>
);

const WorkDoneShowcase: React.FC = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Our Portfolio Showcases
          </h2>
          <p className="text-lg text-slate-600">
            The incredible results our talented freelancers have delivered for clients around the world.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {workDoneData.map((item) => (
            <WorkDoneCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkDoneShowcase;