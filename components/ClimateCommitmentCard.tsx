import * as React from 'react';
import LeafIcon from './icons/LeafIcon';

const ClimateCommitmentCard: React.FC = () => {
    return (
        <a 
            href="https://climate.stripe.com/9116Az" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group block"
        >
            <div className="relative p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-teal-200 overflow-hidden bg-white">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-green-100 opacity-60"></div>
                <div className="relative flex flex-col sm:flex-row items-center text-center sm:text-left sm:space-x-6">
                    <div className="flex-shrink-0 bg-white p-4 rounded-full shadow-md">
                        <LeafIcon className="h-10 w-10 text-teal-600" />
                    </div>
                    <div className="mt-4 sm:mt-0">
                        <p className="font-semibold text-slate-800 text-lg leading-tight">
                            At <span className="font-bold text-teal-800">ALBANSAH PLATFORM</span>, we contribute 0.5% of our revenue to carbon removal.
                        </p>
                        <span className="mt-2 inline-block text-sm font-medium text-teal-700 group-hover:underline">
                            Learn more about our climate commitment &rarr;
                        </span>
                    </div>
                </div>
            </div>
        </a>
    );
};

export default ClimateCommitmentCard;