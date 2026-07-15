'use client';

import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import { useMemo, useState } from 'react';

// ---------- 3D BUILDING COMPONENT ----------
function Building({ position, width, depth, height, color }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function ThreeDScene() {
  // Generate random buildings
  const buildings = useMemo(() => {
    const arr = [];
    const count = 60;
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 40;
      const w = 0.5 + Math.random() * 1.5;
      const d = 0.5 + Math.random() * 1.5;
      const h = 0.5 + Math.random() * 5;
      const color = `hsl(${Math.random() * 60 + 200}, 70%, 50%)`;
      arr.push({ x, z, w, d, h, color });
    }
    return arr;
  }, []);

  return (
    <div className="w-full h-full rounded-3xl overflow-hidden relative">
      <Canvas camera={{ position: [15, 15, 15], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 20, 10]} intensity={1} />
        <directionalLight position={[-10, 10, -10]} intensity={0.5} />
        <Grid infiniteGrid fadeDistance={30} />
        {buildings.map((b, i) => (
          <Building
            key={i}
            position={[b.x, b.h / 2, b.z]}
            width={b.w}
            depth={b.d}
            height={b.h}
            color={b.color}
          />
        ))}
        <OrbitControls enableZoom={true} enablePan={true} />
      </Canvas>
      
      {/* Overlay label */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <div className="flex justify-between items-end">
          <div>
            <h4 className="text-white font-bold">Interactive 3D Map</h4>
            <p className="text-white/80 text-sm">Drag to rotate • Scroll to zoom</p>
          </div>
          <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
            🖱️ Interactive
          </span>
        </div>
      </div>
    </div>
  );
}

// ---------- MAIN SECTION ----------
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function VideoWalkthroughSection() {
  const [activeTab, setActiveTab] = useState('videos');

  return (
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
            🎬 Video & 3D Walkthroughs
          </motion.span>
          <motion.h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4">
            <span className="text-gray-900">Property & Land </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700">
              Interactive Showcases
            </span>
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Watch video walkthroughs or explore properties in interactive 3D
          </p>
        </motion.div>

        {/* ---------- TAB SWITCHER ---------- */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeTab === 'videos'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            🎥 Video Tours
          </button>
          <button
            onClick={() => setActiveTab('3d')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeTab === '3d'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            🏗️ 3D Interactive Map
          </button>
        </div>

        {/* ---------- VIDEO CONTENT (existing) ---------- */}
        {activeTab === 'videos' && (
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
                <p className="text-white/80 text-sm">3 BHK Apartments</p>
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
                  <h4 className="text-white font-bold text-sm">Commercial Complex</h4>
                  <p className="text-white/80 text-xs">Premium Office Space</p>
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
                  <p className="text-white/80 text-xs"> 2 Acres Farm</p>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* ---------- 3D CONTENT (NEW) ---------- */}
        {activeTab === '3d' && (
          <motion.div 
            className="bg-black rounded-3xl overflow-hidden aspect-[2/1] md:aspect-[16/9] relative group"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.01 }}
          >
            <ThreeDScene />
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}