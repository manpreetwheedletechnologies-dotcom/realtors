import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';

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

const floatingAnimation = {
  y: [0, -20, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const pulseAnimation = {
  scale: [1, 1.08, 1],
  transition: {
    duration: 2.5,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const shimmerAnimation = {
  backgroundPosition: ["0%", "200%", "0%"],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "linear"
  }
};

// Land/Lot listing data
const featuredLands = [
  {
    id: 1,
    title: 'Prime Residential Plot - South Delhi',
    location: 'South Delhi, Delhi',
    price: '₹2.5 Cr',
    size: '450 sq.yds',
    type: 'Residential Land',
    zoning: 'Residential R-3',
    dimensions: '30ft × 45ft',
    facing: 'North-East',
    owner: 'Shree Builders Pvt Ltd',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600',
    possession: 'Immediate',
    rating: 4.9,
    reviews: 128,
    amenities: ['Corner Plot', 'Wide Road', 'Water Supply', 'Electricity', 'Drainage'],
    verification: 'Approved',
    measurement: '30ft x 45ft = 1350 sq.ft',
    coordinates: '28.6139° N, 77.2090° E'
  },
  {
    id: 2,
    title: 'Agricultural Land - Whitefield',
    location: 'Whitefield, Bangalore',
    price: '₹1.8 Cr',
    size: '2 acres',
    type: 'Agricultural Land',
    zoning: 'Agricultural Zone',
    dimensions: '200ft × 435ft',
    facing: 'East',
    owner: 'Green Valley Farms',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600',
    possession: '3 Months',
    rating: 4.7,
    reviews: 89,
    amenities: ['Fertile Soil', 'Water Borewell', 'Fencing', 'Farm House'],
    verification: 'Verified',
    measurement: '200ft x 435ft = 87,000 sq.ft',
    coordinates: '12.9716° N, 77.5946° E'
  },
  {
    id: 3,
    title: 'Commercial Land - BKC',
    location: 'BKC, Mumbai',
    price: '₹8.5 Cr',
    size: '1200 sq.yds',
    type: 'Commercial Land',
    zoning: 'Commercial C-1',
    dimensions: '60ft × 80ft',
    facing: 'West',
    owner: 'Bombay Land Developers',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600',
    possession: '6 Months',
    rating: 4.8,
    reviews: 67,
    amenities: ['Prime Location', 'Road Access', 'Parking Space', 'Construction Allowed'],
    verification: 'Approved',
    measurement: '60ft x 80ft = 4,800 sq.ft',
    coordinates: '19.0760° N, 72.8777° E'
  },
  {
    id: 4,
    title: 'Industrial Plot - Andheri',
    location: 'Andheri, Mumbai',
    price: '₹3.2 Cr',
    size: '650 sq.yds',
    type: 'Industrial Land',
    zoning: 'Industrial I-2',
    dimensions: '50ft × 52ft',
    facing: 'South',
    owner: 'Industrial Estates Ltd',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600',
    possession: 'Immediate',
    rating: 4.6,
    reviews: 54,
    amenities: ['Power Supply', 'Water Access', 'Loading Bay', 'Security'],
    verification: 'Verified',
    measurement: '50ft x 52ft = 2,600 sq.ft',
    coordinates: '19.1190° N, 72.8443° E'
  }
];

// Construction Projects Data
const constructionProjects = [
  {
    id: 1,
    name: 'Mumbai-Delhi Expressway',
    type: 'Highway Construction',
    location: 'Mumbai to Delhi',
    progress: 65,
    length: '1,350 km',
    estimatedCompletion: 'Dec 2025',
    contractor: 'L&T Construction',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600',
    measurement: 'Width: 45m, Length: 1,350km'
  },
  {
    id: 2,
    name: 'High-Speed Rail Corridor',
    type: 'Railway Construction',
    location: 'Mumbai-Ahmedabad',
    progress: 42,
    length: '508 km',
    estimatedCompletion: 'Dec 2026',
    contractor: 'NHSRCL',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?w=600',
    measurement: 'Gauge: 1435mm, Speed: 320km/h'
  },
  {
    id: 3,
    name: 'Greenfield Airport',
    type: 'Infrastructure Project',
    location: 'Navi Mumbai',
    progress: 78,
    length: '1,160 hectares',
    estimatedCompletion: 'Dec 2024',
    contractor: 'Adani Group',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600',
    measurement: 'Terminal: 25,00,000 sq.ft'
  }
];

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

// 360° Virtual Tours Data
const virtualTours = [
  {
    id: 1,
    title: 'Residential Colony Tour',
    location: 'South Delhi',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600',
    duration: '5:30',
    features: ['Interactive 360°', 'VR Ready', 'Voice Guide']
  },
  {
    id: 2,
    title: 'Commercial Complex Walkthrough',
    location: 'BKC, Mumbai',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600',
    duration: '4:45',
    features: ['Interactive 360°', 'VR Ready', 'Night Mode']
  },
  {
    id: 3,
    title: 'Industrial Zone Preview',
    location: 'Andheri, Mumbai',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600',
    duration: '6:15',
    features: ['Interactive 360°', 'Measurement Tools', 'Virtual Walk']
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
  'Hill View Plot',
  'Waterfront Land',
  'Corner Plot'
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
  const videoRef = useRef(null);

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

  const facings = ['All', 'North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Head>
        <title>PGI Land Realtors - India's Premier Land Aggregator with Advanced Measurement Tools</title>
        <meta name="description" content="Find your perfect land plot with advanced measurement tools, 360° virtual tours, and real-time construction monitoring. India's leading land aggregator platform." />
        <meta property="og:title" content="PGI Land Realtors - Advanced Land Aggregation Platform" />
        <meta property="og:description" content="Complete land solutions with measurement tools, virtual tours, and project monitoring." />
      </Head>

      <main className="min-h-screen bg-white text-gray-800 transition-colors duration-300">
        
        {/* HERO SECTION */}
        <motion.section 
          className="relative pt-24 min-h-screen flex items-center justify-center overflow-hidden bg-black"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          <div className="absolute inset-0 z-0 overflow-hidden bg-black">
            <AnimatePresence mode="wait">
              <motion.video
                key={activeVideo}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                autoPlay 
                muted 
                playsInline 
                preload="auto" 
                className="absolute inset-0 w-full h-full object-cover"
                src={activeVideo === 0 ? "https://3dbharat.com/video/header-video1.mp4" : "https://3dbharat.com/video/header-video2.mp4"}
                onEnded={() => setActiveVideo(activeVideo === 0 ? 1 : 0)}
              />
            </AnimatePresence>
            
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-emerald-900/40 via-transparent to-emerald-900/40 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            />
          </div>
          
          <div className="relative z-20 text-center px-4 max-w-6xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* <motion.div 
                className="inline-flex items-center gap-3 px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-500/90 via-green-500/90 to-emerald-600/90 border-2 border-emerald-400/40 backdrop-blur-xl shadow-[0_0_60px_rgba(47,158,91,0.5)] mb-8"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 80px rgba(47,158,91,0.7)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.span 
                  className="text-white text-xl md:text-2xl font-bold tracking-wider drop-shadow-lg"
                  animate={floatingAnimation}
                >
                  🌳 Advanced Land Aggregator
                </motion.span>
                <motion.span 
                  className="w-2 h-2 rounded-full bg-emerald-400"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <span className="text-white text-sm font-medium">5,000+ Verified Plots</span>
              </motion.div> */}
              
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.span 
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-400 to-emerald-500"
                  animate={{ 
                    backgroundPosition: ["0%", "200%", "0%"],
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ backgroundSize: "200%" }}
                >
                  India's Premier
                </motion.span>
                <motion.span 
                  className="block text-white drop-shadow-2xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.6, type: "spring" }}
                >
                  Land Aggregator
                </motion.span>
              </motion.h1>
            </motion.div>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed backdrop-blur-sm p-4 rounded-xl bg-black/30 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Discover 5,000+ verified land plots with advanced measurement tools, 360° virtual tours, 
              and real-time construction monitoring across 50+ cities.
            </motion.p>
            
            {/* Advanced Search Bar */}
            <motion.div 
              className="max-w-5xl mx-auto bg-white/10 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="📍 Search city or area..."
                    className="w-full px-4 py-3 rounded-xl bg-white/90 text-gray-900 border-2 border-transparent focus:border-emerald-500 outline-none transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="relative">
                  <select 
                    className="w-full px-4 py-3 rounded-xl bg-white/90 text-gray-900 border-2 border-transparent focus:border-emerald-500 outline-none transition-all appearance-none cursor-pointer"
                    value={selectedLandType}
                    onChange={(e) => setSelectedLandType(e.target.value)}
                  >
                    <option value="All">🏠 All Land Types</option>
                    {landTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div className="relative">
                  <select 
                    className="w-full px-4 py-3 rounded-xl bg-white/90 text-gray-900 border-2 border-transparent focus:border-emerald-500 outline-none transition-all appearance-none cursor-pointer"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                  >
                    <option value="5000000">💰 Under ₹50L</option>
                    <option value="10000000">💰 Under ₹1Cr</option>
                    <option value="20000000">💰 Under ₹2Cr</option>
                    <option value="50000000">💰 Under ₹5Cr</option>
                    <option value="100000000">💰 Any Budget</option>
                  </select>
                </div>
                
                <motion.button 
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-bold shadow-lg hover:shadow-emerald-500/30 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🔍 Search Land
                </motion.button>
              </div>
              
              {/* Advanced Filters */}
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                <select 
                  className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium border border-white/10 outline-none cursor-pointer hover:bg-white/30 transition-all"
                  value={selectedZoning}
                  onChange={(e) => setSelectedZoning(e.target.value)}
                >
                  <option value="All" className="text-gray-900">📐 Zoning: All</option>
                  {landZoning.map(zone => (
                    <option key={zone} value={zone} className="text-gray-900">{zone}</option>
                  ))}
                </select>
                
                <select 
                  className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium border border-white/10 outline-none cursor-pointer hover:bg-white/30 transition-all"
                  value={selectedFacing}
                  onChange={(e) => setSelectedFacing(e.target.value)}
                >
                  <option value="All" className="text-gray-900">🧭 Facing: All</option>
                  {facings.slice(1).map(facing => (
                    <option key={facing} value={facing} className="text-gray-900">{facing}</option>
                  ))}
                </select>

                <select 
                  className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium border border-white/10 outline-none cursor-pointer hover:bg-white/30 transition-all"
                  value={verificationStatus}
                  onChange={(e) => setVerificationStatus(e.target.value)}
                >
                  <option value="All" className="text-gray-900">✅ Status: All</option>
                  <option value="Verified" className="text-gray-900">✅ Verified</option>
                  <option value="Approved" className="text-gray-900">📋 Approved</option>
                  <option value="Pending" className="text-gray-900">⏳ Pending</option>
                </select>

                <motion.span 
                  className="px-3 py-1.5 bg-emerald-500/30 backdrop-blur-sm rounded-full text-white text-xs font-medium border border-emerald-400/30 cursor-pointer flex items-center gap-1"
                  whileHover={{ scale: 1.1 }}
                >
                  📊 Area: {areaRange.min}-{areaRange.max} sq.yds
                </motion.span>
              </div>
            </motion.div>
            
            {/* Quick Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {[
                { label: 'Land Plots', value: '5,000+' },
                { label: 'Cities', value: '50+' },
                { label: 'Verified Owners', value: '1,200+' },
                { label: 'Happy Buyers', value: '15,000+' }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  className="text-center p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/5"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                >
                  <div className="text-xl md:text-2xl font-bold text-emerald-400">{stat.value}</div>
                  <div className="text-xs text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Decorative floating particles */}
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-emerald-400/30"
                animate={{
                  x: [Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)],
                  y: [Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000), Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)],
                  opacity: [0, 1, 0],
                  scale: [0, 2, 0]
                }}
                transition={{
                  duration: 15 + Math.random() * 10,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 5
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              />
            ))}
          </div>
        </motion.section>

        {/* FEATURED LAND PLOTS SECTION with Measurements */}
        <motion.section 
          className="relative py-32 bg-gradient-to-b from-white via-emerald-50/30 to-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-12"
              variants={fadeInUp}
            >
              <motion.div 
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-2xl">🌳</span>
                <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">Featured Land Plots with Measurements</span>
              </motion.div>
              
              <motion.h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                <span className="text-gray-900">Prime </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700">
                  Land Properties
                </span>
              </motion.h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover premium land plots with precise measurements and complete verification
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredLands.map((land, index) => (
                <motion.div
                  key={land.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
                  whileHover={{ y: -10 }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={land.image} 
                      alt={land.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <motion.div 
                      className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs font-bold rounded-full"
                      whileHover={{ scale: 1.1 }}
                    >
                      {land.type}
                    </motion.div>
                    <div className="absolute top-3 right-3 flex gap-1">
                      <motion.div 
                        className="px-2 py-1 bg-emerald-400/90 backdrop-blur-sm text-xs font-bold rounded flex items-center gap-1"
                        whileHover={{ scale: 1.1 }}
                      >
                        ⭐ {land.rating}
                      </motion.div>
                      <motion.div 
                        className="px-2 py-1 bg-green-500/90 backdrop-blur-sm text-white text-[10px] font-bold rounded flex items-center gap-1"
                        whileHover={{ scale: 1.1 }}
                      >
                        ✅ {land.verification}
                      </motion.div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <div className="flex items-center gap-4 text-white text-xs">
                        <span>{land.size}</span>
                        <span>•</span>
                        <span>🧭 {land.facing}</span>
                        <span>•</span>
                        <span>📐 {land.dimensions}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{land.title}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
                      📍 {land.location}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-bold text-emerald-600">{land.price}</span>
                      <span className="text-xs text-gray-500">{land.measurement}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {land.amenities.slice(0, 3).map((amenity, i) => (
                        <span key={i} className="text-[10px] px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                          {amenity}
                        </span>
                      ))}
                      {land.amenities.length > 3 && (
                        <span className="text-[10px] px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                          +{land.amenities.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600">👤 {land.owner}</span>
                      </div>
                      <div className="flex gap-2">
                        <motion.button 
                          className="px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl text-xs font-bold hover:shadow-lg transition-all"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Details
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div className="text-center mt-12">
              <motion.button 
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-emerald-500/30 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All 5,000+ Land Plots →
              </motion.button>
            </motion.div>
          </div>
        </motion.section>

        {/* ADVANCED MEASUREMENT TOOLS SECTION */}
        <motion.section 
          className="relative py-32 bg-gradient-to-b from-emerald-50/30 via-white to-green-50/30"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
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
                  <span className="text-3xl">📐</span> Live Measurement Tool
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Select Measurement Type</label>
                    <div className="flex gap-2">
                      {['area', 'perimeter', 'volume'].map((type) => (
                        <motion.button
                          key={type}
                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                            measurementType === type 
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
                        onChange={(e) => setMeasurementInputs({...measurementInputs, length: e.target.value})}
                        placeholder="Enter length"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 block">Width (ft)</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-emerald-500 outline-none"
                        value={measurementInputs.width}
                        onChange={(e) => setMeasurementInputs({...measurementInputs, width: e.target.value})}
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
                        onChange={(e) => setMeasurementInputs({...measurementInputs, height: e.target.value})}
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

                  <motion.button 
                    className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-bold"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Export Measurement Report
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* 360° VIRTUAL TOURS SECTION
        <motion.section 
          className="relative py-32 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-16" variants={fadeInUp}>
              <motion.span 
                className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-green-500/10 border-2 border-emerald-200 text-xs uppercase tracking-[0.4em] text-emerald-600 font-bold"
              >
                🎥 Virtual Reality
              </motion.span>
              <motion.h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4">
                <span className="text-gray-900">360° </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700">
                  Virtual Tours
                </span>
              </motion.h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Experience properties through immersive 360° tours and interactive walkthroughs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {virtualTours.map((tour, i) => (
                <motion.div
                  key={i}
                  className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-gray-100"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img src={tour.image} alt={tour.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h4 className="text-white font-bold text-lg">{tour.title}</h4>
                      <p className="text-white/80 text-sm">{tour.location}</p>
                    </div>
                    <div className="absolute top-3 right-3 bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                      {tour.duration}
                    </div>
                    <motion.div 
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/30 backdrop-blur-xl rounded-full flex items-center justify-center border-2 border-white"
                      whileHover={{ scale: 1.2 }}
                    >
                      <span className="text-2xl">▶️</span>
                    </motion.div>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {tour.features.map((feature, j) => (
                        <span key={j} className="text-[10px] px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section> */}

        {/* CONSTRUCTION PROJECT MONITORING */}
        {/* <motion.section 
          className="relative py-32 bg-gradient-to-b from-white via-emerald-50/20 to-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-16" variants={fadeInUp}>
              <motion.span 
                className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-green-500/10 border-2 border-emerald-200 text-xs uppercase tracking-[0.4em] text-emerald-600 font-bold"
              >
                🏗️ Live Projects
              </motion.span>
              <motion.h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4">
                <span className="text-gray-900">Railway & Highway </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700">
                  Construction Monitoring
                </span>
              </motion.h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Real-time tracking of major infrastructure projects across India
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {constructionProjects.map((project, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, boxShadow: "0 25px 60px rgba(16,185,129,0.15)" }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                      {project.status}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-1">{project.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{project.type}</p>
                    <p className="text-sm text-gray-600 mb-3">📍 {project.location}</p>
                    
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-bold text-emerald-600">{project.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${project.progress}%` }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Length:</span>
                          <span className="font-bold ml-1">{project.length}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Completion:</span>
                          <span className="font-bold ml-1">{project.estimatedCompletion}</span>
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded-xl">
                        📐 {project.measurement}
                      </div>
                    </div>
                    
                    <motion.button 
                      className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Live Monitoring
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section> */}

        {/* VIDEO WALKTHROUGH SECTION */}
        <motion.section 
          className="relative py-32 bg-gradient-to-b from-white via-green-50/20 to-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-16" variants={fadeInUp}>
              <motion.span 
                className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-green-500/10 border-2 border-emerald-200 text-xs uppercase tracking-[0.4em] text-emerald-600 font-bold"
              >
                🎬 Video Walkthroughs
              </motion.span>
              <motion.h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4">
                <span className="text-gray-900">Property & Land </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700">
                  Video Showcases
                </span>
              </motion.h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Watch detailed video walkthroughs of properties and land plots
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                className="bg-black rounded-3xl overflow-hidden aspect-video relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <video 
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  src="https://3dbharat.com/video/header-video1.mp4"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h4 className="text-white font-bold">Premium Residential Colony</h4>
                  <p className="text-white/80 text-sm">South Delhi • 3 BHK Apartments</p>
                </div>
                <div className="absolute top-3 right-3 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                  HD Tour
                </div>
              </motion.div>

              <div className="grid grid-cols-1 gap-4">
                <motion.div 
                  className="bg-black rounded-3xl overflow-hidden aspect-[2/1] relative group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <video 
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    src="https://3dbharat.com/video/header-video2.mp4"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h4 className="text-white font-bold text-sm">Commercial Complex BKC</h4>
                    <p className="text-white/80 text-xs">Mumbai • Premium Office Space</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-black rounded-3xl overflow-hidden aspect-[2/1] relative group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <video 
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    src="https://3dbharat.com/video/header-video1.mp4"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h4 className="text-white font-bold text-sm">Agricultural Land Tour</h4>
                    <p className="text-white/80 text-xs">Bangalore • 2 Acres Farm</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* LAND TYPES & ZONING SECTION */}
        <motion.section 
          className="relative py-32 bg-gradient-to-b from-white via-emerald-50/20 to-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
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
              {landTypes.slice(0, 10).map((type, i) => (
                <motion.div
                  key={i}
                  className="p-4 bg-white rounded-2xl border-2 border-gray-100 text-center group hover:border-emerald-400 transition-all"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 40px rgba(16,185,129,0.15)"
                  }}
                >
                  <div className="text-3xl mb-2">
                    {type.includes('Residential') ? '🏠' : 
                     type.includes('Commercial') ? '🏢' :
                     type.includes('Agricultural') ? '🌾' :
                     type.includes('Industrial') ? '🏭' :
                     type.includes('Mixed') ? '🏘️' :
                     type.includes('Plotted') ? '📐' :
                     type.includes('Farm') ? '🌿' :
                     type.includes('Hill') ? '⛰️' :
                     type.includes('Waterfront') ? '🏖️' :
                     '📍'}
                  </div>
                  <h4 className="text-sm font-bold text-gray-900">{type}</h4>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* LAND USEFULIES & FEATURES */}
        <motion.section 
          className="relative py-32 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
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
          className="relative py-32 bg-gradient-to-b from-white via-emerald-50/20 to-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
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
                  step: '01',
                  icon: '🔍',
                  title: 'Search & Filter',
                  description: 'Use our advanced filters to find land by type, zoning, price, area, and facing direction.'
                },
                {
                  step: '02',
                  icon: '📋',
                  title: 'Verify & Compare',
                  description: 'Check land verification status, legal documents, zoning regulations, and compare options.'
                },
                {
                  step: '03',
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
                  <div className="absolute -top-4 -right-4 text-7xl font-bold text-gray-50 group-hover:text-emerald-50 transition-colors">
                    {item.step}
                  </div>
                  <div className="text-6xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* EMI CALCULATOR SECTION */}
        <motion.section 
          className="relative py-32 bg-gradient-to-br from-emerald-900 via-green-900 to-black text-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl"
              animate={{
                x: [0, -80, 0],
                y: [0, 50, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-12" variants={fadeInUp}>
              <motion.span className="text-4xl block mb-4">💰</motion.span>
              <motion.h2 className="text-4xl md:text-5xl font-bold">
                Land Purchase <span className="text-emerald-400">EMI Calculator</span>
              </motion.h2>
              <p className="text-gray-300 mt-4">Plan your land purchase with our easy EMI calculator</p>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20"
              variants={scaleIn}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-300 block mb-2">
                      Land Loan Amount: ₹{(loanAmount / 100000).toFixed(1)} Lakhs
                    </label>
                    <input
                      type="range"
                      min="100000"
                      max="50000000"
                      step="100000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-300 block mb-2">
                      Interest Rate: {interestRate}%
                    </label>
                    <input
                      type="range"
                      min="6"
                      max="15"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-300 block mb-2">
                      Loan Tenure: {loanTenure} Years
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      step="1"
                      value={loanTenure}
                      onChange={(e) => setLoanTenure(Number(e.target.value))}
                      className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col items-center justify-center bg-white/5 rounded-2xl p-6 border border-white/10">
                  <p className="text-sm text-gray-400 mb-2">Monthly EMI for Land Purchase</p>
                  <motion.p 
                    className="text-5xl font-bold text-emerald-400"
                    key={calculateEMI()}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    ₹{calculateEMI().toLocaleString()}
                  </motion.p>
                  <div className="w-full mt-4 pt-4 border-t border-white/10">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Total Interest</span>
                      <span className="text-white font-medium">
                        ₹{(calculateEMI() * loanTenure * 12 - loanAmount).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-400">Total Payment</span>
                      <span className="text-white font-medium">
                        ₹{(calculateEMI() * loanTenure * 12).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* WHY CHOOSE PGI LAND REALTORS */}
        <motion.section 
          className="relative py-32 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
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
        <motion.section 
          className="relative py-32 bg-gradient-to-b from-white via-emerald-50/20 to-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-16" variants={fadeInUp}>
              <motion.span className="text-4xl block mb-4">💬</motion.span>
              <motion.h2 className="text-4xl md:text-5xl font-bold">
                What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700">Land Buyers Say</span>
              </motion.h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Rajesh Kumar',
                  location: 'Mumbai',
                  text: 'Found the perfect commercial land in BKC through PGI Land Realtors. Complete legal verification made the process smooth.',
                  rating: 5,
                  image: '👨'
                },
                {
                  name: 'Sunita Reddy',
                  location: 'Bangalore',
                  text: 'Excellent platform for agricultural land. Found a 2-acre plot with all necessary approvals and clear title.',
                  rating: 5,
                  image: '👩'
                },
                {
                  name: 'Vikram Singh',
                  location: 'Delhi',
                  text: 'The land zoning information and legal verification gave me confidence to invest. Highly recommended for land buyers.',
                  rating: 5,
                  image: '👨'
                }
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  className="p-8 bg-white rounded-3xl shadow-xl border border-gray-100"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, boxShadow: "0 25px 60px rgba(16,185,129,0.12)" }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{testimonial.image}</span>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                  <div className="flex gap-1 text-emerald-400">
                    {'⭐'.repeat(testimonial.rating)}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA SECTION */}
        <motion.section 
          className="relative py-32 bg-gradient-to-br from-emerald-600 via-green-700 to-black text-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-emerald-400/20 blur-3xl"
              animate={{
                x: [0, 80, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <motion.h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" variants={fadeInUp}>
              Ready to Find Your{' '}
              <span className="text-emerald-300">Perfect Land Plot</span>?
            </motion.h2>
            <motion.p className="text-xl text-gray-200 mb-10" variants={fadeInUp}>
              Join 15,000+ happy land owners who found their perfect plot through PGI Land Realtors
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
            >
              <motion.button 
                className="px-10 py-4 bg-white text-emerald-700 rounded-2xl font-bold shadow-2xl hover:shadow-emerald-500/30 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Land Search Now →
              </motion.button>
              <motion.button 
                className="px-10 py-4 border-2 border-white/50 text-white rounded-2xl font-medium hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                List Your Land Plot
              </motion.button>
            </motion.div>
          </div>
        </motion.section>

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