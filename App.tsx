import * as React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppChatbot from './components/WhatsAppChatbot';

// Pages
import HomePage from './pages/HomePage';
import PostJobPage from './pages/PostJobPage';
import FreelancerProfilePage from './pages/FreelancerProfilePage';
import JobsListPage from './pages/JobsListPage';
import JobApplicationPage from './pages/JobApplicationPage';
import NotFoundPage from './pages/NotFoundPage';
import DashboardPage from './pages/DashboardPage';
import EnterprisePage from './pages/EnterprisePage';
import AboutUsPage from './pages/AboutUsPage';
import LeadershipPage from './pages/LeadershipPage';
import WhyAlbansahPage from './pages/WhyAlbansahPage';
import CareersPage from './pages/CareersPage';
import ContactUsPage from './pages/ContactUsPage';
import HelpSupportPage from './pages/HelpSupportPage';
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import ReviewsPage from './pages/ReviewsPage';
import BlogPage from './pages/BlogPage';
import DirectContractsPage from './pages/DirectContractsPage';
import HireAgencyPage from './pages/HireAgencyPage';
import TermsPage from './pages/TermsPage';
import PricingPage from './pages/PricingPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import FreelancerRegistrationPage from './pages/FreelancerRegistrationPage';
import EditJobPage from './pages/EditJobPage';

const routes: { [key: string]: React.ComponentType<any> } = {
    '/': HomePage,
    '/post-a-job': PostJobPage,
    '/jobs': JobsListPage,
    '/dashboard': DashboardPage,
    '/enterprise': EnterprisePage,
    '/about': AboutUsPage,
    '/leadership': LeadershipPage,
    '/why-albansah': WhyAlbansahPage,
    '/careers': CareersPage,
    '/contact': ContactUsPage,
    '/help': HelpSupportPage,
    '/success-stories': SuccessStoriesPage,
    '/reviews': ReviewsPage,
    '/blog': BlogPage,
    '/direct-contracts': DirectContractsPage,
    '/hire-agency': HireAgencyPage,
    '/terms': TermsPage,
    '/pricing': PricingPage,
    '/privacy': PrivacyPolicyPage,
    '/refund': RefundPolicyPage,
    '/freelancer-registration': FreelancerRegistrationPage,
};

const useHashRouter = () => {
    const getCurrentPath = () => window.location.hash.substring(1).split('?')[0] || '/';
    const [path, setPath] = React.useState(getCurrentPath());

    React.useEffect(() => {
        const onHashChange = () => {
            setPath(getCurrentPath());
            window.scrollTo(0, 0);
        };
        window.addEventListener('hashchange', onHashChange);
        // Also handle initial load with hash
        onHashChange();
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    const { Page, props } = React.useMemo(() => {
        if (path.startsWith('/freelancer/')) {
            const id = path.split('/')[2];
            return { Page: FreelancerProfilePage, props: { freelancerId: id } };
        }
        if (path.startsWith('/job/')) {
            const id = path.split('/')[2];
            return { Page: JobApplicationPage, props: { jobId: id } };
        }
        if (path.startsWith('/edit-job/')) {
            const id = path.split('/')[2];
            return { Page: EditJobPage, props: { jobId: id } };
        }
        const MatchedPage = routes[path];
        return { Page: MatchedPage || NotFoundPage, props: {} };
    }, [path]);

    return { Page, props };
};

const SkipLink: React.FC<{ targetId: string }> = ({ targetId }) => (
    <a href={`#${targetId}`} className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-2 focus:left-2 focus:bg-white focus:text-blue-600 focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg">
        Skip to main content
    </a>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="bg-white font-sans flex flex-col min-h-screen">
        <SkipLink targetId="main-content" />
        <Header />
        <main id="main-content" className="flex-grow">
            {children}
        </main>
        <Footer />
    </div>
);

const AppContent: React.FC = () => {
    const { Page, props } = useHashRouter();
    
    return (
        <Layout>
            <Page {...props} />
        </Layout>
    );
};

const App: React.FC = () => (
    <>
        <AppContent />
        <WhatsAppChatbot />
    </>
);

export default App;