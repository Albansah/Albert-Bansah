import * as React from 'react';
import { useAuth } from '../context/AuthContext';
import EyeIcon from '../components/icons/EyeIcon';
import EyeOffIcon from '../components/icons/EyeOffIcon';

const PasswordStrengthMeter: React.FC<{ password: string }> = ({ password }) => {
  const getStrength = () => {
    let score = 0;
    if (password.length > 7) score++;
    if (password.length > 11) score++;
    if (/\d/.test(password)) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getStrength();
  const strengthLabels = ['Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
  const strengthColors = ['bg-red-500', 'bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-green-500'];

  if (!password) return null;

  return (
    <div className="mt-2 space-y-1">
      <div className="flex justify-between items-center text-xs">
        <span className="font-medium text-slate-700">Password strength</span>
        <span className={`font-semibold ${strength < 3 ? 'text-red-600' : 'text-green-600'}`}>{strengthLabels[strength - 1] || 'Very Weak'}</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-1.5">
        <div 
          className={`h-1.5 rounded-full ${strengthColors[strength - 1] || 'bg-slate-200'} transition-all duration-300`}
          style={{ width: `${strength * 20}%` }}
        ></div>
      </div>
    </div>
  );
};

const SignUpPage: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [role, setRole] = React.useState<'client' | 'freelancer'>('client');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { signup, user } = useAuth();

  React.useEffect(() => {
    if (user) {
        window.location.hash = '/dashboard';
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
        setError("Please fill in all fields.");
        setLoading(false);
        return;
    }
    
    const result = await signup(email, role, password);
    if (result.success) {
      if (role === 'freelancer') {
        window.location.hash = '/freelancer-registration';
      } else {
        window.location.hash = '/dashboard';
      }
    } else {
      setError(result.error || "An error occurred during sign up.");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
                Join Albansah
            </h2>
            <p className="mt-2 text-center text-sm text-slate-600">
                Already have an account?{' '}
                <a href="https://billing.stripe.com/p/login/14AbJ26JofrSbb7690eIw00" target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:text-blue-500">
                Log in
                </a>
            </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm pr-10"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
               <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 z-20 flex items-center pr-3 text-slate-500 hover:text-slate-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          
          <PasswordStrengthMeter password={password} />
          
          <fieldset className="space-y-4">
            <legend className="sr-only">User role</legend>
            <div onClick={() => setRole('client')} className={`relative flex items-start p-4 border rounded-lg cursor-pointer transition-all ${role === 'client' ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500' : 'border-slate-300 hover:border-blue-400'}`}>
                <div className="flex items-center h-5">
                    <input id="role-client" name="role" type="radio" value="client" checked={role === 'client'} onChange={() => {}} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-slate-300" />
                </div>
                <div className="ml-3 text-sm">
                    <label htmlFor="role-client" className="font-medium text-slate-900">I'm a client, hiring for a project</label>
                </div>
            </div>
             <div onClick={() => setRole('freelancer')} className={`relative flex items-start p-4 border rounded-lg cursor-pointer transition-all ${role === 'freelancer' ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500' : 'border-slate-300 hover:border-blue-400'}`}>
                <div className="flex items-center h-5">
                    <input id="role-freelancer" name="role" type="radio" value="freelancer" checked={role === 'freelancer'} onChange={() => {}} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-slate-300" />
                </div>
                <div className="ml-3 text-sm">
                    <label htmlFor="role-freelancer" className="font-medium text-slate-900">I'm a freelancer, looking for work</label>
                </div>
            </div>
          </fieldset>
          
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-blue-400"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
