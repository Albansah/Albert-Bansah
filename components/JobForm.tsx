import * as React from 'react';
import { categoriesData } from './Categories';
import { supabase } from '../lib/supabaseClient';
import type { Job } from '../types';
import Spinner from './Spinner';

interface JobFormProps {
  onSuccess: (job: Job) => void;
  initialData?: Partial<Job>;
  isEditing?: boolean;
}

const JobForm: React.FC<JobFormProps> = ({ onSuccess, initialData, isEditing = false }) => {
  // Form state
  const [title, setTitle] = React.useState(initialData?.title || '');
  const [description, setDescription] = React.useState(initialData?.description || '');
  const [category, setCategory] = React.useState(initialData?.category || categoriesData[0]?.name || '');
  const [budget, setBudget] = React.useState<number | ''>(initialData?.budget || '');
  const [duration, setDuration] = React.useState(initialData?.duration || '');
  const [skills, setSkills] = React.useState<string[]>(initialData?.skills || []);
  const [currentSkill, setCurrentSkill] = React.useState('');
  
  const [error, setError] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleAddSkill = () => {
    const trimmedSkill = currentSkill.trim();
    if (trimmedSkill && !skills.includes(trimmedSkill) && skills.length < 10) {
      setSkills([...skills, trimmedSkill]);
      setCurrentSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title || !description || !category || budget === '' || !duration || skills.length === 0) {
      setError('Please fill out all fields, including at least one skill.');
      return;
    }
    
    setIsSubmitting(true);
    
    const jobPayload = {
        title,
        description,
        category,
        budget: Number(budget),
        duration,
        skills,
    };

    try {
        let result;
        if (isEditing && initialData?.id) {
            result = await supabase
                .from('jobs')
                .update(jobPayload)
                .eq('id', initialData.id)
                .select()
                .single();
        } else {
            result = await supabase
                .from('jobs')
                .insert([jobPayload])
                .select()
                .single();
        }

        if (result.error) throw result.error;
        
        if (result.data) {
            onSuccess(result.data as Job);
        } else {
            throw new Error("Failed to retrieve job details.");
        }
    } catch (err: any) {
      console.error("Failed to process job:", err);
      setError("An error occurred: " + err.message);
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="job-title" className="block text-sm font-medium text-slate-700 mb-1">
          Job Title
        </label>
        <input
          type="text"
          id="job-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
          placeholder="e.g., Build a responsive WordPress theme"
          required
        />
      </div>

      <div>
        <label htmlFor="job-description" className="block text-sm font-medium text-slate-700 mb-1">
          Description
        </label>
        <textarea
          id="job-description"
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
          placeholder="Describe your project in detail. What are the key deliverables?"
          required
        />
      </div>

      <div>
        <label htmlFor="skills" className="block text-sm font-medium text-slate-700 mb-1">
          Required Skills
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            id="skills"
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSkill(); } }}
            className="flex-grow mt-1 block w-full px-4 py-3 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
            placeholder="e.g., React, Node.js then press Enter"
          />
          <button 
            type="button" 
            onClick={handleAddSkill} 
            className="bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-1 active:scale-95"
          >
            Add
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2 min-h-[40px]">
          {skills.length > 0 ? (
            skills.map(skill => (
              <span key={skill} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium transition-all animate-in fade-in zoom-in duration-200">
                {skill}
                <button 
                  type="button" 
                  onClick={() => handleRemoveSkill(skill)} 
                  className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none" 
                  aria-label={`Remove ${skill}`}
                >
                  &times;
                </button>
              </span>
            ))
          ) : (
            <p className="text-sm text-slate-400 italic">No skills added yet.</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="job-category" className="block text-sm font-medium text-slate-700 mb-1">
          Category
        </label>
        <select
          id="job-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md transition-all"
          required
        >
          {categoriesData.map(cat => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="job-budget" className="block text-sm font-medium text-slate-700 mb-1">
            Budget ($)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              $
            </div>
            <input
              type="number"
              id="job-budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value === '' ? '' : Number(e.target.value))}
              min="0"
              className="mt-1 block w-full pl-8 pr-4 py-3 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
              placeholder="e.g., 500"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="job-duration" className="block text-sm font-medium text-slate-700 mb-1">
            Project Duration
          </label>
          <input
            type="text"
            id="job-duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
            placeholder="e.g., 1-2 weeks"
            required
          />
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm text-center border border-red-100 animate-in slide-in-from-top-2">
          {error}
        </div>
      )}
      
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-md text-base font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform active:scale-[0.98] disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <Spinner size="sm" />
              <span>{isEditing ? 'Saving Changes...' : 'Posting Job...'}</span>
            </div>
          ) : (
            <span>{isEditing ? 'Save Changes' : 'Post Job Now'}</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default JobForm;