import * as React from 'react';
import type { Job } from '../types';
import { supabase } from '../lib/supabaseClient';
import JobFilters from '../components/JobFilters';
import { categoriesData } from '../components/Categories';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';

const JobCard: React.FC<{ job: Job; }> = ({ job }) => {
  const [applicantCount, setApplicantCount] = React.useState(0);
  const { user } = useAuth();

  React.useEffect(() => {
    const fetchApplicantCount = async () => {
      try {
        const { count, error } = await supabase
          .from('job_applications')
          .select('*', { count: 'exact', head: true })
          .eq('jobId', job.id);
        
        if (error) throw error;

        setApplicantCount(count || 0);
      } catch (error) {
        console.error("Failed to parse job applications from localStorage", error);
      }
    };
    fetchApplicantCount();
  }, [job.id]);

  const handleApplyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!user) {
      e.preventDefault();
      window.location.hash = '#/login';
    }
  };

  return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300 flex flex-col">
        <div className="p-6 flex-grow">
            <div className="flex justify-between items-start gap-4">
                <div>
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {job.category}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-3 hover:text-blue-600 transition-colors">
                        <a href={`#/job/${job.id}`}>{job.title}</a>
                    </h3>
                </div>
                <div className="text-right flex-shrink-0">
                    <p className="text-2xl font-bold text-slate-800">${job.budget}</p>
                    <p className="text-sm text-slate-500">Budget</p>
                </div>
            </div>
            <p className="text-slate-600 mt-2 line-clamp-3">{job.description}</p>
            
            <div className="mt-4">
            <h4 className="text-sm font-semibold text-slate-800 mb-2">Skills Required:</h4>
            <div className="flex flex-wrap gap-2">
                {job.skills.slice(0, 5).map(skill => (
                <span key={skill} className="bg-slate-200 text-slate-800 px-3 py-1 rounded-full text-xs font-medium">
                    {skill}
                </span>
                ))}
                {job.skills.length > 5 && (
                    <span className="bg-slate-200 text-slate-800 px-3 py-1 rounded-full text-xs font-medium">
                        +{job.skills.length - 5} more
                    </span>
                )}
            </div>
            </div>
        </div>
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 rounded-b-xl">
            <div className="flex-grow space-y-1 text-center sm:text-left">
                <p className="text-sm text-slate-500">Duration: <span className="font-medium text-slate-700">{job.duration}</span></p>
                <p className="text-sm text-slate-500">Proposals: <span className="font-medium text-slate-700">{applicantCount}</span></p>
            </div>
            <a 
                href={`#/job/${job.id}`}
                onClick={handleApplyClick}
                className="block text-center bg-blue-600 text-white w-full sm:w-auto px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 text-sm">
                Apply Now
            </a>
        </div>
      </div>
  );
};

const JobsListPage: React.FC = () => {
  const [jobs, setJobs] = React.useState<Job[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [filteredJobs, setFilteredJobs] = React.useState<Job[]>([]);
  const [filters, setFilters] = React.useState({
    category: '',
    minBudget: '',
    maxBudget: '',
    skills: '',
  });

  // Effect to set initial filters from URL on component mount
  React.useEffect(() => {
    const hash = window.location.hash;
    const searchPart = hash.split('?')[1];
    if (searchPart) {
      const params = new URLSearchParams(searchPart);
      setFilters(prev => ({
        ...prev,
        category: params.get('category') || '',
        skills: params.get('skills') || '',
      }));
    }
  }, []);

  React.useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setJobs(data as Job[]);
      } catch (error) {
        console.error("Failed to fetch jobs from Supabase", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  React.useEffect(() => {
    let result = jobs;

    // Filter by category
    if (filters.category) {
      result = result.filter(job => job.category === filters.category);
    }

    // Filter by budget
    const min = parseFloat(filters.minBudget);
    const max = parseFloat(filters.maxBudget);

    if (!isNaN(min)) {
      result = result.filter(job => job.budget >= min);
    }
    if (!isNaN(max)) {
      result = result.filter(job => job.budget <= max);
    }

    // Filter by skills (comma-separated, case-insensitive)
    if (filters.skills.trim()) {
      const searchSkills = filters.skills.toLowerCase().split(',').map(s => s.trim()).filter(s => s);
      result = result.filter(job => 
        searchSkills.every(searchSkill => 
          job.skills.some(jobSkill => jobSkill.toLowerCase().includes(searchSkill))
        )
      );
    }
    
    setFilteredJobs(result);
  }, [filters, jobs]);
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      category: '',
      minBudget: '',
      maxBudget: '',
      skills: '',
    });
  };

  if (loading) {
    return (
        <div className="flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 min-h-[60vh]">
            <div className="flex justify-center items-center py-10">
                <Spinner size="lg" />
            </div>
        </div>
    );
  }

  return (
    <div className="bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 min-h-[60vh]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">
          Find Your Next Project
        </h2>
        
        <JobFilters 
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
          categories={categoriesData.map(c => c.name)}
        />
        
        {jobs.length > 0 ? (
          filteredJobs.length > 0 ? (
            <div className="space-y-6 mt-8">
              {filteredJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center bg-white p-12 rounded-lg shadow-md border mt-8">
              <h3 className="text-2xl font-medium text-slate-800">No jobs match your criteria</h3>
              <p className="text-slate-500 mt-2">Try adjusting your filters or check back later.</p>
              <button onClick={handleResetFilters} className="mt-6 inline-block bg-blue-600 text-white px-6 py-2.5 rounded-md font-semibold hover:bg-blue-700 transition-colors">
                 Reset Filters
              </button>
            </div>
          )
        ) : (
          <div className="text-center bg-white p-12 rounded-lg shadow-md border">
            <h3 className="text-2xl font-medium text-slate-800">No jobs posted yet</h3>
            <p className="text-slate-500 mt-2">Check back soon for new opportunities or be the first to post one!</p>
             <a href="#/post-a-job" className="mt-6 inline-block bg-blue-600 text-white px-6 py-2.5 rounded-md font-semibold hover:bg-blue-700 transition-colors">
                Post a Job
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsListPage;