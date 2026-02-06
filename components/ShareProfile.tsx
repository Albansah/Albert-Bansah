import * as React from 'react';
import TwitterIcon from './icons/TwitterIcon';
import LinkedInIcon from './icons/LinkedInIcon';
import FacebookIcon from './icons/FacebookIcon';
import LinkIcon from './icons/LinkIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';

interface ShareProfileProps {
    freelancerName: string;
    profileUrl: string;
}

const ShareProfile: React.FC<ShareProfileProps> = ({ freelancerName, profileUrl }) => {
    const [isCopied, setIsCopied] = React.useState(false);

    const shareText = `Check out this talented freelancer on Albansah: ${freelancerName}`;
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(profileUrl);

    const socialLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedText}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(profileUrl).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    return (
        <div className="flex items-center space-x-4 mt-4">
            <span className="text-sm font-semibold text-gray-700">Share:</span>
            <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-sky-500 transition-colors" aria-label="Share on Twitter">
                <TwitterIcon className="w-6 h-6" />
            </a>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700 transition-colors" aria-label="Share on LinkedIn">
                <LinkedInIcon className="w-6 h-6" />
            </a>
            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors" aria-label="Share on Facebook">
                <FacebookIcon className="w-6 h-6" />
            </a>
            <button
                onClick={handleCopy}
                className="flex items-center text-sm font-medium text-gray-600 border border-gray-300 rounded-full px-4 py-1.5 hover:bg-gray-100 transition-colors"
            >
                {isCopied ? (
                    <>
                        <CheckCircleIcon className="w-5 h-5 mr-2 text-green-500" />
                        Copied!
                    </>
                ) : (
                    <>
                        <LinkIcon className="w-5 h-5 mr-2" />
                        Copy Link
                    </>
                )}
            </button>
        </div>
    );
};

export default ShareProfile;