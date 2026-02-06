import * as React from 'react';
import { freelancersData } from '../data/freelancers';
import StarIcon from '../components/icons/StarIcon';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';
import ShareProfile from '../components/ShareProfile'; // Import the new component

interface FreelancerProfilePageProps {
  freelancerId: string;
}

const FreelancerProfilePage: React.FC<FreelancerProfilePageProps> = ({ freelancerId }) => {
  const freelancer = freelancersData.find(f => f.id === parseInt(freelancerId));
  const [profileUrl, setProfileUrl] = React.useState('');

  React.useEffect(() => {
    // This ensures the URL is captured after the component mounts on the client-side
    setProfileUrl(window.location.href);
  }, []);

  const handleHireMe = () => {
    if (freelancer) {
      const message = `Hello, I'm interested in hiring ${freelancer.name} for a project.`;
      const whatsappUrl = `https://wa.me/16509121900?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const handleContactClick = () => {
    if (freelancer) {
      const message = `Hello, I'd like to get in touch with ${freelancer.name} regarding a potential project.`;
      const whatsappUrl = `https://wa.me/16509121900?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  if (!freelancer) {
    return (
      <div className="flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">Freelancer not found</h2>
          <p className="mt-2 text-slate-600">The profile you are looking for does not exist.</p>
          <a href="#/" className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors">
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - CTA and Skills */}
          <aside className="lg:col-span-1 space-y-8 lg:order-2">
            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100 sticky top-28">
                <div className="flex items-baseline justify-between">
                    <h3 className="text-3xl font-bold text-slate-900">${freelancer.price}</h3>
                    <span className="text-slate-500">per hour</span>
                </div>
                <button 
                  onClick={handleHireMe}
                  className="mt-6 w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105">
                    Hire Me
                </button>
                <button 
                  onClick={handleContactClick}
                  className="mt-2 w-full text-blue-600 border border-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                    Contact {freelancer.name.split(' ')[0]}
                </button>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Top Skills</h2>
              <div className="flex flex-wrap gap-2">
                {freelancer.skills.map(skill => (
                  <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Column - Main Info */}
          <div className="lg:col-span-2 space-y-8 lg:order-1">
            <div className="bg-white p-8 rounded-xl shadow-md border border-slate-100">
              <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                <img className="w-32 h-32 rounded-full object-cover" src={freelancer.avatarUrl} alt={freelancer.name} />
                <div className="flex-grow pt-2">
                  <h1 className="text-3xl font-bold text-slate-900">{freelancer.name}</h1>
                  <p className="text-xl text-blue-600 font-semibold mt-1">{freelancer.skill}</p>
                  <div className="mt-3 flex items-center text-sm text-slate-500 gap-4">
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-5 h-5 text-yellow-400" />
                      <span className="text-slate-800 font-bold">{freelancer.rating.toFixed(1)}</span>
                      <span>({freelancer.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-green-600">
                        <CheckCircleIcon className="w-5 h-5" />
                        <span className="font-semibold">Verified</span>
                    </div>
                  </div>
                   {/* Add ShareProfile component here */}
                   {profileUrl && <ShareProfile freelancerName={freelancer.name} profileUrl={profileUrl} />}
                </div>
              </div>
              <div className="mt-8 border-t pt-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-2">About Me</h2>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">{freelancer.bio}</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border border-slate-100">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Portfolio</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {freelancer.portfolio.map(item => (
                  <div key={item.id} className="group relative overflow-hidden rounded-lg">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <p className="absolute bottom-0 left-0 p-3 text-white font-semibold">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfilePage;