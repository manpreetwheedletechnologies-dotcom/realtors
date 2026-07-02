import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] } }
};

const measurementTools = [
  { name: 'Area Calculator', icon: '📐', description: 'Calculate land area in sq.ft, sq.yds, acres, and hectares', features: ['Multiple Units', 'Auto Conversion', 'Shape Recognition'] },
  { name: 'Distance Measurement', icon: '📏', description: 'Measure distances, perimeters, and boundaries precisely', features: ['GPS Integration', 'Map Overlay', '3D Terrain'] },
  { name: 'Elevation Analysis', icon: '⛰️', description: 'Analyze terrain elevation, slopes, and grading requirements', features: ['Contour Mapping', 'Slope Analysis', '3D Visualization'] },
  { name: 'Construction Estimator', icon: '🏗️', description: 'Estimate construction costs, materials, and timelines', features: ['Auto Calculation', 'Material List', 'Cost Breakdown'] }
];

const unitConversions = {
  ft: 1,
  m: 3.28084,
  yd: 3
};

export default function MeasurementTools() {
  const [measurementType, setMeasurementType] = useState('area');
  const [inputs, setInputs] = useState({ length: '', width: '', height: '', unit: 'ft' });

  const calculate = () => {
    const l = parseFloat(inputs.length) || 0;
    const w = parseFloat(inputs.width) || 0;
    const h = parseFloat(inputs.height) || 0;
    const area = l * w;
    const perimeter = 2 * (l + w);
    const volume = l * w * h;
    const areaSqYd = (area / 9).toFixed(2);
    const areaAcres = (area / 43560).toFixed(4);
    return {
      area: area.toFixed(2),
      perimeter: perimeter.toFixed(2),
      volume: volume.toFixed(2),
      areaSqYd,
      areaAcres
    };
  };

  const result = calculate();

  return (
    <>
      <Head>
        <title>Measurement Tools | PGI Land Realtors</title>
        <meta name="description" content="Professional land measurement tools — area calculator, distance measurement, elevation analysis, and construction estimator." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-white text-gray-800">
        <PageHero
          image="https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?w=1600"
          badge="🛠️ Advanced Tools"
          titleLine1="Land Measurement"
          titleLine2="& Analysis"
          subtitle="Professional measurement tools for accurate land analysis and construction planning — area, perimeter, and volume, calculated instantly."
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Tool cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
              {measurementTools.map((tool, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.04, boxShadow: '0 10px 40px rgba(16,185,129,0.15)' }}
                  className="p-6 bg-white rounded-2xl border-2 border-gray-100 hover:border-emerald-400 transition-all cursor-pointer"
                >
                  <div className="text-4xl mb-3">{tool.icon}</div>
                  <h4 className="text-lg font-bold mb-2">{tool.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{tool.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {tool.features.map((f, j) => (
                      <span key={j} className="text-[10px] px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full">{f}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Live calculator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-8 border-2 border-emerald-200 shadow-xl h-fit"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="text-3xl">📐</span> Live Measurement Tool
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Select Measurement Type</label>
                  <div className="flex gap-2">
                    {['area', 'perimeter', 'volume'].map((t) => (
                      <button
                        key={t}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          measurementType === t ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        onClick={() => setMeasurementType(t)}
                      >
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-600 block">Length (ft)</label>
                    <input type="number" className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-emerald-500 outline-none"
                      value={inputs.length} onChange={(e) => setInputs({ ...inputs, length: e.target.value })} placeholder="Enter length" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 block">Width (ft)</label>
                    <input type="number" className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-emerald-500 outline-none"
                      value={inputs.width} onChange={(e) => setInputs({ ...inputs, width: e.target.value })} placeholder="Enter width" />
                  </div>
                </div>

                {measurementType === 'volume' && (
                  <div>
                    <label className="text-xs text-gray-600 block">Height (ft)</label>
                    <input type="number" className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-emerald-500 outline-none"
                      value={inputs.height} onChange={(e) => setInputs({ ...inputs, height: e.target.value })} placeholder="Enter height" />
                  </div>
                )}

                <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-2xl border border-emerald-200">
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">Calculation Results</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between"><span className="text-gray-600">Area:</span><span className="font-bold text-emerald-600">{result.area} sq.ft</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Area (sq.yds):</span><span className="font-bold text-emerald-600">{result.areaSqYd} sq.yds</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Area (acres):</span><span className="font-bold text-emerald-600">{result.areaAcres} acres</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Perimeter:</span><span className="font-bold text-emerald-600">{result.perimeter} ft</span></div>
                    {measurementType === 'volume' && (
                      <div className="flex justify-between"><span className="text-gray-600">Volume:</span><span className="font-bold text-emerald-600">{result.volume} cu.ft</span></div>
                    )}
                  </div>
                </div>

                <button className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-bold hover:shadow-lg transition-all">
                  Export Measurement Report
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}