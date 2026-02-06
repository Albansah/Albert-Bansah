import * as React from 'react';

interface JobFiltersProps {
  filters: {
    category: string;
    minBudget: string;
    maxBudget: string;
    skills: string;
  };
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onReset: () => void;
  categories: string[];
}

const JobFilters: React.FC<JobFiltersProps> = ({ filters, onFilterChange, onReset, categories }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={filters.category}
            onChange={onFilterChange}
            className="mt-1 block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Budget Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Budget Range
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              name="minBudget"
              value={filters.minBudget}
              onChange={onFilterChange}
              placeholder="Min $"
              aria-label="Minimum Budget"
              className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              min="0"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              name="maxBudget"
              value={filters.maxBudget}
              onChange={onFilterChange}
              placeholder="Max $"
              aria-label="Maximum Budget"
              className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              min="0"
            />
          </div>
        </div>

        {/* Skills Filter */}
        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
            Skills
          </label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={filters.skills}
            onChange={onFilterChange}
            placeholder="e.g., React, Node.js"
            className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
          />
          <p className="mt-1 text-xs text-gray-500">Comma-separated skills.</p>
        </div>
        
        {/* Reset Button */}
        <button
          onClick={onReset}
          className="bg-gray-200 text-gray-800 px-4 py-2.5 rounded-lg font-semibold hover:bg-gray-300 transition-colors h-fit mt-1"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default JobFilters;