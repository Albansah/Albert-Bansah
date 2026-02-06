import * as React from 'react';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, logout } = useAuth();
  const [currentHash, setCurrentHash] = React.useState(window.location.hash);
  const [activeSectionId, setActiveSectionId] = React.useState('');

  const navLinks = [
    { name: 'Find Talent', href: '#/' },
    { name: 'Find Work', href: '#/jobs' },
    { name: 'Why Albansah', href: '#/why-albansah' },
    { name: 'Enterprise', href: '#/enterprise' },
  ];

  React.useEffect(() => {
    const onHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', onHashChange);
    // Initial check
    onHashChange();
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  React.useEffect(() => {
    const isHomepage = currentHash === '#/' || currentHash.startsWith('#/#');
    if (!isHomepage) {
      setActiveSectionId('');
      return;
    }

    const sectionIds = navLinks
      .map(link => (link.href.startsWith('#/#') ? link.href.substring(3) : null))
      .filter(Boolean) as string[];
    
    const observedElements: Element[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' } // Activates when the element is in the vertical center of the viewport
    );
    
    const scrollHandler = () => {
        // If near the top of the page, check if any section is active. If not, clear the active section.
        if (window.scrollY < 400) {
            let sectionIsActive = false;
            sectionIds.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                        sectionIsActive = true;
                    }
                }
            });
            if (!sectionIsActive) {
                setActiveSectionId('');
            }
        }
    };

    const timeoutId = setTimeout(() => {
        sectionIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
                observedElements.push(element);
            }
        });
        window.addEventListener('scroll', scrollHandler, { passive: true });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', scrollHandler);
      observedElements.forEach(el => observer.unobserve(el));
    };
  }, [currentHash]);

  React.useEffect(() => {
    if (isMenuOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }
    return () => {
        document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    setIsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  }

  const getIsActive = (href: string) => {
    const isHomepage = currentHash === '#/' || currentHash.startsWith('#/#');

    if (isHomepage) {
        if (href.startsWith('#/#')) {
            const sectionId = href.substring(3);
            return activeSectionId === sectionId;
        }
        if (href === '#/') {
            return activeSectionId === '';
        }
    }
    
    // Path-based match for other pages
    const basePath = currentHash.split('?')[0];
    return basePath === href;
  };

  return (
    <header className="bg-white/80 sticky top-0 z-50 border-b border-slate-200 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <a href="#/" className="flex-shrink-0" onClick={closeMenu}>
              <img className="h-10 w-auto" src="https://lh3.googleusercontent.com/p/AF1QipPsXUxYRP1jM7TkBwZH7lOnnpLQwxyrzxWb55WO=s680-w680-h510-rw" alt="Albansah Logo" />
            </a>
            <nav className="hidden md:flex md:ml-10 md:space-x-8">
              {navLinks.map((link) => {
                const isActive = getIsActive(link.href);
                return (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    className={`font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <a href="#/dashboard" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                  Dashboard
                </a>
                <a 
                  href="https://billing.stripe.com/p/login/14AbJ26JofrSbb7690eIw00" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
                >
                  Manage Billing
                </a>
                <a href="#" onClick={handleLogout} className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                  Log Out
                </a>
                 <a href="#/post-a-job" className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105">
                  Post a Job
                </a>
              </>
            ) : (
              <>
              </>
            )}
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state. */}
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => {
                const isActive = getIsActive(link.href);
                return (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={closeMenu}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-blue-100 text-blue-700' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'}`}
                  >
                    {link.name}
                  </a>
                )
              })}
            </div>
            <div className="pt-4 pb-3 border-t border-slate-200">
                {user ? (
                    <div className="px-5 space-y-3">
                        <a href="#/dashboard" onClick={closeMenu} className="block text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 p-2 rounded-md">Dashboard</a>
                        <a 
                          href="https://billing.stripe.com/p/login/14AbJ26JofrSbb7690eIw00" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={closeMenu} 
                          className="block text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 p-2 rounded-md"
                        >
                          Manage Billing
                        </a>
                        <a href="#" onClick={handleLogout} className="block text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 p-2 rounded-md">Log Out</a>
                        <a href="#/post-a-job" onClick={closeMenu} className="block w-full text-center bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all mt-2">
                            Post a Job
                        </a>
                    </div>
                ) : (
                    <div className="px-5 space-y-3">
                    </div>
                )}
            </div>
        </div>
      )}
    </header>
  );
};

// FIX: Added default export to resolve the import error in App.tsx
export default Header;