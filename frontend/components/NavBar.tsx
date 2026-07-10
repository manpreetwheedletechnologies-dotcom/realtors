import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Logo from '../public/logo.png'
import whitelogo from '../public/Realtors white.png'
import Image from 'next/image';

// Dynamically import modals with ssr: false to avoid SSR issues
const LoginModal = dynamic(() => import('./LoginModal'), { ssr: false });
const RegisterModal = dynamic(() => import('./RegisterModal'), { ssr: false });

// Land categories data
// FIX: added an `icon` field to each category — the render code below reads
// `category.icon` (desktop dropdown + mobile dropdown) but this array never
// defined it, so every icon slot was rendering blank.
const landCategories = [
  { label: 'Residential Land', href: '/land/residential-land', icon: '🏠' },
  { label: 'Commercial Land', href: '/land/commercial-land', icon: '🏢' },
  { label: 'Agricultural Land', href: '/land/agricultural-land', icon: '🌾' },
  { label: 'Industrial Land', href: '/land/industrial-land', icon: '🏭' },
  { label: 'Mixed-Use Land', href: '/land/mixed-use-land', icon: '🏘️' },
  { label: 'Plotted Development', href: '/land/plotted-development', icon: '📐' },
  { label: 'Farm Land', href: '/land/farm-land', icon: '🌿' },
  { label: 'Hill View Plot', href: '/land/hill-view-plot', icon: '⛰️' }
];

export default function NavBar() {
  const router = useRouter();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLandDropdownOpen, setIsLandDropdownOpen] = useState(false);
  const [isMobileLandDropdownOpen, setIsMobileLandDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeLandCategory, setActiveLandCategory] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  // Set mounted state to handle client-side only operations
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle scroll with hide/show animation
  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update scrolled state for background blur
      setIsScrolled(currentScrollY > 50);

      // Hide/show navbar based on scroll direction
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
          // Scrolling down - hide navbar
          setIsVisible(false);
          // FIX: close any open dropdown when the navbar auto-hides on
          // scroll-down, otherwise the dropdown panel stays visually
          // "floating" with no navbar attached to it.
          setIsLandDropdownOpen(false);
        } else {
          // Scrolling up - show navbar
          setIsVisible(true);
        }
      } else {
        // At the top - always show navbar
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMounted]);

  // Close dropdowns on outside click
  useEffect(() => {
    if (!isMounted) return;

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLandDropdownOpen(false);
      }
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
        setIsMobileLandDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMounted]);

  // Close mobile menu on route change
  useEffect(() => {
    if (!isMounted) return;

    setIsMobileMenuOpen(false);
    setIsLandDropdownOpen(false);
    setIsMobileLandDropdownOpen(false);
  }, [router.pathname, isMounted]);

  // Check and set active land category based on current route
  useEffect(() => {
    if (!isMounted) return;

    const currentPath = router.pathname;
    const currentQuery = router.query;

    if (currentPath === '/lands') {
      const type = currentQuery.type;
      if (type) {
        const matchedCategory = landCategories.find(
          (cat) => cat.href === `/lands?type=${type}`
        );
        if (matchedCategory) {
          setActiveLandCategory(matchedCategory.href);
        }
      } else {
        setActiveLandCategory('/lands');
      }
    } else {
      setActiveLandCategory('');
    }
  }, [router.pathname, router.query, isMounted]);

  // Check if a link is active
  const isActiveLink = (href) => {
    if (!isMounted) return false;

    if (href === '/') {
      return router.pathname === '/';
    }
    if (href.includes('#')) {
      const [path] = href.split('#');
      return router.pathname === path;
    }
    return router.pathname === href;
  };

  // Check if a land category is active
  const isActiveLandCategory = (href) => {
    return activeLandCategory === href;
  };

  // NOTE: these routes assume /measurement, /videos, /about, /contact, and
  // /lands (with ?type=...) exist in your project. If your actual page
  // files live at different paths (e.g. /measurement-tools,
  // /video-walkthroughs, /land-categories), update the hrefs below to match.
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/measurement', label: 'Measurements' },
    { href: '/videos', label: 'Videos' },
    { href: '/about', label: 'About' },
    // { href: '/contact', label: 'Contact' },
  ];

  // Don't render anything during SSR to avoid hydration mismatches
  if (!isMounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl shadow-lg border-b border-gray-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex-shrink-0">
              <Image src={Logo} alt="Logo" className="h-8 w-auto" />
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <motion.nav
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0
        }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
            ? 'bg-white/45 backdrop-blur-xl shadow-lg border-b border-gray-100/50'
            : 'bg-transparent border-b border-white/10'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              {isScrolled
                ?
                <Image
                  src={Logo}
                  alt="PGI Land Realtors – green & black logo"
                  className="h-12 w-auto"
                  priority
                />
                :
                <Image
                  src={whitelogo}
                  alt="PGI Land Realtors – green & black logo"
                  className="h-12 w-auto"
                  priority
                />

              }
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => {
                const isActive = isActiveLink(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg relative group ${isScrolled
                        ? isActive
                          ? 'text-emerald-600'
                          : 'text-gray-700 hover:text-emerald-600'
                        : isActive
                          ? 'text-white'
                          : 'text-white/90 hover:text-white'
                      }`}
                  >
                    {link.label}
                    <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-emerald-400 transition-all duration-300 ${isActive ? 'w-1/2' : 'w-0 group-hover:w-1/2'
                      }`}></span>
                  </Link>
                );
              })}

              {/* Land Categories Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsLandDropdownOpen(!isLandDropdownOpen)}
                  aria-haspopup="true"
                  aria-expanded={isLandDropdownOpen}
                  className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg relative group flex items-center gap-1 ${isScrolled
                      ? activeLandCategory
                        ? 'text-emerald-600 bg-emerald-50/80'
                        : 'text-gray-700 hover:text-emerald-600'
                      : activeLandCategory
                        ? 'text-white bg-white/20'
                        : 'text-white/90 hover:text-white'
                    } ${isLandDropdownOpen && isScrolled ? 'text-emerald-600 bg-emerald-50/80' : ''
                    } ${isLandDropdownOpen && !isScrolled ? 'bg-white/10 text-white' : ''
                    }`}
                >
                  <span>Lands</span>
                  <motion.span
                    animate={{ rotate: isLandDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block text-xs"
                  >
                    ▼
                  </motion.span>
                  <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-emerald-400 transition-all duration-300 ${activeLandCategory ? 'w-1/2' : 'w-0 group-hover:w-1/2'
                    }`}></span>
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isLandDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute top-full left-0 mt-2 w-64 rounded-xl shadow-2xl border py-2 overflow-hidden ${isScrolled
                          ? 'bg-white border-gray-100'
                          : 'bg-white/45 backdrop-blur-xl border-white/20'
                        }`}
                    >
                      <div className="max-h-96 overflow-y-auto custom-scrollbar">
                        {landCategories.map((category, index) => {
                          const isActive = isActiveLandCategory(category.href);
                          return (
                            <motion.div
                              key={category.href}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.03 }}
                            >
                              <Link
                                href={category.href}
                                className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors group ${isActive
                                    ? 'text-emerald-600 bg-emerald-50 font-medium'
                                    : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                                  }`}
                                onClick={() => {
                                  setIsLandDropdownOpen(false);
                                  setActiveLandCategory(category.href);
                                }}
                              >
                                <span className="text-lg">{category.icon}</span>
                                <span>{category.label}</span>
                                {isActive && (
                                  <span className="ml-auto text-emerald-500">✓</span>
                                )}
                                {!isActive && (
                                  <span className="ml-auto text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                    →
                                  </span>
                                )}
                              </Link>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden sm:flex items-center gap-2 md:gap-3">
              {/* <motion.button
                className={`px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-medium transition-colors rounded-lg border ${
                  isScrolled
                    ? 'text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border-emerald-200'
                    : 'text-white/90 hover:text-white border-white/30 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLoginOpen(true)}
              >
                Login
              </motion.button> */}
              <Link href="/contact">
              <motion.button
                className={`px-4 sm:px-5 py-1.5 sm:py-2 text-sm font-bold text-white rounded-lg shadow-md transition-all ${isScrolled
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:shadow-emerald-500/30'
                    : 'bg-gradient-to-r from-emerald-400 to-emerald-500 hover:shadow-emerald-500/30'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                 contact us
              </motion.button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors focus:outline-none ${isScrolled
                  ? 'hover:bg-gray-100'
                  : 'hover:bg-white/10'
                }`}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <motion.span
                  className={`block h-0.5 rounded-full transition-all duration-300 ${isScrolled ? 'bg-gray-700' : 'bg-white'
                    } ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                    }`}
                />
                <motion.span
                  className={`block h-0.5 rounded-full transition-all duration-300 ${isScrolled ? 'bg-gray-700' : 'bg-white'
                    } ${isMobileMenuOpen ? 'opacity-0' : ''
                    }`}
                />
                <motion.span
                  className={`block h-0.5 rounded-full transition-all duration-300 ${isScrolled ? 'bg-gray-700' : 'bg-white'
                    } ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                    }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className={`lg:hidden border-t ${isScrolled
                  ? 'bg-white/95 backdrop-blur-xl border-gray-100'
                  : 'bg-black/80 backdrop-blur-xl border-white/10'
                }`}
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => {
                  const isActive = isActiveLink(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors ${isScrolled
                          ? isActive
                            ? 'text-emerald-600 bg-emerald-50'
                            : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                          : isActive
                            ? 'text-white bg-white/20'
                            : 'text-white/90 hover:text-white hover:bg-white/10'
                        }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                {/* Mobile Land Categories Dropdown */}
                <div className="mt-1" ref={mobileDropdownRef}>
                  <button
                    onClick={() => setIsMobileLandDropdownOpen(!isMobileLandDropdownOpen)}
                    aria-expanded={isMobileLandDropdownOpen}
                    className={`flex items-center justify-between w-full px-4 py-3 text-base font-medium rounded-lg transition-colors ${isScrolled
                        ? activeLandCategory
                          ? 'text-emerald-600 bg-emerald-50'
                          : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                        : activeLandCategory
                          ? 'text-white bg-white/20'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    <span>📂 Land Categories</span>
                    <motion.span
                      animate={{ rotate: isMobileLandDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-sm"
                    >
                      ▼
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {isMobileLandDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`ml-4 pl-2 border-l-2 ${isScrolled ? 'border-emerald-200' : 'border-emerald-400/30'
                          } overflow-hidden`}
                      >
                        {landCategories.map((category) => {
                          const isActive = isActiveLandCategory(category.href);
                          return (
                            <Link
                              key={category.href}
                              href={category.href}
                              className={`flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-colors ${isScrolled
                                  ? isActive
                                    ? 'text-emerald-600 bg-emerald-50 font-medium'
                                    : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                                  : isActive
                                    ? 'text-white bg-white/20'
                                    : 'text-white/80 hover:text-white hover:bg-white/10'
                                }`}
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsMobileLandDropdownOpen(false);
                                setActiveLandCategory(category.href);
                              }}
                            >
                              <span>{category.icon}</span>
                              <span>{category.label}</span>
                              {isActive && (
                                <span className="ml-auto text-emerald-500">✓</span>
                              )}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Actions */}
                <div className={`pt-4 mt-4 border-t space-y-2 ${isScrolled ? 'border-gray-100' : 'border-white/10'
                  }`}>
                  {/* <button
                    className={`w-full px-4 py-3 text-base font-medium rounded-lg border transition-colors ${
                      isScrolled
                        ? 'text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border-emerald-200'
                        : 'text-white/90 hover:text-white border-white/30 hover:bg-white/10'
                    }`}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsLoginOpen(true);
                    }}
                  >
                    Login
                  </button> */}
                  <button
                    className="w-full px-4 py-3 text-base font-bold text-white bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg shadow-md hover:shadow-emerald-500/30 transition-all"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsRegisterOpen(true);
                    }}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Modals - dynamically imported with ssr: false */}
      {isMounted && (
        <>
          <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
          <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
        </>
      )}
    </>
  );
}