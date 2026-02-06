import * as React from 'react';

const leadershipData = [
  { 
    id: 1, 
    name: 'Albert Bansah', 
    avatarUrl: 'https://media.licdn.com/dms/image/v2/D4E03AQG5mOfqv6rT7w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1727032624944?e=1765411200&v=beta&t=5U6tpVHGBvaCwoo8hbnyYAOUoQmYpb_ykB9slbx3c2I', 
    title: 'Chief Executive Officer', 
    bio: 'Visionary leader driving the mission to connect businesses with top-tier freelance talent globally.'
  },
  { 
    id: 2, 
    name: 'Alicia Bruna', 
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop', 
    title: 'Chief Operating Officer', 
    bio: 'Expert in streamlining operations to ensure a seamless and efficient marketplace for all users.'
  },
  { 
    id: 3, 
    name: 'George Owoso', 
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop', 
    title: 'Chief Technology Officer', 
    bio: 'Innovator at heart, leading the development of our cutting-edge platform technology.'
  },
  { 
    id: 4, 
    name: 'Destin Kitongo', 
    avatarUrl: 'https://assets.zyrosite.com/Yyv7KVN7a4u39pBV/screenshot-2025-11-04-3.06.50-pm-QePGN5nM3zYgkTFN.png', 
    title: 'VP of Product', 
    bio: 'Dedicated to creating an intuitive and powerful user experience for both clients and freelancers.'
  },
   {
    id: 5,
    name: 'Alfredo Liba',
    avatarUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop',
    title: 'VP of Marketing',
    bio: 'Strategist focused on growing the Albansah community and sharing our story with the world.'
  },
  {
    id: 6,
    name: 'Isabella Rossi',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
    title: 'Head of People',
    bio: 'Cultivating a vibrant and inclusive culture that attracts and retains the best talent.'
  }
];

const LeadershipCard: React.FC<typeof leadershipData[0]> = ({ name, avatarUrl, title, bio }) => (
    <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <img src={avatarUrl} alt={`Portrait of ${name}`} className="w-32 h-32 rounded-full mx-auto object-cover" />
        <h3 className="mt-4 text-xl font-bold text-slate-900">{name}</h3>
        <p className="mt-1 text-blue-600 font-semibold">{title}</p>
        <p className="mt-3 text-slate-600 text-sm">{bio}</p>
    </div>
);

const LeadershipPage: React.FC = () => {
    return (
        <div className="bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">Meet Our Leadership</h1>
                    <p className="mt-4 text-lg text-slate-600">
                        The experienced team guiding Albansah towards the future of work.
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {leadershipData.map(member => (
                        <LeadershipCard key={member.id} {...member} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LeadershipPage;