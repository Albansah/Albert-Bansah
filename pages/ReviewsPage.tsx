import * as React from 'react';
import StarIcon from '../components/icons/StarIcon';

const reviewsData = [
  {
    rating: 5,
    name: 'Michael B.',
    role: 'Client',
    review: 'Incredible platform. Found the perfect developer for my project within hours. The process was smooth, secure, and highly efficient. Will definitely use again.'
  },
  {
    rating: 5,
    name: 'Sarah L.',
    role: 'Freelancer',
    review: 'Albansah has been pivotal for my freelance career. The quality of clients is excellent, and the payment protection gives me peace of mind. Highly recommend.'
  },
  {
    rating: 4,
    name: 'David Chen',
    role: 'Client',
    review: 'A great resource for finding specialized talent. The user interface is clean and easy to navigate. My only suggestion would be more advanced filtering options for jobs.'
  },
  {
    rating: 5,
    name: 'Laura Evans',
    role: 'Freelancer',
    review: 'I love the community and the opportunities available on Albansah. The support team is also very responsive and helpful whenever I have a question.'
  },
  {
    rating: 5,
    name: 'Tom Rodriguez',
    role: 'Client',
    review: 'We hired a marketing expert who helped us double our online engagement. The talent pool is diverse and highly skilled. A fantastic experience all around.'
  },
  {
    rating: 4,
    name: 'Jessica Lee',
    role: 'Freelancer',
    review: 'Good platform with consistent work. The mobile app is convenient for managing projects on the go. Fees are reasonable compared to other marketplaces.'
  }
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <StarIcon key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-slate-300'}`} />
        ))}
    </div>
);

const ReviewCard: React.FC<typeof reviewsData[0]> = ({ rating, name, role, review }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col h-full">
        <StarRating rating={rating} />
        <p className="text-slate-600 mt-4 flex-grow">"{review}"</p>
        <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="font-semibold text-slate-900">{name}</p>
            <p className="text-sm text-slate-500">{role}</p>
        </div>
    </div>
);

const ReviewsPage: React.FC = () => {
    return (
        <div className="bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">What Our Community Says</h1>
                    <p className="mt-4 text-lg text-slate-600">
                        Honest reviews from clients and freelancers who trust Albansah to get work done.
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviewsData.map((review, index) => (
                        <ReviewCard key={index} {...review} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReviewsPage;