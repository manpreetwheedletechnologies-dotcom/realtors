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

// FAQ Data
const faqs = [
  {
    question: 'What types of land plots are available on PGI Land Realtors?',
    answer: 'We offer a wide variety of land plots including Residential Land, Commercial Land, Agricultural Land, Industrial Land, Mixed-Use Land, Plotted Development, Farm Land, Hill View Plot, Waterfront Land, and Corner Plots across 50+ cities in India.'
  },
  {
    question: 'How can I verify the legal status of a land plot?',
    answer: 'Each land listing on our platform goes through a rigorous verification process. We provide complete legal documentation including title deeds, encumbrance certificates, zoning approvals, and DTCP/RERA registrations. You can also schedule a legal consultation through our platform.'
  },
  {
    question: 'What measurement tools are available on the platform?',
    answer: 'PGI Land Realtors offers advanced measurement tools including Area Calculator for sq.ft, sq.yds, acres, and hectares conversion; Distance Measurement with GPS integration; Elevation Analysis with contour mapping; and Construction Estimator for cost and material calculations.'
  },
  {
    question: 'How do I schedule a site visit for a land plot?',
    answer: 'You can schedule a site visit directly through the land listing page. Simply click on "Schedule Visit" and choose your preferred date and time. Our team will coordinate with the owner and accompany you during the visit for a seamless experience.'
  },
  {
    question: 'What financing options are available for land purchase?',
    answer: 'We have partnerships with leading banks and financial institutions offering land purchase loans. Our EMI calculator helps you estimate monthly payments based on loan amount, interest rate, and tenure. We also provide assistance with loan documentation and processing.'
  },
  {
    question: 'Can I list my land plot for sale on your platform?',
    answer: 'Yes, absolutely! You can list your land plot by clicking on "List Your Land Plot" button. Our team will verify your property details, legal documents, and coordinate with potential buyers. We provide professional photography, virtual tours, and marketing support for your listing.'
  },
  {
    question: 'What is the process of buying land through your platform?',
    answer: 'The process is simple: 1) Search and filter land plots based on your requirements, 2) Verify the land details, legal documents, and zoning regulations, 3) Schedule a site visit, 4) Connect with the owner for price negotiation, 5) Complete the legal documentation and registration with our assistance, 6) Get possession of your land.'
  },
  {
    question: 'Do you offer virtual tours for land properties?',
    answer: 'Yes, we provide 360° immersive virtual tours for select properties. These interactive tours allow you to experience the property remotely with features like VR compatibility, voice guide, night mode, and measurement tools integrated into the tour experience.'
  }
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
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
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
  const heroVideos = [
    '/videos/02.mp4',
    '/videos/03.mp4',
    '/videos/04.mp4',
    '/videos/05.mp4',
    '/videos/06.mp4',
  ];

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
                src={heroVideos[activeVideo]}
                onEnded={() => setActiveVideo((prev) => (prev + 1) % heroVideos.length)}
              />
            </AnimatePresence>

            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70 z-10"
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        <FeaturedLandPlotsSection />

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
          className="relative py-32 bg-gradient-to-b from-white via-green-50/20 to-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
        <VideoShowcaseSection/>
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

        {/* FAQ SECTION */}
        <FAQ />

        {/* WHY CHOOSE PGI LAND REALTORS */}
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
        <CTASection />
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