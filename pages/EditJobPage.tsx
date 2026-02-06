import * as React from 'react';
import { categoriesData } from '../components/Categories';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';

interface EditJobPageProps {
  jobId: string;
}

const EditJobPage: React.FC<EditJobPageProps> = ({ jobId }) => {
  const { user } = useAuth();

  // Form state
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [budget, setBudget] = React.useState<number | ''>('');
  const [duration, setDuration] = React.useState('');
  const [skills, setSkills] = React.useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = React.useState('');
  
  // Control state
  const [initialLoading, setInitialLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  React.useEffect(() => {
    const fetchJob = async () => {
      if (!jobId || !user) {
        setError("Job not found or you are not logged in.");
        setInitialLoading(false);
        return;
      }
      
      try {
        setInitialLoading(true);
        const { data, error: fetchError } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', jobId)
          .eq('clientId', user.id) // Security check: Ensure the user owns this job
          .single();

        if (fetchError || !data) {
          throw new Error("Job not found or you don't have permission to edit it.");
        }
        
        // Populate form state
        setTitle(data.title);
        setDescription(data.description);
        setCategory(data.category);
        setBudget(data.budget);
        setDuration(data.duration);
        setSkills(data.skills || []);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchJob();
  }, [jobId, user]);

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
    
    const updatedJob = {
        title,
        description,
        category,
        budget: Number(budget),
        duration,
        skills,
    };

    try {
        const { error: updateError } = await supabase
            .from('jobs')
            .update(updatedJob)
            .eq('id', jobId);

        if (updateError) throw updateError;
        
        setIsSuccess(true);
    } catch (err: any) {
      console.error("Failed to update job:", err);
      setError("An error occurred while updating the job: " + err.message);
    } finally {
        setIsSubmitting(false);
    }
  };

  if (initialLoading) {
    return (
        <div className="flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 min-h-[60vh]">
            <div className="flex justify-center items-center py-10">
                <Spinner size="lg" />
            </div>
        </div>
    );
  }

  if (error && !isSuccess) {
     return (
        <div className="bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-[60vh]">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-red-600">Error</h2>
                <p className="text-slate-600 mt-2">{error}</p>
                <a href="#/dashboard" className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700">Back to Dashboard</a>
            </div>
        </div>
     );
  }
  
  return (
    <div className="bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg">
        {isSuccess ? (
            <div className="text-center p-4">
                <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto" />
                <h2 className="mt-4 text-2xl font-bold text-slate-900">Job Updated Successfully!</h2>
                <p className="mt-2 text-slate-600">Your changes to "{title}" have been saved.</p>
                <div className="mt-8">
                     <a href="#/dashboard" className="font-semibold text-blue-600 hover:text-blue-800">
                        &larr; Back to Dashboard
                    </a>
                </div>
            </div>
        ) : (
        <>
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-slate-900">
                Edit Job
                </h2>
                <p className="mt-2 text-slate-600">Update the details for your job posting.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                 <div>
                    <label htmlFor="job-title" className="block text-sm font-medium text-slate-700 mb-1">
                    Job Title
                    </label>
                    <input
                    type="text"
                    id="job-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                    className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                        className="flex-grow mt-1 block w-full px-4 py-3 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="e.g., React, Node.js then press Enter"
                    />
                    <button type="button" onClick={handleAddSkill} className="bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-1">
                        Add
                    </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                    {skills.map(skill => (
                        <span key={skill} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium">
                        {skill}
                        <button type="button" onClick={() => handleRemoveSkill(skill)} className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none" aria-label={`Remove ${skill}`}>
                            &times;
                        </button>
                        </span>
                    ))}
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
                    className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
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
                    <input
                        type="number"
                        id="job-budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value === '' ? '' : Number(e.target.value))}
                        min="0"
                        className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                    />
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
                        className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                    />
                    </div>
                </div>
                {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                <div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </>
        )}
      </div>
    </div>
  );
};

export default EditJobPage;