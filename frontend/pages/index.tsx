import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import FeaturedLandPlotsSection from '../components/Featuredlandplotssection';
import Link from 'next/link';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import CTASection from '../components/Ctasection';
import VideoShowcaseSection from '../components/Videoshowcasesection';

// Custom hook for scroll animations
const useScrollAnimation = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.1,
    margin: "-50px"
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return { ref, controls, inView };
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 70 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.6, -0.05, 0.01, 0.99],
      staggerChildren: 0.15
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      type: "spring",
      stiffness: 120,
      damping: 15
    }
  }
};


// Measurement Tools Data
const measurementTools = [
  {
    name: 'Area Calculator',
    icon: '📐',
    description: 'Calculate land area in sq.ft, sq.yds, acres, and hectares',
    features: ['Multiple Units', 'Auto Conversion', 'Shape Recognition']
  },
  {
    name: 'Distance Measurement',
    icon: '📏',
    description: 'Measure distances, perimeters, and boundaries precisely',
    features: ['GPS Integration', 'Map Overlay', '3D Terrain']
  },
  {
    name: 'Elevation Analysis',
    icon: '⛰️',
    description: 'Analyze terrain elevation, slopes, and grading requirements',
    features: ['Contour Mapping', 'Slope Analysis', '3D Visualization']
  },
  {
    name: 'Construction Estimator',
    icon: '🏗️',
    description: 'Estimate construction costs, materials, and timelines',
    features: ['Auto Calculation', 'Material List', 'Cost Breakdown']
  }
];


const landTypes = [
  'Residential Land',
  'Commercial Land',
  'Agricultural Land',
  'Industrial Land',
  'Mixed-Use Land',
  'Plotted Development',
  'Farm Land',
  'Hill View Plot'
];

const landZoning = [
  'Residential R-1',
  'Residential R-2',
  'Residential R-3',
  'Commercial C-1',
  'Commercial C-2',
  'Industrial I-1',
  'Industrial I-2',
  'Agricultural Zone',
  'Mixed-Use Zone',
  'Special Zone'
];

const landFeatures = [
  'Corner Plot',
  'Wide Road Access',
  'Water Supply',
  'Electricity Connection',
  'Drainage System',
  'Level Ground',
  'Fencing Available',
  'Construction Permitted',
  'Approved Layout',
  'Clear Title',
  'No Encroachment',
  'DTCP Approved',
  'RERA Registered',
  'Bank Approved',
  'Near Highway'
];

const landUsefulies = [
  'Residential Construction',
  'Commercial Building',
  'Agricultural Cultivation',
  'Industrial Setup',
  'Warehouse Development',
  'Mixed-Use Development',
  'Community Development',
  'Educational Institution',
  'Healthcare Facility',
  'Hospitality Project'
];


const landCategoryLinks = [
  { label: 'Residential Land', href: '/land/residential-land', icon: '🏠' },
  { label: 'Commercial Land', href: '/land/commercial-land', icon: '🏢' },
  { label: 'Agricultural Land', href: '/land/agricultural-land', icon: '🌾' },
  { label: 'Industrial Land', href: '/land/industrial-land', icon: '🏭' },
  { label: 'Mixed-Use Land', href: '/land/mixed-use-land', icon: '🏘️' },
  { label: 'Plotted Development', href: '/land/plotted-development', icon: '📐' },
  { label: 'Farm Land', href: '/land/farm-land', icon: '🌿' },
  { label: 'Hill View Plot', href: '/land/hill-view-plot', icon: '⛰️' }
];

// DUMMY LAND PLOTS DATA (replace with real API data later)
const dummyLandPlots = [
  {
    id: 1,
    title: 'Green Meadows Residential Plot',
    location: '',
    type: 'Residential Land',
    zoning: 'Residential R-1',
    facing: 'North-East',
    area: 240,
    price: 8500000,
    verified: 'Verified',
    icon: '🏠'
  },
  {
    id: 2,
    title: 'Riverfront Commercial Plot',
    location: 'Sector 62, Noida',
    type: 'Commercial Land',
    zoning: 'Commercial C-1',
    facing: 'East',
    area: 600,
    price: 45000000,
    verified: 'Approved',
    icon: '🏢'
  },
  {
    id: 3,
    title: 'Fertile Agricultural Land',
    location: 'Devanahalli, Bangalore',
    type: 'Agricultural Land',
    zoning: 'Agricultural Zone',
    facing: 'South',
    area: 1000,
    price: 12000000,
    verified: 'Verified',
    icon: '🌾'
  },
  {
    id: 4,
    title: 'Industrial Warehouse Plot',
    location: '',
    type: 'Industrial Land',
    zoning: 'Industrial I-1',
    facing: 'West',
    area: 800,
    price: 32000000,
    verified: 'RERA Registered' as any,
    icon: '🏭'
  },
  {
    id: 5,
    title: 'Mixed-Use Development Plot',
    location: 'Gachibowli, Hyderabad',
    type: 'Mixed-Use Land',
    zoning: 'Mixed-Use Zone',
    facing: 'North',
    area: 500,
    price: 27500000,
    verified: 'Approved',
    icon: '🏘️'
  },
  {
    id: 6,
    title: 'Hill View Farm Plot',
    location: '',
    type: 'Hill View Plot',
    zoning: 'Special Zone',
    facing: 'North-West',
    area: 350,
    price: 9800000,
    verified: 'Pending',
    icon: '⛰️'
  },
  {
    id: 7,
    title: 'Premium Corner Plot',
    location: 'Kondapur, Hyderabad',
    type: 'Corner Plot',
    zoning: 'Residential R-2',
    facing: 'South-East',
    area: 180,
    price: 6200000,
    verified: 'Verified',
    icon: '📍'
  },
  {
    id: 8,
    title: 'Waterfront Vacation Land',
    location: 'Alibaug, Maharashtra',
    type: 'Waterfront Land',
    zoning: 'Special Zone',
    facing: 'West',
    area: 420,
    price: 15600000,
    verified: 'Verified',
    icon: '🏖️'
  },
  {
    id: 9,
    title: 'Plotted Layout Development',
    location: 'Sarjapur Road, Bangalore',
    type: 'Plotted Development',
    zoning: 'Residential R-3',
    facing: 'North',
    area: 300,
    price: 11000000,
    verified: 'DTCP Approved' as any,
    icon: '📐'
  },
  {
    id: 10,
    title: 'Organic Farm Land',
    location: 'Coimbatore, Tamil Nadu',
    type: 'Farm Land',
    zoning: 'Agricultural Zone',
    facing: 'South-West',
    area: 1500,
    price: 9000000,
    verified: 'Verified',
    icon: '🌿'
  }
];

const formatPrice = (price: number) => {
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`;
  return `₹${price.toLocaleString('en-IN')}`;
};


export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [activeVideo, setActiveVideo] = useState(0);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLandType, setSelectedLandType] = useState('All');
  const [selectedZoning, setSelectedZoning] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000000 });
  const [areaRange, setAreaRange] = useState({ min: 0, max: 1000 });
  const [selectedFacing, setSelectedFacing] = useState('All');
  const [selectedFeature, setSelectedFeature] = useState('All');
  const [selectedUse, setSelectedUse] = useState('All');
  const [showEMICalculator, setShowEMICalculator] = useState(false);
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);
  const [verificationStatus, setVerificationStatus] = useState('All');
  const [activeTour, setActiveTour] = useState(0);
  const [showMeasurement, setShowMeasurement] = useState(false);
  const [measurementType, setMeasurementType] = useState('area');
  const [measurementInputs, setMeasurementInputs] = useState({
    length: '',
    width: '',
    height: '',
    unit: 'ft'
  });
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const videoRef = useRef(null);

  // Tracks whether we're on a small/mobile viewport — used by the hero
  // section to switch between the desktop 3D/scattered layout and the
  // simplified mobile layout (top thumbnail row + plain fade background).
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 640px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // SEARCH STATE
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof dummyLandPlots>([]);
  const resultsRef = useRef<HTMLDivElement>(null);

  // EMI Calculator
  const calculateEMI = () => {
    const monthlyRate = interestRate / 100 / 12;
    const months = loanTenure * 12;
    const emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  // Measurement Calculator
  const calculateMeasurements = () => {
    const { length, width, height, unit } = measurementInputs;
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;

    const area = l * w;
    const perimeter = 2 * (l + w);
    const volume = l * w * h;

    return {
      area: area.toFixed(2),
      perimeter: perimeter.toFixed(2),
      volume: volume.toFixed(2),
      unit: unit
    };
  };

  // Run search against dummy data using the current filter state
  const handleSearch = () => {
    setIsSearching(true);
    setHasSearched(true);

    const query = searchQuery.trim().toLowerCase();

    const results = dummyLandPlots.filter((plot) => {
      const matchesQuery =
        query === '' ||
        plot.title.toLowerCase().includes(query) ||
        plot.location.toLowerCase().includes(query);

      const matchesType = selectedLandType === 'All' || plot.type === selectedLandType;
      const matchesZoning = selectedZoning === 'All' || plot.zoning === selectedZoning;
      const matchesFacing = selectedFacing === 'All' || plot.facing === selectedFacing;
      const matchesStatus = verificationStatus === 'All' || plot.verified === verificationStatus;
      const matchesArea = plot.area >= areaRange.min && plot.area <= areaRange.max;

      return matchesQuery && matchesType && matchesZoning && matchesFacing && matchesStatus && matchesArea;
    });

    // simulate a short network delay so the loading state is visible
    setTimeout(() => {
      setSearchResults(results);
      setIsSearching(false);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 400);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedLandType('All');
    setSelectedZoning('All');
    setSelectedFacing('All');
    setVerificationStatus('All');
    setAreaRange({ min: 0, max: 1000 });
    setHasSearched(false);
    setSearchResults([]);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const heroVideos = [
    '/hero3.jpg',
    '/hero5.png',
    '/hero_8.jpeg',
    '/hero_9.jpeg',
    '/hero_10.jpeg',
  ];

  const facings = ['All', 'North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'];

useEffect(() => {
  setMounted(true);

  // agar URL mein #search hash hai (kisi doosre page se navigate karke aaye ho)
  if (window.location.hash === '#search') {
    // Lenis ready hone ka thoda wait karo
    const timer = setTimeout(() => {
      const lenis = (window as any).lenis;
      const target = document.getElementById('search');
      if (lenis && target) {
        lenis.scrollTo(target, { offset: -20, duration: 1.5 });
      } else if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
    return () => clearTimeout(timer);
  }
}, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVideo((prev) => (prev + 1) % heroVideos.length);
    }, 4000); // har 4 second me image change hogi
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Head>
        <title>PGI Land Realtors - India's Premier Land Aggregator with Advanced Measurement Tools</title>
        <meta name="description" content="Find your perfect land plot with advanced measurement tools, 360° virtual tours, and real-time construction monitoring. India's leading land aggregator platform." />
        <meta property="og:title" content="PGI Land Realtors - Advanced Land Aggregation Platform" />
        <meta property="og:description" content="Complete land solutions with measurement tools, virtual tours, and project monitoring." />
        <link rel="icon" href="/logo_fev.png" />
      </Head>

      <main className="min-h-screen bg-white text-gray-800 transition-colors duration-300">

        {/* HERO SECTION */}
        <motion.section
          className="sticky top-0 z-10 pt-24 min-h-screen flex items-center justify-center overflow-hidden bg-black"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          <div className="absolute inset-0 z-0 overflow-hidden bg-black">
            <AnimatePresence>
              {/* On mobile: plain fade only. The old corner-zoom entrance
                  (scale 0.15 -> 1 starting bottom-right) was what made a small
                  "extra" image visible at the bottom corner on narrow screens,
                  overlapping the thumbnail stack / text. Desktop keeps the
                  original zoom-in-from-corner effect untouched. */}
              <motion.img
                key={activeVideo}
                initial={
                  isMobile
                    ? { opacity: 0 }
                    : { opacity: 1, scale: 0.15, x: '38%', y: '38%' }
                }
                animate={
                  isMobile
                    ? { opacity: 1 }
                    : { opacity: 1, scale: 1, x: 0, y: 0 }
                }
                exit={{ opacity: 0 }}
                transition={
                  isMobile
                    ? { opacity: { duration: 0.6, ease: 'easeOut' } }
                    : {
                        scale: { duration: 1.2, ease: [0.34, 1.56, 0.64, 1] },
                        x: { duration: 1.2, ease: [0.34, 1.56, 0.64, 1] },
                        y: { duration: 1.2, ease: [0.34, 1.56, 0.64, 1] },
                        opacity: { duration: 0.8, delay: 0.6 },
                      }
                }
                style={{ transformOrigin: 'bottom right' }}
                className="absolute inset-0 w-full h-full object-cover"
                src={heroVideos[activeVideo]}
                alt="Hero background"
              />
            </AnimatePresence>
          </div>

          {/* SEARCH YOUR LAND SECTION */}
          <div className="relative z-20 text-center px-4 max-w-6xl mx-auto w-full" />

          {/* LEFT CORNER HEADING + DESCRIPTION TEXT */}
          <motion.div
            className="absolute bottom-10 left-4 sm:left-8 md:left-12 z-20 max-w-md text-left"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-400 to-emerald-500"
                animate={{ backgroundPosition: ['0%', '200%', '0%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                style={{ backgroundSize: '200%' }}
              >
                India's Premier
              </motion.span>
              <motion.span
                className="block text-white drop-shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1, type: 'spring' }}
              >
                Land Aggregator
              </motion.span>
            </motion.h1>

            <motion.div
              className="backdrop-blur-md bg-black/30 border border-white/10 rounded-xl p-5"
              whileHover={{ scale: 1.02, borderColor: 'rgba(16,185,129,0.4)' }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <motion.div
                className="w-10 h-1 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full mb-3"
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              />
              <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                Discover 5,000+ verified land plots with advanced measurement tools, 360° virtual tours,
                and real-time construction monitoring across 50+ cities.
              </p>
            </motion.div>
          </motion.div>

          {/* PHOTO STACK
              Mobile: simple horizontal row pinned near the TOP (below the pt-24
              header spacing), no absolute overlap stacking, no rotation — so it
              never collides with the text block anchored at the bottom.
              Desktop: unchanged messy scattered stack, bottom-right corner. */}
          <motion.div
            className="absolute bottom-44 sm:bottom-10 right-4 sm:right-8 md:right-16 z-20 w-28 h-20 md:w-36 md:h-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            {heroVideos.map((img, i) => {
              // har image ko alag rotation aur offset dena taaki messy stack jaisa dikhe
              const rotations = [-8, 6, -4, 10, -12, 4, -6, 8];
              const offsetsX = [0, 6, -5, 8, -8, 4, -3, 6];
              const offsetsY = [0, -4, 5, -6, 3, -5, 6, -3];
              const rotate = rotations[i % rotations.length];
              const offsetX = offsetsX[i % offsetsX.length];
              const offsetY = offsetsY[i % offsetsY.length];
              const isActive = i === activeVideo;

              return (
                <motion.div
                  key={`stack-${i}`}
                  className="absolute inset-0 rounded-lg overflow-hidden border-2 shadow-2xl"
                  style={{
                    borderColor: isActive ? 'rgba(16,185,129,0.8)' : 'rgba(255,255,255,0.3)',
                    zIndex: isActive ? heroVideos.length + 1 : i,
                  }}
                  initial={{ opacity: 0, rotate, x: offsetX, y: offsetY, scale: 0.7 }}
                  animate={{
                    opacity: 1,
                    rotate,
                    x: offsetX,
                    y: offsetY,
                    scale: isActive ? 1.08 : 1,
                  }}
                  transition={{ duration: 0.6, delay: 1.6 + i * 0.1, ease: 'easeOut' }}
                  whileHover={{ scale: 1.15, rotate: 0, zIndex: heroVideos.length + 2 }}
                >
                  <img
                    src={img}
                    alt={`Preview ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              );
            })}
          </motion.div>

          {/* Decorative floating particles */}
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-emerald-400/30"
                animate={{
                  x: [
                    Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                    Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  ],
                  y: [
                    Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                    Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                  ],
                  opacity: [0, 1, 0],
                  scale: [0, 2, 0],
                }}
                transition={{
                  duration: 15 + Math.random() * 10,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: Math.random() * 5,
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
        </motion.section>

        {/* SEARCH YOUR LAND SECTION */}
        <section
          className="sticky top-0 z-20 min-h-screen py-16 md:py-20 bg-gradient-to-b from-[#0A1A12] via-[#0F281D] to-[#0A1A12] overflow-hidden"
          id = "search"
        >
          {/* Premium grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `
        linear-gradient(to right, #ffffff 1px, transparent 1px),
        linear-gradient(to bottom, #ffffff 1px, transparent 1px)
      `,
              backgroundSize: '60px 60px'
            }}
          />

          {/* Diagonal accent lines */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, #10b981 0px, #10b981 1px, transparent 1px, transparent 20px)',
              backgroundSize: '30px 30px'
            }} />
          </div>

          {/* Multiple glow layers */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-emerald-500/15 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Corner accent markers */}
          <div className="absolute top-8 left-8 w-10 h-10 border-t-2 border-l-2 border-emerald-400/50 hidden lg:block" />
          <div className="absolute top-8 right-8 w-10 h-10 border-t-2 border-r-2 border-emerald-400/50 hidden lg:block" />
          <div className="absolute bottom-8 left-8 w-10 h-10 border-b-2 border-l-2 border-emerald-400/50 hidden lg:block" />
          <div className="absolute bottom-8 right-8 w-10 h-10 border-b-2 border-r-2 border-emerald-400/50 hidden lg:block" />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 md:mb-12" >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-emerald-300 font-semibold backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50" />
                Premium Land Locator
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mt-5 mb-3 text-white leading-tight">
                Search Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-400 to-emerald-300 animate-gradient">
                  Dream Land
                </span>
              </h2>
              <p className="text-white/50 max-w-xl mx-auto text-xs md:text-sm lg:text-base">
                Discover premium plots with precision — filter by location, type, zoning, and verification status.
              </p>
            </div>

            {/* Enhanced SEARCH CARD with white accent */}
            <motion.div
              className="relative max-w-4xl mx-auto rounded-[28px] md:rounded-[32px] p-[1.5px] md:p-[2px] bg-gradient-to-br from-emerald-400/40 via-white/15 to-transparent shadow-2xl shadow-emerald-500/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="rounded-[27px] md:rounded-[30px] bg-[#0F281D]/95 backdrop-blur-2xl p-5 md:p-7 lg:p-8 border border-white/10 shadow-inner shadow-white/5">
                {/* Main search row */}
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] lg:grid-cols-[1.4fr_1fr_auto] gap-2.5 md:gap-3">
                  <div className="relative flex items-center group">
                    <span className="absolute left-3 md:left-4 text-emerald-400 text-base md:text-lg">📍</span>
                    <input
                      type="text"
                      placeholder="Enter city or locality..."
                      className="w-full pl-9 md:pl-12 pr-3 md:pr-4 py-3 md:py-3.5 lg:py-4 rounded-xl md:rounded-2xl bg-white/5 text-white placeholder-white/30 text-xs md:text-sm border border-white/10 focus:border-emerald-400/60 focus:bg-white/10 outline-none transition-all group-hover:border-white/20"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleSearchKeyDown}
                    />
                    <div className="absolute right-2 md:right-3 text-white/20 text-[10px] md:text-xs hidden sm:block">⌘K</div>
                  </div>

                  <div className="relative">
                    <select
                      className="w-full px-3 md:px-4 py-3 md:py-3.5 lg:py-4 rounded-xl md:rounded-2xl bg-white/5 text-white text-xs md:text-sm border border-white/10 focus:border-emerald-400/60 focus:bg-white/10 outline-none transition-all appearance-none cursor-pointer"
                      value={selectedLandType}
                      onChange={(e) => setSelectedLandType(e.target.value)}
                    >
                      <option value="All" className="text-gray-900 bg-white">🏠 All Land Types</option>
                      {landTypes.map(type => (
                        <option key={type} value={type} className="text-gray-900 bg-white">{type}</option>
                      ))}
                    </select>
                    <div className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 text-white/30 text-[10px] md:text-xs">▼</div>
                  </div>

                  <motion.button
                    className="px-5 md:px-7 lg:px-8 py-3 md:py-3.5 lg:py-4 bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-400 bg-[length:200%_100%] text-[#0A1A12] rounded-xl md:rounded-2xl font-bold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-400/50 transition-all whitespace-nowrap text-xs md:text-sm hover:bg-right animate-shimmer disabled:opacity-60 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSearch}
                    disabled={isSearching}
                  >
                    {isSearching ? 'Searching…' : 'Find Now →'}
                  </motion.button>
                </div>

                {/* Filter chips */}
                <div className="flex flex-wrap gap-1.5 md:gap-2 mt-4 md:mt-5 pt-4 md:pt-5 border-t border-white/10">
                  <select
                    className="px-3 md:px-3.5 py-1.5 md:py-2 bg-white/5 rounded-full text-emerald-100/80 text-[10px] md:text-xs font-medium border border-white/10 outline-none cursor-pointer hover:border-emerald-400/50 hover:bg-white/10 transition-all backdrop-blur-sm"
                    value={selectedZoning}
                    onChange={(e) => setSelectedZoning(e.target.value)}
                  >
                    <option value="All" className="text-gray-900 bg-white">📐 Zoning: All</option>
                    {landZoning.map(zone => (
                      <option key={zone} value={zone} className="text-gray-900 bg-white">{zone}</option>
                    ))}
                  </select>

                  <select
                    className="px-3 md:px-3.5 py-1.5 md:py-2 bg-white/5 rounded-full text-emerald-100/80 text-[10px] md:text-xs font-medium border border-white/10 outline-none cursor-pointer hover:border-emerald-400/50 hover:bg-white/10 transition-all backdrop-blur-sm"
                    value={selectedFacing}
                    onChange={(e) => setSelectedFacing(e.target.value)}
                  >
                    <option value="All" className="text-gray-900 bg-white">🧭 Facing: All</option>
                    {facings.slice(1).map(facing => (
                      <option key={facing} value={facing} className="text-gray-900 bg-white">{facing}</option>
                    ))}
                  </select>

                  <select
                    className="px-3 md:px-3.5 py-1.5 md:py-2 bg-white/5 rounded-full text-emerald-100/80 text-[10px] md:text-xs font-medium border border-white/10 outline-none cursor-pointer hover:border-emerald-400/50 hover:bg-white/10 transition-all backdrop-blur-sm"
                    value={verificationStatus}
                    onChange={(e) => setVerificationStatus(e.target.value)}
                  >
                    <option value="All" className="text-gray-900 bg-white">✅ Status: All</option>
                    <option value="Verified" className="text-gray-900 bg-white">✅ Verified</option>
                    <option value="Approved" className="text-gray-900 bg-white">📋 Approved</option>
                    <option value="Pending" className="text-gray-900 bg-white">⏳ Pending</option>
                  </select>

                  <motion.span
                    className="px-3 md:px-3.5 py-1.5 md:py-2 bg-emerald-400/10 rounded-full text-emerald-300 text-[10px] md:text-xs font-medium border border-emerald-400/30 cursor-pointer flex items-center gap-1 backdrop-blur-sm"
                    whileHover={{ scale: 1.05 }}
                  >
                    📊 {areaRange.min}–{areaRange.max} sq.yds
                  </motion.span>

                  {(searchQuery || selectedLandType !== 'All' || selectedZoning !== 'All' || selectedFacing !== 'All' || verificationStatus !== 'All') && (
                    <motion.button
                      onClick={handleResetFilters}
                      className="px-3 md:px-3.5 py-1.5 md:py-2 bg-red-400/10 rounded-full text-red-300 text-[10px] md:text-xs font-medium border border-red-400/30 cursor-pointer flex items-center gap-1 backdrop-blur-sm hover:bg-red-400/20 transition-all"
                      whileHover={{ scale: 1.05 }}
                    >
                      ✕ Clear Filters
                    </motion.button>
                  )}
                </div>

              </div>
            </motion.div>

            {/* Enhanced Stats ticker */}
            <motion.div
              className="flex flex-wrap justify-center divide-x divide-white/10 max-w-3xl mx-auto mt-10 md:mt-14 rounded-xl md:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 md:p-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {[
                { label: 'Land Plots', value: '5,000+', icon: '🏗️' },
                { label: 'Cities', value: '50+', icon: '🌆' },
                { label: 'Verified Owners', value: '1,200+', icon: '👤' },
                { label: 'Happy Buyers', value: '15,000+', icon: '⭐' }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="text-center px-3 md:px-6 lg:px-10 first:pl-0 last:pr-0 py-1"
                  whileHover={{ y: -3 }}
                >
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-emerald-300">{stat.value}</div>
                  <div className="text-[9px] md:text-[11px] uppercase tracking-widest text-white/40 mt-0.5 md:mt-1 flex items-center justify-center gap-1">
                    <span className="text-xs md:text-sm">{stat.icon}</span> {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* SEARCH RESULTS */}
            <div ref={resultsRef} className="max-w-6xl mx-auto mt-12 md:mt-16">
              <AnimatePresence mode="wait">
                {isSearching && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center py-16"
                  >
                    <div className="flex items-center gap-3 text-emerald-300 text-sm">
                      <span className="w-5 h-5 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
                      Searching for plots...
                    </div>
                  </motion.div>
                )}

                {!isSearching && hasSearched && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center justify-between mb-6 px-1">
                      <h3 className="text-white text-lg md:text-xl font-bold">
                        {searchResults.length > 0
                          ? `${searchResults.length} Plot${searchResults.length > 1 ? 's' : ''} Found`
                          : 'No Plots Found'}
                      </h3>
                      {searchResults.length > 0 && (
                        <span className="text-white/40 text-xs">Showing demo data</span>
                      )}
                    </div>

                    {searchResults.length === 0 ? (
                      <div className="text-center py-14 md:py-16 bg-white/5 border border-white/10 rounded-2xl">
                        <div className="text-4xl mb-3">🔍</div>
                        <p className="text-white/60 text-sm mb-4">
                          No plots match your filters. Try adjusting your search.
                        </p>
                        <motion.button
                          onClick={handleResetFilters}
                          className="px-5 py-2.5 bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 rounded-xl text-xs font-medium hover:bg-emerald-400/20 transition-all"
                          whileHover={{ scale: 1.05 }}
                        >
                          Clear Filters
                        </motion.button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                        {searchResults.map((plot, i) => (
                          <motion.div
                            key={plot.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.06, duration: 0.4 }}
                            whileHover={{ y: -4, borderColor: 'rgba(16,185,129,0.5)' }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm transition-all"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <span className="text-3xl">{plot.icon}</span>
                              <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-400/10 text-emerald-300 border border-emerald-400/30 font-medium">
                                {plot.verified}
                              </span>
                            </div>
                            <h4 className="text-white font-bold text-sm md:text-base mb-1">{plot.title}</h4>
                            <p className="text-white/40 text-xs mb-3 flex items-center gap-1">
                              📍 {plot.location}
                            </p>
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              <span className="text-[10px] px-2 py-1 bg-white/5 text-white/60 rounded-full border border-white/10">
                                {plot.type}
                              </span>
                              <span className="text-[10px] px-2 py-1 bg-white/5 text-white/60 rounded-full border border-white/10">
                                🧭 {plot.facing}
                              </span>
                              <span className="text-[10px] px-2 py-1 bg-white/5 text-white/60 rounded-full border border-white/10">
                                📊 {plot.area} sq.yds
                              </span>
                            </div>
                            <div className="flex items-center justify-between pt-3 border-t border-white/10">
                              <span className="text-emerald-300 font-bold text-sm md:text-base">
                                {formatPrice(plot.price)}
                              </span>
                              <motion.button
                                className="text-[11px] px-3 py-1.5 bg-emerald-400 text-[#0A1A12] rounded-lg font-semibold"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                View Details
                              </motion.button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Add custom animations to your global CSS */}
        <style jsx>{`
  @keyframes shimmer {
    0% { background-position: 200% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  .animate-shimmer {
    animation: shimmer 3s ease-in-out infinite;
  }
  
  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient 4s ease-in-out infinite;
  }
`}</style>

        {/* FEATURED LAND PLOTS SECTION with Measurements */}
        <motion.section
          className="relative bg-white z-30">
          <FeaturedLandPlotsSection />

        </motion.section>

        {/* ADVANCED MEASUREMENT TOOLS SECTION */}
        <motion.section
          className="relative bg-white z-30"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-16" variants={fadeInUp}>
              <motion.span
                className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-green-500/10 border-2 border-emerald-200 text-xs uppercase tracking-[0.4em] text-emerald-600 font-bold"
              >
                🛠️ Advanced Tools
              </motion.span>
              <motion.h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4">
                <span className="text-gray-900">Land </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700">
                  Measurement & Analysis
                </span>
              </motion.h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Professional measurement tools for accurate land analysis and construction planning
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Measurement Tools */}
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {measurementTools.map((tool, i) => (
                    <motion.div
                      key={i}
                      className="p-6 bg-white rounded-2xl border-2 border-gray-100 hover:border-emerald-400 transition-all cursor-pointer"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 10px 40px rgba(16,185,129,0.15)"
                      }}
                    >
                      <div className="text-4xl mb-3">{tool.icon}</div>
                      <h4 className="text-lg font-bold mb-2">{tool.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{tool.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {tool.features.map((feature, j) => (
                          <span key={j} className="text-[10px] px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Live Measurement Calculator */}
              <motion.div
                className="bg-white rounded-3xl p-8 border-2 border-emerald-200 shadow-xl"
                variants={scaleIn}
              >
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span className="text-3xl">📐</span>Measurement Tool
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Select Measurement Type</label>
                    <div className="flex gap-2">
                      {['area', 'perimeter', 'volume'].map((type) => (
                        <motion.button
                          key={type}
                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${measurementType === type
                            ? 'bg-emerald-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setMeasurementType(type)}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-600 block">Length (ft)</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-emerald-500 outline-none"
                        value={measurementInputs.length}
                        onChange={(e) => setMeasurementInputs({ ...measurementInputs, length: e.target.value })}
                        placeholder="Enter length"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 block">Width (ft)</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-emerald-500 outline-none"
                        value={measurementInputs.width}
                        onChange={(e) => setMeasurementInputs({ ...measurementInputs, width: e.target.value })}
                        placeholder="Enter width"
                      />
                    </div>
                  </div>

                  {measurementType === 'volume' && (
                    <div>
                      <label className="text-xs text-gray-600 block">Height (ft)</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-emerald-500 outline-none"
                        value={measurementInputs.height}
                        onChange={(e) => setMeasurementInputs({ ...measurementInputs, height: e.target.value })}
                        placeholder="Enter height"
                      />
                    </div>
                  )}

                  <motion.div
                    className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-2xl border border-emerald-200"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Calculation Results</h4>
                    {(() => {
                      const result = calculateMeasurements();
                      return (
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Area:</span>
                            <span className="font-bold text-emerald-600">{result.area} sq.{result.unit}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Perimeter:</span>
                            <span className="font-bold text-emerald-600">{result.perimeter} {result.unit}</span>
                          </div>
                          {measurementType === 'volume' && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Volume:</span>
                              <span className="font-bold text-emerald-600">{result.volume} cu.{result.unit}</span>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </motion.div>
                  <div>
                    <Link href="/measurement">
                      <motion.button
                        className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-bold"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >

                        Go To Live Measurment Tool

                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* VIDEO WALKTHROUGH SECTION */}
        <motion.section
          className="relative bg-white z-30"
        >
          <VideoShowcaseSection />
        </motion.section>

        {/* LAND TYPES & ZONING SECTION */}
        <motion.section
          className="relative py-32 bg-white z-30"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-16" variants={fadeInUp}>
              <motion.span
                className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-green-500/10 border-2 border-emerald-200 text-xs uppercase tracking-[0.4em] text-emerald-600 font-bold"
                animate={{
                  boxShadow: ["0 0 0 0 rgba(16,185,129,0.2)", "0 0 20px 10px rgba(16,185,129,0.1)", "0 0 0 0 rgba(16,185,129,0.2)"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Land Categories
              </motion.span>
              <motion.h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4">
                Find Land by{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700">
                  Type & Zoning
                </span>
              </motion.h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Browse through various land categories and zoning classifications
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {landCategoryLinks.map((item, i) => (
                <Link key={i} href={item.href}>
                  <motion.div
                    className="p-4 bg-white rounded-2xl border-2 border-gray-100 text-center group hover:border-emerald-400 transition-all cursor-pointer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    viewport={{ once: true }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 40px rgba(16,185,129,0.15)"
                    }}
                  >
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <h4 className="text-sm font-bold text-gray-900">{item.label}</h4>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </motion.section>

        {/* LAND USEFULIES & FEATURES */}
        <motion.section
          className="relative bg-white z-30"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-16" variants={fadeInUp}>
              <motion.span
                className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-green-500/10 border-2 border-emerald-200 text-xs uppercase tracking-[0.4em] text-emerald-600 font-bold"
              >
                Key Features
              </motion.span>
              <motion.h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4">
                <span className="text-gray-900">Land </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700">
                  Features & Usages
                </span>
              </motion.h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span className="text-3xl">✅</span> Land Features
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {landFeatures.map((feature, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-all"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-emerald-500">✓</span>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span className="text-3xl">🏗️</span> Useful For
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {landUsefulies.map((use, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-all"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-emerald-500">✦</span>
                      <span className="text-sm text-gray-700">{use}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* HOW TO BUY LAND SECTION */}
        <motion.section
          className="relative py-32 bg-white z-30"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-16" variants={fadeInUp}>
              <motion.span
                className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-green-500/10 border-2 border-emerald-200 text-xs uppercase tracking-[0.4em] text-emerald-600 font-bold"
              >
                Step by Step Guide
              </motion.span>
              <motion.h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4">
                How to Buy{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700">
                  Land?
                </span>
              </motion.h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: '🔍',
                  title: 'Search & Filter',
                  description: 'Use our advanced filters to find land by type, zoning, price, area, and facing direction.'
                },
                {
                  icon: '📋',
                  title: 'Verify & Compare',
                  description: 'Check land verification status, legal documents, zoning regulations, and compare options.'
                },
                {
                  icon: '🤝',
                  title: 'Connect & Close',
                  description: 'Contact owners directly, schedule site visits, and get legal assistance for registration.'
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="relative p-8 bg-white rounded-3xl shadow-xl border border-gray-100 text-center group"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, boxShadow: "0 25px 60px rgba(16,185,129,0.15)" }}
                >
                  <div className="text-6xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* FAQ SECTION */}
        <FAQ />

        {/* WHY CHOOSE PGI LAND REALTORS */}
        <motion.section
          className="relative py-32 bg-white z-30"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-16" variants={fadeInUp}>
              <motion.span
                className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-green-500/10 border-2 border-emerald-200 text-xs uppercase tracking-[0.4em] text-emerald-600 font-bold"
              >
                Why Choose Us
              </motion.span>
              <motion.h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4">
                Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700">
                  PGI Land Realtors
                </span>
              </motion.h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: '🌳',
                  title: '5,000+ Verified Plots',
                  description: 'From 1,200+ trusted owners across 50+ cities in India'
                },
                {
                  icon: '📐',
                  title: 'Advanced Measurement Tools',
                  description: 'Precise land measurement, area calculation, and construction estimation'
                },
                {
                  icon: '🎥',
                  title: '360° Virtual Tours & Videos',
                  description: 'Immersive property tours and real-time project monitoring'
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="p-8 bg-gradient-to-br from-gray-50 to-white rounded-3xl border-2 border-gray-100 text-center group"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -10,
                    borderColor: '#10b981',
                    boxShadow: "0 25px 60px rgba(16,185,129,0.1)"
                  }}
                >
                  <motion.div
                    className="text-6xl mb-4"
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut"
                    }}
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* TESTIMONIALS */}
        <Testimonials />

        {/* CTA SECTION */}
        {/* <CTASection /> */}
        {/* FLOATING LIVE PREVIEW WIDGET */}
        <motion.div
          className="fixed bottom-6 right-6 z-50 hidden md:block group"
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: 0.5
          }}
          whileHover={{
            scale: 1.05,
            transition: { type: "spring", stiffness: 300 }
          }}
        >
          <motion.div
            className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl blur-xl opacity-40 -z-10"
            animate={{
              opacity: [0.4, 0.6, 0.4],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

      </main>
    </>
  );
}