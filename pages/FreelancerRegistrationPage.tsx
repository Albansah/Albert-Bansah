import * as React from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import Spinner from '../components/Spinner';
import UsersIcon from '../components/icons/UsersIcon';
import BriefcaseIcon from '../components/icons/BriefcaseIcon';
import DollarSignIcon from '../components/icons/DollarSignIcon';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';

const plans = [
    {
        id: 'basic',
        name: 'Basic',
        price: 10,
        features: ['Appear in search results', 'Apply to 10 jobs/month', 'Standard support'],
    },
    {
        id: 'pro',
        name: 'Pro',
        price: 25,
        features: ['Higher ranking in search', 'Apply to 50 jobs/month', 'Priority support', "'Pro' badge on profile"],
        isPopular: true,
    },
    {
        id: 'expert',
        name: 'Expert',
        price: 50,
        features: ['Top ranking in search', 'Unlimited job applications', 'Dedicated support', 'Featured on homepage'],
    },
];

const FreelancerRegistrationPage: React.FC = () => {
    const { user } = useAuth();
    const [step, setStep] = React.useState(1);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    // Form state
    const [fullName, setFullName] = React.useState('');
    const [primarySkill, setPrimarySkill] = React.useState('');
    const [skills, setSkills] = React.useState<string[]>([]);
    const [currentSkill, setCurrentSkill] = React.useState('');
    const [hourlyRate, setHourlyRate] = React.useState<number | ''>('');
    const [selectedPlan, setSelectedPlan] = React.useState('pro');

    React.useEffect(() => {
        if (!user) {
            window.location.hash = '/login';
        }
    }, [user]);

    const steps = [
        { name: 'Personal Info', icon: UsersIcon },
        { name: 'Professional Info', icon: BriefcaseIcon },
        { name: 'Choose Plan', icon: DollarSignIcon },
        { name: 'Finish', icon: CheckCircleIcon },
    ];

    const handleNext = () => {
        setError('');
        if (step === 1 && !fullName.trim()) {
            setError('Please enter your full name.');
            return;
        }
        if (step === 2 && (!primarySkill.trim() || hourlyRate === '' || skills.length === 0)) {
            setError('Please fill out all fields and add at least one skill.');
            return;
        }
        if (step < steps.length) {
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
        if (!user) return;
        setLoading(true);
        setError('');

        const profileData = {
            full_name: fullName,
            skill: primarySkill,
            skills,
            hourly_rate: hourlyRate,
            subscription_plan: selectedPlan,
            onboarding_complete: true
        };

        try {
            const { error: updateError } = await supabase
                .from('profiles')
                .update(profileData)
                .eq('id', user.id);

            if (updateError) throw updateError;
            
            // Send WhatsApp notification
            const planDetails = plans.find(p => p.id === selectedPlan);
            const message = `
*New Freelancer Registration on Albansah!*

*Name:* ${fullName}
*Email:* ${user.email}
*Primary Skill:* ${primarySkill}
*Skills:* ${skills.join(', ')}
*Hourly Rate:* $${hourlyRate}/hr
*Subscription Plan:* ${planDetails?.name || selectedPlan} ($${planDetails?.price || 'N/A'}/year)

The profile has been successfully created and is now active.
            `.trim().replace(/\n\s*\n/g, '\n\n');

            const whatsappUrl = `https://wa.me/16509121900?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');

            window.location.hash = '/dashboard';
        } catch (e: any) {
            setError("Failed to save your profile. Please try again.");
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome! Let's start with your name.</h2>
                        <p className="text-slate-600 mb-6">This will be displayed on your public profile.</p>
                        <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                        <input
                            id="fullName"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g., Jane Doe"
                            className="w-full px-4 py-3 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            autoFocus
                        />
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Tell us about your expertise.</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">What is your main service?</label>
                                <input type="text" value={primarySkill} onChange={(e) => setPrimarySkill(e.target.value)} placeholder="e.g., Web Developer" className="w-full px-4 py-3 border border-slate-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Add your skills</label>
                                <div className="flex gap-2">
                                    <input type="text" value={currentSkill} onChange={(e) => setCurrentSkill(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSkill(); } }} placeholder="Type a skill and press Enter" className="flex-grow w-full px-4 py-3 border border-slate-300 rounded-md" />
                                    <button type="button" onClick={handleAddSkill} className="bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700">Add</button>
                                </div>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {skills.map(skill => (
                                        <span key={skill} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium">
                                            {skill}
                                            <button type="button" onClick={() => handleRemoveSkill(skill)} className="ml-2 text-blue-600 hover:text-blue-800" aria-label={`Remove ${skill}`}>&times;</button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Set your hourly rate ($)</label>
                                <input type="number" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value === '' ? '' : Number(e.target.value))} placeholder="e.g., 50" className="w-full px-4 py-3 border border-slate-300 rounded-md" />
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Choose Your Yearly Plan</h2>
                        <p className="text-slate-600 mb-8 text-center">Unlock features to help you find work faster.</p>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {plans.map(plan => (
                                <div key={plan.id} onClick={() => setSelectedPlan(plan.id)} className={`relative p-6 border rounded-xl cursor-pointer transition-all ${selectedPlan === plan.id ? 'border-blue-500 ring-2 ring-blue-500' : 'border-slate-300 hover:border-blue-400'}`}>
                                    {plan.isPopular && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-1 text-sm font-semibold rounded-full">Most Popular</div>}
                                    <h3 className="text-xl font-bold text-slate-900 text-center">{plan.name}</h3>
                                    <p className="text-4xl font-extrabold text-slate-900 text-center my-4">${plan.price}<span className="text-base font-medium text-slate-500">/year</span></p>
                                    <ul className="space-y-2">
                                        {plan.features.map(feature => (
                                            <li key={feature} className="flex items-center text-slate-600">
                                                <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"/>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <p className="text-center text-sm text-slate-500 mt-8">This is a simulation. No payment will be processed.</p>
                    </div>
                );
            case 4:
                return (
                     <div className="text-center">
                        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto" />
                        <h2 className="text-3xl font-bold text-slate-900 mt-4">You're All Set!</h2>
                        <p className="mt-4 text-lg text-slate-600">Your profile is complete. Click the button below to head to your dashboard and start finding work.</p>
                    </div>
                );
        }
    };

    return (
        <div className="bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 min-h-[80vh]">
            <div className="max-w-4xl mx-auto">
                {/* Progress Bar */}
                <div className="mb-8">
                    <ol className="flex items-center w-full">
                        {steps.map((s, index) => (
                            <li key={s.name} className={`flex w-full items-center ${index + 1 < steps.length ? "after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block " : ''} ${step > index + 1 ? 'after:border-blue-600' : 'after:border-slate-200'}`}>
                                <div className="flex flex-col items-center justify-center">
                                    <span className={`flex items-center justify-center w-12 h-12 rounded-full ${step >= index + 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                                        <s.icon className="w-6 h-6" />
                                    </span>
                                    <span className={`text-sm mt-2 text-center ${step >= index + 1 ? 'font-semibold text-blue-700' : 'text-slate-500'}`}>{s.name}</span>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="p-8 bg-white rounded-xl shadow-lg">
                    {renderStepContent()}
                </div>
                
                {/* Navigation */}
                <div className="mt-8 flex justify-between items-center">
                    <div>
                        {step > 1 && (
                            <button onClick={handleBack} className="font-semibold text-slate-600 hover:text-slate-800 px-6 py-2.5 rounded-lg bg-slate-200 hover:bg-slate-300 transition-colors">
                                Back
                            </button>
                        )}
                    </div>
                    <div className="flex items-center space-x-4">
                        {error && <p className="text-sm text-red-600">{error}</p>}
                        {step < steps.length ? (
                            <button onClick={handleNext} className="bg-blue-600 text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                Next
                            </button>
                        ) : (
                            <button onClick={handleFinish} disabled={loading} className="bg-green-600 text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-green-400">
                                {loading ? <Spinner size="sm" /> : 'Go to Dashboard'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FreelancerRegistrationPage;