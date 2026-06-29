import Head from 'next/head';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Ruler, ArrowUp, ArrowRight, Gauge, Box, Columns, 
  Train, Building, MapPin, ChevronLeft, ChevronRight,
  ZoomIn, Download, Share2, Eye, Layers, Grid3x3,
  Maximize2, Minimize2, TrendingUp, TrendingDown,
  Clock, CheckCircle, AlertCircle, Activity
} from 'lucide-react';

const MEASUREMENT_DATA: any = {
  Railway: {
    icon: Train,
    count: 14,
    color: 'from-emerald-600 to-green-700',
    bgColor: 'bg-emerald-50',
    subTabs: [
      { name: 'OHE Mask measurement', count: 4, icon: '⚡' },
      { name: 'Track', count: 3, icon: '🛤️' },
      { name: 'Station', count: 7, icon: '🏠' }
    ],
    items: [
      { id: 'ohe-pole', tab: 'OHE Mask measurement', title: 'OHE Pole Measurements', desc: 'Distance between catenary and contact wire with precision tracking', url: 'https://images.pexels.com/photos/14887794/pexels-photo-14887794.jpeg?auto=compress&cs=tinysrgb&w=1260', accuracy: '±0.01mm', status: 'Active' },
      { id: 'cat-rail', tab: 'OHE Mask measurement', title: 'Catenary to Rail', desc: 'Distance between catenary and contact wire for optimal performance', url: 'https://images.pexels.com/photos/27617424/pexels-photo-27617424.jpeg?auto=compress&cs=tinysrgb&w=1260', accuracy: '±0.02mm', status: 'Active' },
      { id: 'cont-rail', tab: 'OHE Mask measurement', title: 'Contact to Rail', desc: 'Distance between catenary and contact wire ensuring safety', url: 'https://images.pexels.com/photos/27617417/pexels-photo-27617417.jpeg?auto=compress&cs=tinysrgb&w=1260', accuracy: '±0.015mm', status: 'Active' },
      { id: 'cat-cont', tab: 'OHE Mask measurement', title: 'Catenary to Contact', desc: 'Distance between catenary and contact wire with advanced analytics', url: 'https://images.pexels.com/photos/27617416/pexels-photo-27617416.jpeg?auto=compress&cs=tinysrgb&w=1260', accuracy: '±0.01mm', status: 'Active' }
    ]
  },
  Bridge: {
    icon: Building,
    count: 5,
    color: 'from-blue-600 to-emerald-700',
    bgColor: 'bg-blue-50',
    subTabs: [
      { name: 'Pillars', count: 2, icon: '🏛️' },
      { name: 'Deck', count: 3, icon: '🌉' }
    ],
    items: [
      { id: 'bridge-1', tab: 'Pillars', title: 'Pillar Verticality', desc: 'Pillar alignment analysis for structural integrity', url: 'https://images.pexels.com/photos/19099247/pexels-photo-19099247.jpeg?auto=compress&cs=tinysrgb&w=1260', accuracy: '±0.05mm', status: 'Monitoring' },
      { id: 'bridge-2', tab: 'Pillars', title: 'Pillar Load Analysis', desc: 'Load distribution analysis across pillars', url: 'https://images.pexels.com/photos/7107980/pexels-photo-7107980.jpeg?auto=compress&cs=tinysrgb&w=1260', accuracy: '±0.03mm', status: 'Active' }
    ]
  },
  Road: {
    icon: MapPin,
    count: 4,
    color: 'from-amber-600 to-emerald-700',
    bgColor: 'bg-amber-50',
    subTabs: [
      { name: 'Surface', count: 2, icon: '🛣️' },
      { name: 'Drainage', count: 2, icon: '💧' }
    ],
    items: [
      { id: 'road-1', tab: 'Surface', title: 'Asphalt Volume', desc: 'Surface volume calculation for road construction', url: 'https://images.pexels.com/photos/7910082/pexels-photo-7910082.jpeg?auto=compress&cs=tinysrgb&w=1260', accuracy: '±0.02mm', status: 'Active' },
      { id: 'road-2', tab: 'Surface', title: 'Road Roughness', desc: 'Surface roughness analysis for quality control', url: 'https://images.pexels.com/photos/29213468/pexels-photo-29213468.jpeg?auto=compress&cs=tinysrgb&w=1260', accuracy: '±0.04mm', status: 'Review' }
    ]
  }
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.7,
      ease: [0.6, -0.05, 0.01, 0.99],
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.6,
      type: "spring",
      stiffness: 120,
      damping: 15
    }
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.7,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.7,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

export default function Measurement() {
  const [activeCategory, setActiveCategory] = useState('Railway');
  const [activeSubTab, setActiveSubTab] = useState('OHE Mask measurement');
  const [activeImageId, setActiveImageId] = useState('cat-cont');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showStats, setShowStats] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const currentCategoryData = MEASUREMENT_DATA[activeCategory];
  const filteredItems = currentCategoryData?.items.filter((item: any) => item.tab === activeSubTab) || [];
  const activeImage = filteredItems.find((img: any) => img.id === activeImageId) || filteredItems[0];

  useEffect(() => {
    if (activeImage) {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [activeImage]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    const firstTab = MEASUREMENT_DATA[cat].subTabs[0].name;
    setActiveSubTab(firstTab);
    const firstImg = MEASUREMENT_DATA[cat].items.filter((item: any) => item.tab === firstTab)[0];
    if (firstImg) setActiveImageId(firstImg.id);
  };

  const handleSubTabChange = (tab: string) => {
    setActiveSubTab(tab);
    const firstImg = currentCategoryData.items.filter((item: any) => item.tab === tab)[0];
    if (firstImg) setActiveImageId(firstImg.id);
  };

  const handlePrevImage = () => {
    if(!filteredItems.length) return;
    const idx = filteredItems.findIndex((img: any) => img.id === activeImageId);
    if (idx > 0) setActiveImageId(filteredItems[idx - 1].id);
  };

  const handleNextImage = () => {
    if(!filteredItems.length) return;
    const idx = filteredItems.findIndex((img: any) => img.id === activeImageId);
    if (idx < filteredItems.length - 1) setActiveImageId(filteredItems[idx + 1].id);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return 'text-emerald-400 bg-emerald-500/20';
      case 'Monitoring': return 'text-blue-400 bg-blue-500/20';
      case 'Review': return 'text-amber-400 bg-amber-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Active': return <CheckCircle className="w-4 h-4" />;
      case 'Monitoring': return <Activity className="w-4 h-4" />;
      case 'Review': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <>
      <Head>
        <title>Advanced Measurement Analytics - PGI Land Realtors</title>
        <meta name="description" content="Precision measurement analytics for Railway, Bridge, and Road infrastructure with sub-millimeter accuracy." />
      </Head>
      
      <main className="min-h-screen bg-white text-gray-800 transition-colors duration-300">
        
        {/* HERO SECTION */}
        <motion.section 
          className="relative min-h-[85vh] overflow-hidden pt-20"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <div className="absolute inset-0 z-0">
            <img 
              alt="Precision Measurement" 
              className="w-full h-full object-cover" 
              src="https://www.shutterstock.com/image-photo/hightech-environment-featuring-hand-interacting-600nw-2591732581.jpg" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
          </div>
          
          <div className="absolute inset-0 z-[1]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[conic-gradient(var(--tw-gradient-stops))] from-emerald-500/15 via-green-600/10 via-50% to-emerald-500/15 rounded-full blur-3xl opacity-40"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* FLOATING ICONS */}
          <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden hidden lg:block">
            {[
              { icon: Ruler, left: '10%', top: '15%', delay: 0 },
              { icon: ArrowUp, left: '25%', top: '40%', delay: 1 },
              { icon: ArrowRight, left: '40%', top: '20%', delay: 2 },
              { icon: Gauge, left: '55%', top: '8%', delay: 0.5 },
              { icon: Box, left: '70%', top: '12%', delay: 1.5 },
              { icon: Columns, left: '85%', top: '38%', delay: 2.5 },
              { icon: Layers, left: '15%', top: '55%', delay: 1.8 },
              { icon: Grid3x3, left: '78%', top: '55%', delay: 0.8 }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="absolute"
                style={{ left: item.left, top: item.top }}
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  delay: item.delay,
                  ease: "easeInOut"
                }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-700/30 to-green-800/30 border border-emerald-400/25 backdrop-blur-md flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7 text-emerald-200" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="relative z-10 text-center py-24 px-4 max-w-5xl mx-auto">
            <motion.div 
              className="inline-flex items-center gap-3 mb-8 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-700/30 to-green-800/30 border border-emerald-400/30 backdrop-blur-md"
              variants={scaleIn}
            >
              <motion.div 
                className="relative"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="absolute inset-0 w-3 h-3 rounded-full bg-white/60 blur-sm animate-ping"></span>
                <span className="relative block w-3 h-3 rounded-full bg-white"></span>
              </motion.div>
              <span className="text-sm font-semibold text-gray-200 uppercase tracking-widest">Precision Engineering</span>
              <div className="w-px h-5 bg-emerald-300/40"></div>
              <motion.span 
                className="text-xs font-medium text-emerald-300"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ±0.001mm Accuracy
              </motion.span>
            </motion.div>

            <motion.h2 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
              variants={fadeInUp}
            >
              <span className="relative inline-block">
                <span className="relative z-10 text-white drop-shadow-lg">Measurement</span>
                <motion.span 
                  className="absolute -bottom-2 left-0 right-0 h-4 bg-gradient-to-r from-emerald-400/40 to-green-400/40 blur-xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </span>
              <br/>
              <motion.span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-400 to-emerald-500"
                variants={fadeInUp}
              >
                Analytics Hub
              </motion.span>
            </motion.h2>

            <motion.p 
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12 font-medium"
              variants={fadeInUp}
            >
              Advanced 3D measurement capabilities delivering 
              <motion.span 
                className="text-white font-bold underline decoration-emerald-400/50 underline-offset-4 mx-2"
                whileHover={{ scale: 1.05 }}
              >
                sub-millimeter precision
              </motion.span>
              for Railway, Bridge, and Road infrastructure analysis with real-time monitoring.
            </motion.p>

            <motion.div 
              className="flex flex-wrap items-center justify-center gap-4"
              variants={fadeInUp}
            >
              <div className="flex gap-2">
                {['LiDAR', 'Point Cloud', '3D Scanning', 'AI Analytics'].map((tech, i) => (
                  <motion.span 
                    key={i}
                    className="px-4 py-2 text-xs font-semibold text-emerald-100 bg-emerald-900/40 rounded-xl border border-emerald-400/20 backdrop-blur-sm shadow-sm cursor-default"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
              <div className="w-px h-7 bg-white/20 hidden md:block"></div>
              <motion.div 
                className="flex items-center gap-2 text-sm text-gray-400 font-medium"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Clock className="w-4 h-4" />
                <span>Live Updates: Jan 2026</span>
              </motion.div>
            </motion.div>
          </div>

          {/* WAVE SEPARATOR */}
          <div className="absolute bottom-0 left-0 right-0 z-20">
            <svg className="w-full h-32" viewBox="0 0 1200 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4ade80" stopOpacity="0.5"/>
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9"/>
                  <stop offset="100%" stopColor="#4ade80" stopOpacity="0.5"/>
                </linearGradient>
                <linearGradient id="waveFill" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="transparent"/>
                  <stop offset="40%" stopColor="#15351F" stopOpacity="0.08"/>
                  <stop offset="100%" stopColor="#F5F3EC" stopOpacity="1"/>
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <motion.path 
                d="M0,50 Q200,20 400,50 T800,50 T1200,50 L1200,100 L0,100 Z" 
                fill="url(#waveFill)"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 1 }}
              />
              <motion.path 
                d="M0,50 Q200,20 400,50 T800,50 T1200,50" 
                fill="none" 
                stroke="url(#waveGradient)" 
                strokeWidth="3" 
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
              {[0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200].map(x => (
                x % 200 === 0 ? (
                  <g key={x}>
                    <line x1={x} y1="50" x2={x} y2="65" stroke="#86efac" strokeWidth="2" opacity="0.8"/>
                    <circle cx={x} cy="50" r="4" fill="#ffffff" filter="url(#glow)"/>
                  </g>
                ) : (
                  <line key={x} x1={x} y1="50" x2={x} y2="58" stroke="#86efac" strokeWidth="1" opacity="0.6"/>
                )
              ))}
            </svg>

            {/* Category Quick Access */}
            <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-24 md:gap-40">
              {Object.keys(MEASUREMENT_DATA).map((cat) => {
                const Icon = MEASUREMENT_DATA[cat].icon;
                const isActive = activeCategory === cat;
                return (
                  <motion.div 
                    key={cat}
                    className="relative group cursor-pointer"
                    whileHover={{ y: -8 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCategoryChange(cat)}
                  >
                    <motion.div 
                      className={`absolute inset-0 w-14 h-14 rounded-2xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity ${
                        isActive ? 'bg-gradient-to-br from-emerald-400 to-green-500' : 'bg-gradient-to-br from-green-600 to-emerald-800'
                      }`}
                      animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
                    />
                    <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl border transition-all ${
                      isActive 
                        ? 'bg-gradient-to-br from-emerald-500 to-green-600 border-emerald-300/50 shadow-emerald-500/50' 
                        : 'bg-gradient-to-br from-green-700 to-emerald-900 border-green-400/30 shadow-green-700/50 group-hover:shadow-emerald-500/30'
                    }`}>
                      <Icon className={`w-7 h-7 ${isActive ? 'text-white' : 'text-white/70 group-hover:text-white'}`} />
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-emerald-400 to-transparent"></div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* CONTENT SECTION */}
        <motion.section 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          {/* Category Stats */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12"
            variants={fadeInUp}
          >
            <motion.div 
              className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-2xl border border-emerald-200"
              whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(16,185,129,0.1)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <Ruler className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Measurements</p>
                  <p className="text-2xl font-bold text-gray-900">23</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-2xl border border-emerald-200"
              whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(16,185,129,0.1)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active Measurements</p>
                  <p className="text-2xl font-bold text-emerald-600">18</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-2xl border border-emerald-200"
              whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(16,185,129,0.1)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Accuracy Rate</p>
                  <p className="text-2xl font-bold text-gray-900">99.8%</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-2xl border border-emerald-200"
              whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(16,185,129,0.1)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Live Projects</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Main Category Tabs */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            variants={fadeInUp}
          >
            {Object.keys(MEASUREMENT_DATA).map((cat) => {
              const isActive = activeCategory === cat;
              const Icon = MEASUREMENT_DATA[cat].icon;
              const color = MEASUREMENT_DATA[cat].color;
              return (
                <motion.button 
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`flex items-center gap-3 px-7 py-4 rounded-2xl font-semibold text-sm transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? `bg-gradient-to-r ${color} text-white shadow-lg shadow-emerald-500/30 -translate-y-1` 
                      : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-emerald-300 hover:shadow-lg hover:-translate-y-0.5'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{cat}</span>
                  <span className={`px-2.5 py-0.5 rounded-lg text-xs ${
                    isActive ? 'bg-white/20' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {MEASUREMENT_DATA[cat].count}
                  </span>
                </motion.button>
              )
            })}
          </motion.div>

          <div>
            {/* Sub Tabs */}
            <motion.div 
              className="flex flex-wrap justify-start mb-8 gap-3"
              variants={fadeInUp}
            >
              {currentCategoryData?.subTabs.map((tabObj: any) => {
                const isActive = activeSubTab === tabObj.name;
                return (
                  <motion.button 
                    key={tabObj.name}
                    onClick={() => handleSubTabChange(tabObj.name)}
                    className={`flex items-center gap-2 px-5 py-3 font-medium text-sm transition-all duration-300 cursor-pointer rounded-xl ${
                      isActive 
                        ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-md shadow-emerald-500/20 -translate-y-0.5' 
                        : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-emerald-300 hover:shadow-lg'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{tabObj.icon}</span>
                    {tabObj.name}
                    <span className={`px-2 py-0.5 rounded-lg text-xs ${
                      isActive ? 'bg-white/20' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tabObj.count}
                    </span>
                  </motion.button>
                )
              })}
            </motion.div>

            {/* Gallery Viewer */}
            {filteredItems.length > 0 ? (
              <motion.div 
                className="flex flex-col gap-6"
                variants={fadeInUp}
              >
                <motion.div 
                  className="relative rounded-3xl overflow-hidden lg:h-[80vh] bg-black aspect-video group"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  layout
                >
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={activeImageId}
                      alt={activeImage?.title} 
                      className="w-full h-full object-cover cursor-pointer" 
                      src={activeImage?.url}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  </AnimatePresence>

                  {/* Loading Overlay */}
                  {isLoading && (
                    <motion.div 
                      className="absolute inset-0 bg-black/50 flex items-center justify-center z-20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div 
                        className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    </motion.div>
                  )}

                  {/* Image Controls */}
                  <div className="absolute top-4 right-4 flex gap-2 z-10">
                    <motion.button 
                      className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsZoomed(!isZoomed)}
                    >
                      {isZoomed ? <Minimize2 className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
                    </motion.button>
                    <motion.button 
                      className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Download className="w-4 h-4" />
                    </motion.button>
                    <motion.button 
                      className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Share2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                  
                  {/* Navigation Buttons */}
                  <motion.button 
                    onClick={handlePrevImage} 
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-gray-900 shadow-lg transition-all z-10 opacity-0 group-hover:opacity-100"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </motion.button>
                  
                  <motion.button 
                    onClick={handleNextImage} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-gray-900 shadow-lg transition-all z-10 opacity-0 group-hover:opacity-100"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </motion.button>
                  
                  {/* Image Info Overlay */}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between text-white"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center gap-4">
                      <motion.div 
                        className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center flex-shrink-0"
                        whileHover={{ rotate: 10, scale: 1.05 }}
                      >
                        <Ruler className="w-7 h-7" />
                      </motion.div>
                      <div>
                        <h3 className="text-2xl font-bold mb-1">{activeImage?.title}</h3>
                        <p className="text-white/70">{activeImage?.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-medium ${getStatusColor(activeImage?.status)}`}>
                        {getStatusIcon(activeImage?.status)}
                        {activeImage?.status}
                      </div>
                      <div className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-medium">
                        ±{activeImage?.accuracy}
                      </div>
                    </div>
                  </motion.div>

                  {/* Image Counter */}
                  <div className="absolute bottom-24 right-4 px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-md text-white text-xs font-medium">
                    {filteredItems.findIndex((img: any) => img.id === activeImageId) + 1} / {filteredItems.length}
                  </div>
                </motion.div>

                {/* Thumbnail Gallery */}
                <motion.div 
                  className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
                  variants={fadeInUp}
                >
                  {filteredItems.map((item: any) => {
                    const isActive = activeImageId === item.id;
                    return (
                      <motion.button 
                        key={item.id}
                        onClick={() => setActiveImageId(item.id)}
                        className={`flex-shrink-0 w-40 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                          isActive ? 'border-emerald-500 shadow-lg shadow-emerald-500/40 -translate-y-1' : 'border-transparent hover:border-emerald-300'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <img alt={item.title} className="w-full h-24 object-cover" src={item.url} />
                        <div className={`p-2 text-xs font-medium text-center truncate ${
                          isActive ? 'bg-emerald-600 text-white' : 'bg-gray-900 text-white/80'
                        }`}>
                          {item.title}
                        </div>
                      </motion.button>
                    )
                  })}
                </motion.div>

                {/* Measurement Details */}
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4"
                  variants={fadeInUp}
                >
                  <motion.div 
                    className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-xl border border-emerald-200"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">📐</span>
                      <div>
                        <p className="text-xs text-gray-500">Measurement Type</p>
                        <p className="font-semibold text-gray-900">{activeImage?.tab}</p>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-xl border border-emerald-200"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🎯</span>
                      <div>
                        <p className="text-xs text-gray-500">Accuracy</p>
                        <p className="font-semibold text-emerald-600">±{activeImage?.accuracy}</p>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-xl border border-emerald-200"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">📊</span>
                      <div>
                        <p className="text-xs text-gray-500">Status</p>
                        <p className={`font-semibold ${activeImage?.status === 'Active' ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {activeImage?.status}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div 
                className="h-64 flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-300 rounded-3xl"
                variants={fadeInUp}
              >
                <div className="text-center">
                  <Ruler className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p className="font-medium">No measurement data available for {activeSubTab}</p>
                  <p className="text-sm text-gray-400">Please select another category or sub-tab</p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.section>
      </main>
    </>
  );
}