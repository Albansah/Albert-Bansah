import * as React from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import type { Job, JobApplication } from '../types';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';
import Spinner from '../components/Spinner';
import OnboardingFlow from '../components/OnboardingFlow';

const StripeConnectCard: React.FC<{ onboardingComplete: boolean }> = ({ onboardingComplete }) => {
    const [isGeneratingLink, setIsGeneratingLink] = React.useState(false);
    const [error, setError] = React.useState('');

    const handleStripeConnect = async () => {
        setIsGeneratingLink(true);
        setError('');
        try {
            // Invoke the Supabase Edge Function to get a Stripe Connect onboarding link.
            const { data, error: invokeError } = await supabase.functions.invoke('stripe-connect');
            
            if (invokeError) {
                throw invokeError;
            }

            if (data && data.url) {
                // Redirect the user to the generated Stripe onboarding URL.
                window.location.href = data.url;
            } else {
                throw new Error("Could not retrieve the Stripe onboarding link.");
            }
        } catch (e: any) {
            console.error("Failed to generate Stripe Connect link:", e);
            setError("Failed to generate link. Please try again later.");
        } finally {
            setIsGeneratingLink(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900">Payouts Setup</h3>
            <p className="mt-2 text-slate-600">
                Connect your Stripe account to receive payments for your work securely.
            </p>
            <div className="mt-6">
                {onboardingComplete ? (
                    <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg">
                        <CheckCircleIcon className="h-6 w-6 text-green-600 mr-3 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-green-800">Stripe Account Connected</h4>
                            <p className="text-sm text-green-700">You are ready to receive payouts.</p>
                        </div>
                    </div>
                ) : (
                    <div>
                        <button
                            onClick={handleStripeConnect}
                            disabled={isGeneratingLink}
                            className="inline-block w-full text-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:bg-blue-400 disabled:cursor-not-allowed"
                        >
                            {isGeneratingLink ? 'Generating Link...' : 'Connect with Stripe'}
                        </button>
                        {error && <p className="text-sm text-red-600 mt-2 text-center">{error}</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

const ClientDashboard: React.FC<{ userId: string }> = ({ userId }) => {
    const [postedJobs, setPostedJobs] = React.useState<Job[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchPostedJobs = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('jobs')
                .select('*')
                .eq('clientId', userId)
                .order('created_at', { ascending: false });
            
            if (error) {
                console.error("Error fetching client jobs:", error);
            } else {
                setPostedJobs(data || []);
            }
            setLoading(false);
        };
        fetchPostedJobs();
    }, [userId]);

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-4">My Posted Jobs</h3>
            {loading ? (
                <div className="flex justify-center py-4"><Spinner /></div>
            ) : postedJobs.length > 0 ? (
                <ul className="space-y-4">
                    {postedJobs.map(job => (
                        <li key={job.id} className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                            <div className="flex justify-between items-center">
                                <div>
                                    <a href={`#/job/${job.id}`} className="font-semibold text-blue-700 hover:underline">{job.title}</a>
                                    <p className="text-sm text-slate-500 mt-1">Budget: ${job.budget} - Duration: {job.duration}</p>
                                </div>
                                <a href={`#/edit-job/${job.id}`} className="bg-slate-200 text-slate-800 px-4 py-2 rounded-lg font-semibold hover:bg-slate-300 transition-colors text-sm flex-shrink-0">
                                    Edit
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-slate-600">You haven't posted any jobs yet.</p>
            )}
        </div>
    );
};

const FreelancerDashboard: React.FC<{ user: NonNullable<ReturnType<typeof useAuth>['user']> }> = ({ user }) => {
    const [applications, setApplications] = React.useState<(JobApplication & { jobs: Job | null })[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchApplications = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('job_applications')
                .select('*, jobs(*)')
                .eq('freelancerId', user.id)
                .order('created_at', { ascending: false });
            
            if (error) {
                console.error("Error fetching applications:", error);
            } else {
                setApplications(data as any || []);
            }
            setLoading(false);
        };
        fetchApplications();
    }, [user.id]);
    
    const getStatusBadge = (status?: JobApplication['status']) => {
        const baseClasses = "text-xs font-semibold px-2.5 py-1 rounded-full";
        switch (status) {
            case 'Accepted':
                return <span className={`${baseClasses} bg-green-100 text-green-800`}>Accepted</span>;
            case 'Rejected':
                return <span className={`${baseClasses} bg-red-100 text-red-800`}>Rejected</span>;
            case 'Reviewed':
                return <span className={`${baseClasses} bg-indigo-100 text-indigo-800`}>Reviewed</span>;
            case 'Pending':
            default:
                return <span className={`${baseClasses} bg-slate-100 text-slate-800`}>Pending</span>;
        }
    };
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1 space-y-8">
                <StripeConnectCard onboardingComplete={!!user.stripe_onboarding_complete} />
            </div>
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-4">My Applications</h3>
                {loading ? (
                    <div className="flex justify-center py-4"><Spinner /></div>
                ) : applications.length > 0 ? (
                    <ul className="space-y-4">
                        {applications.map(app => (
                            <li key={app.id} className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                                <div className="flex justify-between items-start">
                                    <div className="flex-grow pr-4">
                                        <a href={`#/job/${app.jobId}`} className="font-semibold text-blue-700 hover:underline">
                                            {app.jobs?.title || 'Job not found'}
                                        </a>
                                        <p className="text-sm text-slate-600 mt-1 line-clamp-2">Your proposal: {app.proposal}</p>
                                    </div>
                                    <div className="flex-shrink-0 mt-1">
                                        {getStatusBadge(app.status)}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-slate-600">You haven't applied to any jobs yet.</p>
                )}
            </div>
        </div>
    );
};

const DashboardPage: React.FC = () => {
    const { user } = useAuth();

    if (!user) {
        if (typeof window !== 'undefined') {
          window.location.hash = '/login';
        }
        return (
            <div className="flex items-center justify-center bg-slate-50 py-12 min-h-[60vh]">
                <p>Redirecting to login...</p>
            </div>
        );
    }
    
    // Show onboarding flow if not completed
    if (!user.onboarding_complete) {
        return <OnboardingFlow onComplete={() => window.location.reload()} />;
    }

    return (
        <div className="bg-slate-50 min-h-[70vh] py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Dashboard</h1>
                <p className="text-lg text-slate-600 mb-8">Welcome back, {user.full_name || user.email}!</p>
                
                {user.role === 'freelancer' && <FreelancerDashboard user={user} />}
                {user.role === 'client' && <ClientDashboard userId={user.id} />}
            </div>
        </div>
    );
};

export default DashboardPage;