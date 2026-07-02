import { useState, useMemo, useRef, ReactNode, ChangeEvent } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import PageHero from '../components/Pagehero';
import FAQ from '../components/FAQ';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/Ctasection';

// ---- Unit conversion helpers -------------------------------------------
const LENGTH_TO_FT: Record<string, number> = { ft: 1, m: 3.28084, yd: 3, in: 1 / 12 };
const LENGTH_UNITS = [
  { value: 'ft', label: 'Feet (ft)' },
  { value: 'm', label: 'Meters (m)' },
  { value: 'yd', label: 'Yards (yd)' },
  { value: 'in', label: 'Inches (in)' }
];

const toFt = (value: string, unit: string): number => (parseFloat(value) || 0) * (LENGTH_TO_FT[unit] || 1);

const areaFromSqFt = (sqft: number) => ({
  sqft: sqft,
  sqyd: sqft / 9,
  sqm: sqft / 10.7639,
  acres: sqft / 43560,
  hectares: sqft / 107639,
  sqkm: sqft / 10763910
});

const fmt = (n: number, decimals = 2): string => {
  if (!isFinite(n)) return '0';
  return n.toLocaleString('en-IN', { maximumFractionDigits: decimals, minimumFractionDigits: 0 });
};

const DISTANCE_TO_FT: Record<string, number> = { ft: 1, m: 3.28084, yd: 3, km: 3280.84, mi: 5280 };
const DISTANCE_UNITS = [
  { value: 'ft', label: 'Feet' },
  { value: 'm', label: 'Meters' },
  { value: 'yd', label: 'Yards' },
  { value: 'km', label: 'Kilometers' },
  { value: 'mi', label: 'Miles' }
];

const tools = [
  { id: 'area', name: 'Area Calculator', icon: '📐', description: 'Calculate land area for any shape' },
  { id: 'distance', name: 'Distance & Perimeter', icon: '📏', description: 'Convert distances and add up boundary lengths' },
  { id: 'elevation', name: 'Elevation Analysis', icon: '⛰️', description: 'Analyze slope, grade, and elevation change' },
  { id: 'construction', name: 'Construction Estimator', icon: '🏗️', description: 'Estimate construction costs and materials' }
];

export default function MeasurementTools() {
  const [activeTool, setActiveTool] = useState<string>('area');
  const calculatorRef = useRef<HTMLDivElement>(null);

  const selectTool = (id: string) => {
    setActiveTool(id);
    calculatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <Head>
        <title>Measurement Tools | PGI Land Realtors</title>
        <meta name="description" content="Professional land measurement tools — area calculator, distance & perimeter converter, elevation analysis, and construction cost estimator." />
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-gray-800">
        <PageHero
          image="https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?w=1600"
          badge="🛠️ Advanced Tools"
          titleLine1="Land Measurement"
          titleLine2="& Analysis"
          subtitle="Four working calculators for area, distance, elevation, and construction cost — all in one place."
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          {/* Tool selector cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {tools.map((tool, i) => (
              <motion.button
                key={tool.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5, boxShadow: '0 20px 50px rgba(16,185,129,0.2)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => selectTool(tool.id)}
                className={`text-left p-6 bg-white rounded-2xl shadow-lg transition-all duration-300 cursor-pointer ${
                  activeTool === tool.id 
                    ? 'border-2 border-emerald-500 ring-4 ring-emerald-100 shadow-emerald-100 transform scale-105' 
                    : 'border-2 border-transparent hover:border-emerald-300 hover:shadow-xl'
                }`}
              >
                <div className="text-4xl mb-3">{tool.icon}</div>
                <h4 className="text-base font-bold mb-2 text-gray-800">{tool.name}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{tool.description}</p>
                {activeTool === tool.id && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-3 text-emerald-600 text-xs font-semibold"
                  >
                    ● Active
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>

          {/* Active calculator */}
          <div ref={calculatorRef} className="scroll-mt-24">
            <AnimatePresence mode="wait">
              {activeTool === 'area' && <AreaCalculator key="area" />}
              {activeTool === 'distance' && <DistancePerimeterCalculator key="distance" />}
              {activeTool === 'elevation' && <ElevationCalculator key="elevation" />}
              {activeTool === 'construction' && <ConstructionEstimator key="construction" />}
            </AnimatePresence>
          </div>
        </div>
        <FAQ/>
        <Testimonials/>
        <CTASection/>
      </main>
    </>
  );
}

// ---------------------------------------------------------------------
// Shared card wrapper for consistent transitions
// ---------------------------------------------------------------------
interface ToolCardProps {
  title: string;
  icon: string;
  children: ReactNode;
}

function ToolCard({ title, icon, children }: ToolCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 hover:shadow-3xl transition-shadow duration-300"
    >
      <div className="flex items-center gap-3 mb-8 pb-4 border-b-2 border-emerald-100">
        <span className="text-4xl">{icon}</span>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
          {title}
        </h3>
        <span className="ml-auto text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium">
          Live Calculator
        </span>
      </div>
      {children}
    </motion.div>
  );
}

function exportReport(title: string, lines: string[]) {
  const content = [
    `PGI Land Realtors — ${title}`,
    `Generated: ${new Date().toLocaleString('en-IN')}`,
    '='.repeat(50),
    '',
    ...lines,
    '',
    '='.repeat(50),
    'Note: figures are estimates for planning purposes only.'
  ].join('\n');
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title.toLowerCase().replace(/\s+/g, '-')}-report.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ---------------------------------------------------------------------
// AREA CALCULATOR
// ---------------------------------------------------------------------
type Shape = 'rectangle' | 'square' | 'circle' | 'triangle';

interface AreaDims {
  length: string;
  width: string;
  side: string;
  radius: string;
  base: string;
  height: string;
}

function AreaCalculator() {
  const [shape, setShape] = useState<Shape>('rectangle');
  const [unit, setUnit] = useState<string>('ft');
  const [dims, setDims] = useState<AreaDims>({ length: '', width: '', side: '', radius: '', base: '', height: '' });

  const set = (key: keyof AreaDims) => (e: ChangeEvent<HTMLInputElement>) => setDims({ ...dims, [key]: e.target.value });

  const { areaFt, perimeterFt, hasInput } = useMemo(() => {
    const l = toFt(dims.length, unit);
    const w = toFt(dims.width, unit);
    const s = toFt(dims.side, unit);
    const r = toFt(dims.radius, unit);
    const b = toFt(dims.base, unit);
    const h = toFt(dims.height, unit);

    switch (shape) {
      case 'rectangle':
        return { areaFt: l * w, perimeterFt: 2 * (l + w) as number | null, hasInput: l > 0 && w > 0 };
      case 'square':
        return { areaFt: s * s, perimeterFt: 4 * s as number | null, hasInput: s > 0 };
      case 'circle':
        return { areaFt: Math.PI * r * r, perimeterFt: 2 * Math.PI * r as number | null, hasInput: r > 0 };
      case 'triangle':
        return { areaFt: 0.5 * b * h, perimeterFt: null as number | null, hasInput: b > 0 && h > 0 };
      default:
        return { areaFt: 0, perimeterFt: 0 as number | null, hasInput: false };
    }
  }, [shape, dims, unit]);

  const areas = areaFromSqFt(areaFt);

  const handleExport = () => {
    exportReport('Area Calculation', [
      `Shape: ${shape.charAt(0).toUpperCase() + shape.slice(1)}`,
      `Unit: ${unit}`,
      '',
      `📐 Area Results:`,
      `  • ${fmt(areas.sqft)} sq.ft`,
      `  • ${fmt(areas.sqyd)} sq.yds`,
      `  • ${fmt(areas.sqm)} sq.m`,
      `  • ${fmt(areas.acres, 4)} acres`,
      `  • ${fmt(areas.hectares, 4)} hectares`,
      perimeterFt !== null ? `  • ${fmt(perimeterFt)} ft (perimeter)` : ''
    ].filter(Boolean));
  };

  return (
    <ToolCard title="Area Calculator" icon="📐">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">📐 Select Shape</label>
            <div className="flex flex-wrap gap-2">
              {(['rectangle', 'square', 'circle', 'triangle'] as Shape[]).map((s) => (
                <motion.button
                  key={s}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShape(s)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium capitalize transition-all duration-200 ${
                    shape === s 
                      ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {s === 'rectangle' && '▭ '}
                  {s === 'square' && '▢ '}
                  {s === 'circle' && '◯ '}
                  {s === 'triangle' && '△ '}
                  {s}
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">📏 Unit of Measurement</label>
            <select
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-200 bg-white"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            >
              {LENGTH_UNITS.map((u) => (
                <option key={u.value} value={u.value}>{u.label}</option>
              ))}
            </select>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-3 font-medium">📝 Enter Dimensions</p>
            {shape === 'rectangle' && (
              <div className="grid grid-cols-2 gap-3">
                <NumberField label={`Length (${unit})`} value={dims.length} onChange={set('length')} />
                <NumberField label={`Width (${unit})`} value={dims.width} onChange={set('width')} />
              </div>
            )}
            {shape === 'square' && (
              <NumberField label={`Side Length (${unit})`} value={dims.side} onChange={set('side')} />
            )}
            {shape === 'circle' && (
              <NumberField label={`Radius (${unit})`} value={dims.radius} onChange={set('radius')} />
            )}
            {shape === 'triangle' && (
              <div className="grid grid-cols-2 gap-3">
                <NumberField label={`Base (${unit})`} value={dims.base} onChange={set('base')} />
                <NumberField label={`Height (${unit})`} value={dims.height} onChange={set('height')} />
              </div>
            )}
          </div>
        </div>

        <ResultsPanel hasInput={hasInput} shape={shape}>
          <div className="space-y-3">
            <ResultRow label="Square Feet" value={`${fmt(areas.sqft)} sq.ft`} highlight />
            <ResultRow label="Square Yards" value={`${fmt(areas.sqyd)} sq.yds`} />
            <ResultRow label="Square Meters" value={`${fmt(areas.sqm)} sq.m`} />
            <ResultRow label="Acres" value={`${fmt(areas.acres, 4)} acres`} />
            <ResultRow label="Hectares" value={`${fmt(areas.hectares, 4)} ha`} />
            {perimeterFt !== null && (
              <ResultRow 
                label={shape === 'circle' ? 'Circumference' : 'Perimeter'} 
                value={`${fmt(perimeterFt)} ft`} 
                highlight 
              />
            )}
          </div>
          <ExportButton onClick={handleExport} disabled={!hasInput} />
        </ResultsPanel>
      </div>
    </ToolCard>
  );
}

// ---------------------------------------------------------------------
// DISTANCE & PERIMETER
// ---------------------------------------------------------------------
function DistancePerimeterCalculator() {
  const [mode, setMode] = useState<'convert' | 'perimeter'>('convert');

  // Convert mode
  const [value, setValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('ft');

  const convertedFt = (parseFloat(value) || 0) * (DISTANCE_TO_FT[fromUnit] || 1);
  const conversions = {
    ft: convertedFt,
    m: convertedFt / 3.28084,
    yd: convertedFt / 3,
    km: convertedFt / 3280.84,
    mi: convertedFt / 5280
  };

  // Perimeter mode
  const [sides, setSides] = useState<string[]>(['', '', '', '']);
  const [sideUnit, setSideUnit] = useState<string>('ft');
  const totalFt = sides.reduce((sum, s) => sum + toFt(s, sideUnit), 0);
  const addSide = () => setSides([...sides, '']);
  const removeSide = (i: number) => setSides(sides.filter((_, idx) => idx !== i));
  const updateSide = (i: number, val: string) => setSides(sides.map((s, idx) => (idx === i ? val : s)));

  const handleExportConvert = () => {
    exportReport('Distance Conversion', [
      `Input: ${value || 0} ${fromUnit}`,
      '',
      '📏 Converted Values:',
      `  • ${fmt(conversions.ft)} feet`,
      `  • ${fmt(conversions.m)} meters`,
      `  • ${fmt(conversions.yd)} yards`,
      `  • ${fmt(conversions.km, 4)} kilometers`,
      `  • ${fmt(conversions.mi, 4)} miles`
    ]);
  };

  const handleExportPerimeter = () => {
    exportReport('Perimeter Calculation', [
      `Sides (${sideUnit}): ${sides.filter(Boolean).join(', ') || 'none entered'}`,
      '',
      '📏 Perimeter Results:',
      `  • ${fmt(totalFt)} feet`,
      `  • ${fmt(totalFt / 3.28084)} meters`,
      `  • ${fmt(totalFt / 3)} yards`
    ]);
  };

  return (
    <ToolCard title="Distance & Perimeter" icon="📏">
      <div className="flex gap-2 mb-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setMode('convert')}
          className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
            mode === 'convert' ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          🔄 Unit Converter
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setMode('perimeter')}
          className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
            mode === 'perimeter' ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          📐 Boundary Perimeter
        </motion.button>
      </div>

      {mode === 'convert' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <NumberField label="📝 Enter Distance" value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">📏 Convert From</label>
              <select
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-200 bg-white"
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
              >
                {DISTANCE_UNITS.map((u) => (
                  <option key={u.value} value={u.value}>{u.label}</option>
                ))}
              </select>
            </div>
          </div>
          <ResultsPanel hasInput={!!value}>
            <div className="space-y-3">
              <ResultRow label="Feet" value={`${fmt(conversions.ft)} ft`} />
              <ResultRow label="Meters" value={`${fmt(conversions.m)} m`} />
              <ResultRow label="Yards" value={`${fmt(conversions.yd)} yd`} />
              <ResultRow label="Kilometers" value={`${fmt(conversions.km, 4)} km`} />
              <ResultRow label="Miles" value={`${fmt(conversions.mi, 4)} mi`} highlight />
            </div>
            <ExportButton onClick={handleExportConvert} disabled={!value} />
          </ResultsPanel>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">📏 Unit</label>
              <select
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-200 bg-white"
                value={sideUnit}
                onChange={(e) => setSideUnit(e.target.value)}
              >
                {LENGTH_UNITS.map((u) => (
                  <option key={u.value} value={u.value}>{u.label}</option>
                ))}
              </select>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-3 font-medium">📝 Enter Side Lengths</p>
              <div className="space-y-2">
                {sides.map((s, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input
                      type="number"
                      className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-200 bg-white"
                      value={s}
                      onChange={(e) => updateSide(i, e.target.value)}
                      placeholder={`Side ${i + 1}`}
                    />
                    {sides.length > 2 && (
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeSide(i)} 
                        className="text-gray-400 hover:text-red-500 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
                        aria-label="Remove side"
                      >
                        ✕
                      </motion.button>
                    )}
                  </div>
                ))}
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={addSide} 
                  className="text-sm text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
                >
                  + Add Side
                </motion.button>
              </div>
            </div>
          </div>
          <ResultsPanel hasInput={sides.some(Boolean)}>
            <div className="space-y-3">
              <ResultRow label="Total (feet)" value={`${fmt(totalFt)} ft`} highlight />
              <ResultRow label="Total (meters)" value={`${fmt(totalFt / 3.28084)} m`} />
              <ResultRow label="Total (yards)" value={`${fmt(totalFt / 3)} yd`} />
            </div>
            <ExportButton onClick={handleExportPerimeter} disabled={!sides.some(Boolean)} />
          </ResultsPanel>
        </div>
      )}
    </ToolCard>
  );
}

// ---------------------------------------------------------------------
// ELEVATION / SLOPE
// ---------------------------------------------------------------------
function ElevationCalculator() {
  const [rise, setRise] = useState<string>('');
  const [run, setRun] = useState<string>('');
  const [unit, setUnit] = useState<string>('ft');

  const riseFt = toFt(rise, unit);
  const runFt = toFt(run, unit);
  const hasInput = riseFt > 0 && runFt > 0;

  const slopePercent = hasInput ? (riseFt / runFt) * 100 : 0;
  const angleDeg = hasInput ? Math.atan(riseFt / runFt) * (180 / Math.PI) : 0;
  const ratio = hasInput ? runFt / riseFt : 0;

  let grading = 'N/A';
  let gradingColor = 'text-gray-400';
  if (hasInput) {
    if (slopePercent < 2) { grading = '✅ Flat — minimal grading needed'; gradingColor = 'text-green-600'; }
    else if (slopePercent < 8) { grading = '🟡 Gentle slope — standard grading'; gradingColor = 'text-yellow-600'; }
    else if (slopePercent < 15) { grading = '🟠 Moderate slope — retaining may help'; gradingColor = 'text-orange-600'; }
    else { grading = '🔴 Steep — engineering review recommended'; gradingColor = 'text-red-600'; }
  }

  const handleExport = () => {
    exportReport('Elevation & Slope Analysis', [
      `Rise: ${rise || 0} ${unit}`,
      `Run: ${run || 0} ${unit}`,
      '',
      '📊 Analysis Results:',
      `  • Slope: ${fmt(slopePercent)}%`,
      `  • Angle: ${fmt(angleDeg)}°`,
      `  • Ratio: 1 in ${fmt(ratio)}`,
      `  • Assessment: ${grading.replace(/[✅🟡🟠🔴]\s*/, '')}`
    ]);
  };

  return (
    <ToolCard title="Elevation & Slope Analysis" icon="⛰️">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">📏 Unit</label>
            <select
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-200 bg-white"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            >
              {LENGTH_UNITS.map((u) => (
                <option key={u.value} value={u.value}>{u.label}</option>
              ))}
            </select>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-3 font-medium">📝 Enter Measurements</p>
            <div className="grid grid-cols-2 gap-3">
              <NumberField label={`⬆ Rise (${unit})`} value={rise} onChange={(e) => setRise(e.target.value)} />
              <NumberField label={`➡ Run (${unit})`} value={run} onChange={(e) => setRun(e.target.value)} />
            </div>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <p className="text-xs text-gray-600 leading-relaxed">
              💡 <span className="font-semibold">Rise</span> is the vertical elevation difference between two points; 
              <span className="font-semibold"> Run</span> is the horizontal distance between them.
            </p>
          </div>
        </div>
        <ResultsPanel hasInput={hasInput}>
          <div className="space-y-3">
            <ResultRow label="Slope" value={`${fmt(slopePercent)}%`} highlight />
            <ResultRow label="Angle" value={`${fmt(angleDeg)}°`} />
            <ResultRow label="Ratio" value={`1 in ${fmt(ratio)}`} />
          </div>
          <div className="pt-4 mt-4 border-t-2 border-emerald-200">
            <p className={`text-sm font-semibold ${gradingColor}`}>
              {hasInput ? grading : '📊 Enter rise and run to see assessment'}
            </p>
          </div>
          <ExportButton onClick={handleExport} disabled={!hasInput} />
        </ResultsPanel>
      </div>
    </ToolCard>
  );
}

// ---------------------------------------------------------------------
// CONSTRUCTION ESTIMATOR
// ---------------------------------------------------------------------
function ConstructionEstimator() {
  const [area, setArea] = useState<string>('');
  const [rate, setRate] = useState<string>('1800');
  const [floors, setFloors] = useState<string>('1');

  const a = parseFloat(area) || 0;
  const r = parseFloat(rate) || 0;
  const f = parseFloat(floors) || 1;
  const hasInput = a > 0 && r > 0;

  const totalArea = a * f;
  const totalCost = totalArea * r;
  const breakdown = {
    materials: totalCost * 0.55,
    labor: totalCost * 0.3,
    finishing: totalCost * 0.1,
    other: totalCost * 0.05
  };

  const handleExport = () => {
    exportReport('Construction Cost Estimate', [
      `Built-up area per floor: ${fmt(a)} sq.ft`,
      `Floors: ${f}`,
      `Rate: ₹${fmt(r)} / sq.ft`,
      '',
      '📊 Cost Summary:',
      `  • Total built-up area: ${fmt(totalArea)} sq.ft`,
      `  • Estimated total cost: ₹${fmt(totalCost)}`,
      '',
      '💰 Cost Breakdown:',
      `  • Materials (55%): ₹${fmt(breakdown.materials)}`,
      `  • Labor (30%): ₹${fmt(breakdown.labor)}`,
      `  • Finishing (10%): ₹${fmt(breakdown.finishing)}`,
      `  • Other (5%): ₹${fmt(breakdown.other)}`
    ]);
  };

  return (
    <ToolCard title="Construction Cost Estimator" icon="🏗️">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-3 font-medium">📝 Project Details</p>
            <NumberField label="Built-up area per floor (sq.ft)" value={area} onChange={(e) => setArea(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <NumberField label="Number of floors" value={floors} onChange={(e) => setFloors(e.target.value)} />
            <NumberField label="Rate (₹ / sq.ft)" value={rate} onChange={(e) => setRate(e.target.value)} />
          </div>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <p className="text-xs text-gray-600 leading-relaxed">
              💡 Default rate (₹1,800/sq.ft) is a rough mid-range construction estimate for India — 
              adjust based on your city, material grade, and finish level.
            </p>
          </div>
        </div>
        <ResultsPanel hasInput={hasInput}>
          <div className="space-y-3">
            <ResultRow label="Total built-up area" value={`${fmt(totalArea)} sq.ft`} />
            <ResultRow label="Estimated total cost" value={`₹${fmt(totalCost)}`} highlight />
          </div>
          <div className="pt-4 mt-4 border-t-2 border-emerald-200">
            <p className="text-xs font-semibold text-gray-600 mb-2">💰 Cost Breakdown</p>
            <div className="space-y-1.5">
              <ResultRow label="Materials (55%)" value={`₹${fmt(breakdown.materials)}`} small />
              <ResultRow label="Labor (30%)" value={`₹${fmt(breakdown.labor)}`} small />
              <ResultRow label="Finishing (10%)" value={`₹${fmt(breakdown.finishing)}`} small />
              <ResultRow label="Other (5%)" value={`₹${fmt(breakdown.other)}`} small />
            </div>
          </div>
          <ExportButton onClick={handleExport} disabled={!hasInput} />
        </ResultsPanel>
      </div>
    </ToolCard>
  );
}

// ---------------------------------------------------------------------
// Shared small UI pieces
// ---------------------------------------------------------------------
interface NumberFieldProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function NumberField({ label, value, onChange }: NumberFieldProps) {
  return (
    <div className="mb-3">
      <label className="text-sm font-medium text-gray-700 block mb-1.5">{label}</label>
      <input
        type="number"
        min="0"
        step="any"
        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-200 bg-white"
        value={value}
        onChange={onChange}
        placeholder="Enter value"
      />
    </div>
  );
}

interface ResultsPanelProps {
  hasInput: boolean;
  children: ReactNode;
  shape?: string;
}

function ResultsPanel({ hasInput, children }: ResultsPanelProps) {
  return (
    <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-2xl border-2 border-emerald-200 h-fit shadow-inner">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">📊</span>
        <h4 className="text-sm font-bold text-gray-700">Results</h4>
        {hasInput && (
          <span className="ml-auto text-xs bg-green-200 text-green-700 px-2 py-0.5 rounded-full font-medium">
            Live
          </span>
        )}
      </div>
      {hasInput ? (
        <div className="space-y-3">{children}</div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <span className="text-4xl mb-3">📝</span>
          <p className="text-sm text-gray-400">Enter values to see live results</p>
          <p className="text-xs text-gray-300 mt-1">All calculations update in real-time</p>
        </div>
      )}
    </div>
  );
}

interface ResultRowProps {
  label: string;
  value: string;
  highlight?: boolean;
  small?: boolean;
}

function ResultRow({ label, value, highlight, small }: ResultRowProps) {
  return (
    <div className="flex justify-between items-center py-1.5 px-2 rounded-lg hover:bg-white/50 transition-colors">
      <span className={`${small ? 'text-xs' : 'text-sm'} text-gray-600 font-medium`}>{label}</span>
      <span className={`font-bold ${highlight ? 'text-emerald-700 text-lg' : small ? 'text-xs text-gray-700' : 'text-emerald-600'}`}>
        {value}
      </span>
    </div>
  );
}

interface ExportButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

function ExportButton({ onClick, disabled }: ExportButtonProps) {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      className="w-full mt-4 px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-md"
    >
      📄 Export Report
    </motion.button>
  );
}