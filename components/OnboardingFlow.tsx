import * as React from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import Spinner from './Spinner';
import LightbulbIcon from './icons/LightbulbIcon';
import BriefcaseIcon from './icons/BriefcaseIcon';
import DollarSignIcon from './icons/DollarSignIcon';
import UsersIcon from './icons/UsersIcon';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const { user } = useAuth();
  const [step, setStep] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  // Common state
  const [fullName, setFullName] = React.useState('');

  // Freelancer state
  const [primarySkill, setPrimarySkill] = React.useState('');
  const [skills, setSkills] = React.useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = React.useState('');
  const [hourlyRate, setHourlyRate] = React.useState<number | ''>('');

  if (!user) return null;

  const totalSteps = user.role === 'freelancer' ? 4 : 3;

  const handleNext = () => {
    setError('');
    // Simple validation
    if (step === 2 && !fullName.trim()) {
        setError('Please enter your full name.');
        return;
    }
    if (step === 3 && user.role === 'freelancer' && (!primarySkill.trim() || hourlyRate === '')) {
        setError('Please fill out all fields.');
        return;
    }
    if (step < totalSteps) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

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

  const handleFinish = async () => {
    setLoading(true);
    setError('');

    const profileData = user.role === 'freelancer' 
        ? { full_name: fullName, skill: primarySkill, skills, hourly_rate: hourlyRate, onboarding_complete: true }
        : { full_name: fullName, onboarding_complete: true };

    try {
        const { error: updateError } = await supabase
            .from('profiles')
            .update(profileData)
            .eq('id', user.id);
        
        if (updateError) throw updateError;
        
        onComplete();
    } catch (e: any) {
        setError("Failed to save your profile. Please try again.");
        console.error(e);
    } finally {
        setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1: // Welcome
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Welcome to Albansah!</h2>
            <p className="mt-4 text-lg text-gray-600">We're excited to have you. Let's get your profile set up in just a few quick steps.</p>
          </div>
        );
      case 2: // Name
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What's your full name?</h2>
            <p className="text-gray-600 mb-6">This will be displayed on your public profile.</p>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g., Jane Doe"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
              autoFocus
            />
          </div>
        );
      case 3: // Role-specific step
        if (user.role === 'freelancer') {
          return (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Freelancer Profile</h2>
              <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What is your main service?</label>
                    <input type="text" value={primarySkill} onChange={(e) => setPrimarySkill(e.target.value)} placeholder="e.g., Web Developer" className="w-full px-4 py-3 border border-gray-300 rounded-md"/>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Add your skills</label>
                    <div className="flex gap-2">
                        <input type="text" value={currentSkill} onChange={(e) => setCurrentSkill(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSkill(); } }} placeholder="Type a skill and press Enter" className="flex-grow w-full px-4 py-3 border border-gray-300 rounded-md"/>
                    </div>
                     <div className="mt-2 flex flex-wrap gap-2">
                      {skills.map(skill => (
                        <span key={skill} className="flex items-center bg-sky-100 text-sky-800 px-3 py-1.5 rounded-full text-sm font-medium">
                          {skill}
                          <button type="button" onClick={() => handleRemoveSkill(skill)} className="ml-2 text-sky-600 hover:text-sky-800" aria-label={`Remove ${skill}`}>&times;</button>
                        </span>
                      ))}
                    </div>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Set your hourly rate ($)</label>
                    <input type="number" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value === '' ? '' : Number(e.target.value))} placeholder="e.g., 50" className="w-full px-4 py-3 border border-gray-300 rounded-md"/>
                </div>
              </div>
            </div>
          );
        } else { // Client Tour
            return (
                 <div className="text-center">
                     <h2 className="text-2xl font-bold text-gray-900 mb-6">You're ready to hire!</h2>
                     <p className="text-gray-600 mb-6">Here's how to get started.</p>
                     <div className="space-y-4 text-left">
                         <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                            <LightbulbIcon className="w-8 h-8 text-sky-600 mr-4 mt-1 flex-shrink-0"/>
                            <div>
                                <h3 className="font-semibold text-gray-800">Post a Job</h3>
                                <p className="text-gray-600">Create a job posting for free and receive proposals from talented freelancers.</p>
                            </div>
                         </div>
                         <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                            <UsersIcon className="w-8 h-8 text-sky-600 mr-4 mt-1 flex-shrink-0"/>
                            <div>
                                <h3 className="font-semibold text-gray-800">Find Talent</h3>
                                <p className="text-gray-600">Browse the marketplace to find the perfect expert for your project.</p>
                            </div>
                         </div>
                     </div>
                </div>
            );
        }
      case 4: // Freelancer Tour
        return (
            <div className="text-center">
                 <h2 className="text-2xl font-bold text-gray-900 mb-6">You're all set!</h2>
                 <p className="text-gray-600 mb-6">Here's a quick look at what's next.</p>
                 <div className="space-y-4 text-left">
                     <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                        <BriefcaseIcon className="w-8 h-8 text-sky-600 mr-4 mt-1 flex-shrink-0"/>
                        <div>
                            <h3 className="font-semibold text-gray-800">Find Work</h3>
                            <p className="text-gray-600">Browse jobs, submit proposals, and land your next project.</p>
                        </div>
                     </div>
                     <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                        <DollarSignIcon className="w-8 h-8 text-sky-600 mr-4 mt-1 flex-shrink-0"/>
                        <div>
                            <h3 className="font-semibold text-gray-800">Get Paid Securely</h3>
                            <p className="text-gray-600">Use Stripe Connect for secure and reliable payments.</p>
                        </div>
                     </div>
                 </div>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg transform transition-all">
        {/* Progress Bar */}
        <div className="p-2">
            <div className="bg-gray-200 rounded-full h-2">
                <div 
                    className="bg-sky-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(step / totalSteps) * 100}%` }}
                ></div>
            </div>
        </div>

        <div className="p-8">
            {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="bg-gray-50 px-8 py-4 rounded-b-xl flex justify-between items-center">
            <div>
                {step > 1 && (
                    <button onClick={handleBack} className="font-semibold text-gray-600 hover:text-gray-800">
                        Back
                    </button>
                )}
            </div>
            <div className="flex items-center space-x-4">
                {error && <p className="text-sm text-red-600">{error}</p>}
                {step < totalSteps ? (
                    <button onClick={handleNext} className="bg-sky-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-sky-700 transition-colors">
                        Next
                    </button>
                ) : (
                    <button onClick={handleFinish} disabled={loading} className="bg-sky-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-sky-700 transition-colors disabled:bg-sky-400">
                        {loading ? <Spinner size="sm" /> : 'Finish Setup'}
                    </button>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;