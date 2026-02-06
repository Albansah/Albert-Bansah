import * as React from 'react';
import type { Freelancer } from '../types';
import StarIcon from './icons/StarIcon';
import { freelancersData } from '../data/freelancers';

const FreelancerCard: React.FC<{ freelancer: Freelancer }> = ({ freelancer }) => {
  const handleHireMe = () => {
    const message = `Hello, I'm interested in hiring ${freelancer.name} for a project.`;
    const whatsappUrl = `https://wa.me/16509121900?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex items-center space-x-4">
          <img className="w-16 h-16 rounded-full object-cover" src={freelancer.avatarUrl} alt={freelancer.name} />
          <div>
            <h3 className="text-lg font-semibold text-slate-900 leading-tight">{freelancer.name}</h3>
            <p className="text-slate-600 text-sm">{freelancer.skill}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
          <div className="flex items-center gap-1">
            <StarIcon className="w-5 h-5 text-yellow-400" />
            <span className="text-slate-800 font-bold">{freelancer.rating.toFixed(1)}</span>
            <span>({freelancer.reviews})</span>
          </div>
          <div>
            <span className="font-semibold text-slate-800">${freelancer.price}</span>
            <span className="text-slate-500">/hr</span>
          </div>
        </div>
      </div>
      <div className="bg-slate-50 px-6 py-4 flex items-center justify-between border-t">
        <a href={`#/freelancer/${freelancer.id}`} className="font-semibold text-blue-600 hover:text-blue-700 text-sm transition-colors">
          View Profile
        </a>
        <button 
          onClick={handleHireMe}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all text-sm transform hover:scale-105"
        >
          Hire Me
        </button>
      </div>
    </div>
  );
};

const FreelancerShowcase: React.FC = () => {
  return (
    <section className="bg-slate-50 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">
          Find the talent you need
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {freelancersData.slice(0, 4).map((freelancer) => (
            <FreelancerCard key={freelancer.id} freelancer={freelancer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FreelancerShowcase;