import * as React from 'react';
import type { Category } from '../types';
import DesignIcon from './icons/DesignIcon';
import CodeIcon from './icons/CodeIcon';
import WritingIcon from './icons/WritingIcon';
import VideoIcon from './icons/VideoIcon';
import MusicIcon from './icons/MusicIcon';
import MarketingIcon from './icons/MarketingIcon';

export const categoriesData: Category[] = [
  { id: 1, name: 'Graphics & Design', Icon: DesignIcon, description: 'Logos, websites, book covers & more.' },
  { id: 2, name: 'Programming & Tech', Icon: CodeIcon, description: 'WordPress, mobile apps, website builders.' },
  { id: 3, name: 'Writing & Translation', Icon: WritingIcon, description: 'Resumes, proofreading, translations.' },
  { id: 4, name: 'Video & Animation', Icon: VideoIcon, description: 'Video editing, animated explainers.' },
  { id: 5, name: 'Music & Audio', Icon: MusicIcon, description: 'Voice over, mixing, mastering.' },
  { id: 6, name: 'Digital Marketing', Icon: MarketingIcon, description: 'Social media, SEO, content marketing.' },
];

const CategoryCard: React.FC<{ category: Category }> = ({ category }) => (
  <div className="group relative block bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-slate-100">
    <div className="flex items-center space-x-4">
      <div className="bg-blue-100 p-4 rounded-full group-hover:bg-blue-600 transition-colors duration-300">
        <category.Icon className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{category.name}</h3>
        <p className="text-sm text-slate-500">{category.description}</p>
      </div>
    </div>
    <a href={`#/jobs?category=${encodeURIComponent(category.name)}`} className="absolute inset-0 rounded-xl" aria-label={`View ${category.name}`}></a>
  </div>
);

const Categories: React.FC = () => {
  return (
    <section className="bg-slate-50 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">
          Explore the marketplace
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoriesData.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;