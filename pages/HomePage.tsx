import * as React from 'react';
import Hero from '../components/Hero';
import TrustedBy from '../components/TrustedBy';
import Categories from '../components/Categories';
import HowItWorks from '../components/HowItWorks';
import FreelancerShowcase from '../components/FreelancerShowcase';
import ClimateCommitmentCard from '../components/ClimateCommitmentCard';
import Pricing from '../components/Pricing';
import PostJobCTA from '../components/PostJobCTA';
import WorkDoneShowcase from '../components/WorkDoneShowcase';

const HomePage: React.FC = () => (
    <>
        <Hero />
        <TrustedBy />
        <Categories />
        <HowItWorks />
        <FreelancerShowcase />
        <WorkDoneShowcase />
        <section className="bg-slate-50 py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <ClimateCommitmentCard />
                </div>
            </div>
        </section>
        <Pricing />
        <PostJobCTA />
    </>
);

export default HomePage;
