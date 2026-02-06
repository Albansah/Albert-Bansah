import * as React from 'react';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';

const AboutUsPage: React.FC = () => {
    const values = [
        {
            name: 'Innovation',
            description: 'We are constantly pushing boundaries to redefine the future of work.'
        },
        {
            name: 'Community',
            description: 'We foster a collaborative environment where freelancers and clients can thrive together.'
        },
        {
            name: 'Empowerment',
            description: 'We provide the tools and opportunities for individuals to build their own success stories.'
        },
        {
            name: 'Integrity',
            description: 'We operate with transparency and trust, ensuring a fair marketplace for all.'
        }
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section 
                className="relative bg-blue-700 text-white py-24 sm:py-32"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="absolute inset-0 bg-blue-800 opacity-80"></div>
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Our Mission</h1>
                    <p className="mt-6 text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
                        To create economic opportunities so people have better lives. We connect businesses with great talent to work without limits.
                    </p>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">The Albansah Story</h2>
                            <p className="mt-4 text-lg text-slate-600">
                                Founded in 2023, Albansah was born from a simple idea: to build a more connected and empowered global workforce. We saw the immense potential of freelance talent and the growing need for businesses to access specialized skills on demand.
                            </p>
                            <p className="mt-4 text-slate-600">
                                What started as a small platform has grown into a thriving marketplace where millions turn their ideas into reality. We are dedicated to building a trusted, transparent, and efficient space for collaboration, enabling professionals and businesses to achieve more together.
                            </p>
                        </div>
                        <div>
                            <img 
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
                                alt="Team collaborating"
                                className="rounded-xl shadow-lg w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Our Core Values</h2>
                        <p className="mt-4 text-lg text-slate-600">The principles that guide our work and our community.</p>
                    </div>
                    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map(value => (
                            <div key={value.name} className="p-6 border border-slate-100 rounded-xl hover:shadow-lg transition-shadow">
                                <CheckCircleIcon className="h-8 w-8 text-blue-600" />
                                <h3 className="text-xl font-semibold text-slate-900 mt-4">{value.name}</h3>
                                <p className="mt-2 text-slate-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-600">
                 <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Join Our Community
                    </h2>
                    <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                       Whether you're looking to hire or find work, Albansah is where ambition meets opportunity.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <a 
                          href="#/post-a-job"
                          className="inline-block bg-white text-blue-700 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-all text-lg shadow-lg transform hover:scale-105"
                        >
                          Post a Job
                        </a>
                         <a 
                          href="#/jobs"
                          className="inline-block bg-blue-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-800 transition-all text-lg shadow-lg transform hover:scale-105"
                        >
                          Find Work
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUsPage;