import * as React from 'react';
import type { Job } from '../types';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';
import { supabase } from '../lib/supabaseClient';
import CalendarIcon from '../components/icons/CalendarIcon';
import Spinner from '../components/Spinner';

interface JobApplicationPageProps {
  jobId: string;
}

// Confirmation Modal Component
const ConfirmationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ isOpen, onClose, onConfirm, title, children }) => {
  React.useEffect(() => {
    const handleEsc = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md transform transition-all"
        onClick={e => e.stopPropagation()}
      >
        <h3 id="modal-title" className="text-xl font-bold text-slate-900">{title}</h3>
        <div className="mt-4 text-slate-600">
          {children}
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button 
            onClick={onClose} 
            type="button"
            className="px-5 py-2.5 rounded-lg font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            type="button"
            className="px-5 py-2.5 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Confirm Submission
          </button>
        </div>
      </div>
    </div>
  );
};


const JobApplicationPage: React.FC<JobApplicationPageProps> = ({ jobId }) => {
  const [job, setJob] = React.useState<Job | null>(null);
  const [proposal, setProposal] = React.useState('');
  const [resumeFileName, setResumeFileName] = React.useState('');
  const [error, setError] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [submissionSuccess, setSubmissionSuccess] = React.useState(false);

  React.useEffect(() => {
    const fetchJob = async () => {
        setIsLoading(true);
        try {
            const { data: jobData, error: jobError } = await supabase
                .from('jobs')
                .select('*')
                .eq('id', jobId)
                .single();

            if (jobError) throw jobError;
            setJob(jobData as Job);

        } catch (e) {
            console.error("Failed to load job data", e);
            setJob(null);
        } finally {
            setIsLoading(false);
        }
    };
    
    if (jobId) {
        fetchJob();
    }
  }, [jobId]);

  const handleConfirmSubmit = async () => {
    if (!job) return;
    
    setIsModalOpen(false);
    setIsSubmitting(true);

    const newApplication = {
      jobId: job.id,
      proposal,
      resumeFileName,
      timestamp: Date.now(),
    };

    try {
        const { error: insertError } = await supabase.from('job_applications').insert(newApplication);
        if (insertError) throw insertError;
        setSubmissionSuccess(true);
    } catch (err: any) {
        console.error("Failed to save application", err);
        setError("An error occurred while submitting your application: " + err.message);
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!proposal || !resumeFileName) {
      setError('Please fill out all fields.');
      return;
    }

    setIsModalOpen(true);
  };
  
  const handleAddToCalendar = () => {
    if (!job) return;

    const formatDate = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, '');
    };
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfterTomorrow = new Date(tomorrow);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

    const startDate = `${tomorrow.getFullYear()}${String(tomorrow.getMonth() + 1).padStart(2, '0')}${String(tomorrow.getDate()).padStart(2, '0')}`;
    const endDate = `${dayAfterTomorrow.getFullYear()}${String(dayAfterTomorrow.getMonth() + 1).padStart(2, '0')}${String(dayAfterTomorrow.getDate()).padStart(2, '0')}`;

    const description = `Follow up on the job application for: "${job.title}".\\n\\nDescription: ${job.description.replace(/\n/g, '\\n')}\\n\\nView Job: ${window.location.href}`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Albansah//Freelance Job Reminder//EN',
      'BEGIN:VEVENT',
      `UID:${job.id}-${Date.now()}@albansah.com`,
      `DTSTAMP:${formatDate(new Date())}`,
      `DTSTART;VALUE=DATE:${startDate}`,
      `DTEND;VALUE=DATE:${endDate}`,
      `SUMMARY:Reminder: Apply for "${job.title}"`,
      `DESCRIPTION:${description}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `job-reminder-${job.title.replace(/ /g, '_')}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
        <div className="flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 min-h-[60vh]">
            <div className="flex justify-center items-center py-10">
                <Spinner size="lg" />
            </div>
        </div>
    );
  }

  if (!job) {
    return (
      <div className="flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">Job not found</h2>
          <p className="mt-2 text-slate-600">The job you are looking for does not exist.</p>
          <a href="#/jobs" className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors">
            Back to Jobs
          </a>
        </div>
      </div>
    );
  }

  const renderFormOrStatus = () => {
    if (submissionSuccess) {
        return (
            <div className="bg-green-50 border-l-4 border-green-500 text-green-800 p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                    <CheckCircleIcon className="h-8 w-8 mr-4"/>
                    <div>
                        <h3 className="text-xl font-bold">Application Submitted!</h3>
                        <p className="mt-1">Your proposal for "{job.title}" has been sent. Good luck!</p>
                         <a href="#/jobs" className="mt-4 inline-block font-semibold text-green-900 hover:underline">
                            Apply for another job &rarr;
                        </a>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="proposal" className="block text-sm font-medium text-slate-700 mb-1">
                    Your Proposal
                </label>
                <textarea
                    id="proposal"
                    rows={8}
                    value={proposal}
                    onChange={(e) => setProposal(e.target.value)}
                    className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Write a compelling proposal. Mention your relevant skills and experience..."
                    required
                />
            </div>
            <div>
                <label htmlFor="resume" className="block text-sm font-medium text-slate-700 mb-1">
                   Attach Resume (Simulated)
                </label>
                <input
                    type="text"
                    id="resume"
                    value={resumeFileName}
                    onChange={(e) => setResumeFileName(e.target.value)}
                    className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="e.g., my-professional-resume.pdf"
                    required
                />
                <p className="mt-2 text-xs text-slate-500">This is a simulation. No file will be uploaded.</p>
            </div>
            {error && <p className="text-sm text-red-600 text-center">{error}</p>}
            <div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
            </div>
        </form>
    );
  }

  return (
    <div className="bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">{job.category}</span>
            <h1 className="text-3xl font-extrabold text-slate-900 mt-4">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-600 mt-3">
              <span>Budget: <strong className="font-bold text-slate-800">${job.budget}</strong></span>
              <span>Duration: <strong className="font-bold text-slate-800">{job.duration}</strong></span>
              <button
                onClick={handleAddToCalendar}
                className="flex items-center gap-2 text-sm text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                aria-label="Add job to your calendar"
              >
                <CalendarIcon className="w-5 h-5" />
                Add to Calendar
              </button>
            </div>
            <div className="border-t my-6"></div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Job Description</h2>
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">{job.description}</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-3">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map(skill => (
                <span key={skill} className="bg-slate-200 text-slate-800 px-3 py-1.5 rounded-full text-sm font-medium">{skill}</span>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 mt-8">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-6">Submit Your Proposal</h2>
            {renderFormOrStatus()}
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        title="Confirm Your Application"
      >
        <p>Are you sure you want to submit your application for the job: <strong className="font-semibold text-slate-800">"{job.title}"</strong>?</p>
        <p className="mt-2 text-sm text-slate-500">Please review your proposal before confirming.</p>
      </ConfirmationModal>
    </div>
  );
};

export default JobApplicationPage;