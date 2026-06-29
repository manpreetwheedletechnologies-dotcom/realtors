import Head from 'next/head';
import { useState } from 'react';

export default function Videos() {
  const [activeFilter, setActiveFilter] = useState('All Videos');
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  const categories = ['All Videos', 'Railway', 'Bridge', 'Road', 'Design', 'Material', 'Merger Layer', 'Metro'];

  const categoryGradients: Record<string, string> = {
    railway: 'from-cyan-500 to-sky-500',
    bridge: 'from-violet-500 to-purple-500',
    road: 'from-lime-500 to-green-500',
    design: 'from-pink-500 to-rose-500',
    material: 'from-amber-500 to-orange-500',
    merger: 'from-emerald-500 to-teal-500',
    metro: 'from-[#FFED00] to-[#FF0000]',
    default: 'from-gray-500 to-gray-400'
  };

  const videos = [
    { id: 4, category: "railway", title: "Track Section - Interchange Points", description: "3D visualization of track switching point angles and defect detection analysis", url: "https://3dbharat.com/storage/videos/track_section-intercheniging_point_&_cant_angle.mp4", duration: "5:10" },
    { id: 5, category: "railway", title: "Electrical Section - OHE Measurements", description: "3D overhead electrical equipment mask measurements and wire analysis", url: "https://3dbharat.com/storage/videos/railway_section-ohe_pole_&_wire_measurements.mp4", duration: "4:35" },
    { id: 6, category: "railway", title: "Station & Footover Bridge", description: "analysis of railway station and footover bridge infrastructure", url: "https://3dbharat.com/storage/videos/construction_&_infrastructure_section-platform_measurement.mp4", duration: "6:15" },
    { id: 18, category: "railway", title: "Construction & Infrastructure - Station", description: "3D visualization of station and footover bridge construction infrastructure", url: "https://3dbharat.com/storage/videos/construction_and_infrastructure_section_-station&_footover_bridge.mp4", duration: "5:00" },
    { id: 19, category: "railway", title: "Electrical Section - OHE Mask", description: "3D overhead electrical equipment mask measurements and analysis", url: "https://3dbharat.com/storage/videos/electrical_section-ohe_mask_measurements.mp4", duration: "4:30" },
    { id: 20, category: "railway", title: "Track Section - Angle of Defect", description: "3D analysis of interchange points and angle of defect detection", url: "https://3dbharat.com/storage/videos/track_section-interchenging_points_angle_of_defect.mp4", duration: "4:45" },
    { id: 7, category: "bridge", title: "Bridge Section - Full Measurements", description: "Height, width, length, span, and pillar dimension measurements", url: "https://3dbharat.com/storage/videos/bridge_section-height,width,length,span,pillar_dimension.mp4", duration: "5:40" },
    { id: 22, category: "bridge", title: "Bridge Inspection & Mapping", description: "Comprehensive bridge inspection and 3D measurement workflow — span, piller, and deck analysis with point-cloud based mapping.", url: "https://3dbharat.miscos.in/storage/videos/Bridge_Video.mp4", duration: "4:20" },
    { id: 8, category: "road", title: "Road Section - Defect Analysis", description: "Pothole detection, road height, and width measurement analysis", url: "https://3dbharat.com/storage/videos/road_section-potholes,road_height,width.mp4", duration: "4:50" },
    { id: 23, category: "road", title: "Road Asset Mapping", description: "Asset mapping for road infrastructure — signage, markings and asset mapping street light signal pole on lane.", url: "https://3dbharat.miscos.in/storage/videos/Asset_Mapping_Video.mp4", duration: "3:50" },
    { id: 9, category: "road", title: "Tollbooth Section", description: "Complete tollbooth infrastructure and lane measurement analysis", url: "https://3dbharat.com/storage/videos/tollbooth_section.mp4", duration: "3:25" },
    { id: 1, category: "design", title: "Road Construction Design", description: "Complete 3D visualization of road construction design process and layer planning", url: "https://3dbharat.com/storage/videos/road_construction_design.mp4", duration: "3:45" },
    { id: 2, category: "material", title: "Road Construction Material Filling", description: "Detailed analysis of material filling layers and volume calculations", url: "https://3dbharat.com/storage/videos/road_construction_material_filling.mp4", duration: "4:20" },
    { id: 3, category: "merger", title: "Merger Layer Visualization", description: "Multi-layer merging and integration for unified 3D infrastructure view", url: "https://3dbharat.com/storage/videos/merger_layer.mp4", duration: "2:55" },
    { id: 21, category: "road", title: "Rolling GPS Tracking System", description: "Roller simulation tracking with real-time GPS positioning and movement analysis", url: "https://3dbharat.com/storage/videos/Roller_Simulation_Tracking.mp4", duration: "3:00" },
    { id: 24, category: "metro", title: "Metro Bridge Video", description: "3D visualization and measurement analysis of metro bridge infrastructure, structural dimensions, and span details", url: "https://3dbharat.miscos.in/storage/videos/Metro_Bridge_Video_2.mp4", duration: "4:00" }
  ];

  const filteredVideos = activeFilter === 'All Videos' 
    ? videos 
    : videos.filter(v => v.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <>
      <Head>
        <title>Videos - PGI Realtors</title>
      </Head>
      <main className="min-h-screen bg-stone-50 text-gray-800 transition-colors duration-300 pt-24">
        
        {/* HERO SECTION */}
        <section className="relative py-20 lg:py-24 overflow-hidden bg-gradient-to-br from-[#0F2A1C] via-[#15351F] to-[#0F2A1C]">
          <div className="absolute inset-0 bg-black/30 z-10"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] z-10" style={{ maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)' }}></div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-emerald-500/30 blur-3xl rounded-full mix-blend-screen animate-[spin_60s_linear_infinite] z-0"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lime-400/20 blur-3xl rounded-full mix-blend-screen animate-[spin_80s_linear_infinite_reverse] z-0"></div>

          <div className="relative z-20 container mx-auto px-4 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
              <span className="w-2.5 h-2.5 bg-white rounded-full animate-ping"></span>
              <span className="text-sm font-semibold text-white uppercase tracking-wider">Video Gallery • 16 Videos • 6 Categories</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-white relative">
              <span className="relative z-10">Infrastructure </span>
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[250px] h-4 blur-xl bg-gradient-to-r from-emerald-400/30 to-green-400/30 z-0"></span>
              <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-lime-300">Video Showcase</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10">
              Explore detailed video demonstrations of 3D analysis showcasing Design, Material, Merger Layer, and complete infrastructure workflows on PGI Realtors.
            </p>
          </div>
        </section>

        {/* FILTER BAR */}
        <section className="relative z-20 -mt-8 mb-12">
           <div className="container mx-auto px-4">
              <div className="flex flex-wrap items-center justify-center gap-3">
                 {categories.map(cat => {
                   const isActive = activeFilter === cat;
                   const grad = categoryGradients[cat.toLowerCase()] || categoryGradients.default;
                   return (
                     <button 
                       key={cat}
                       onClick={() => setActiveFilter(cat)}
                       className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${isActive ? `bg-gradient-to-r ${grad} text-white shadow-[0_0_20px_rgba(31,107,61,0.35)]` : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50 hover:text-gray-900 shadow-sm'}`}
                     >
                       {cat}
                     </button>
                   );
                 })}
              </div>
           </div>
        </section>

        {/* VIDEO GRID */}
        <section className="relative pb-24">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {filteredVideos.map((vid, idx) => {
                 const grad = categoryGradients[vid.category] || categoryGradients.default;
                 return (
                   <div key={idx} onClick={() => setSelectedVideo(vid)} className="group relative rounded-3xl bg-white border border-gray-200 overflow-hidden cursor-pointer hover:-translate-y-2 hover:scale-[1.02] shadow-sm hover:shadow-2xl hover:shadow-green-900/10 transition-all duration-500 flex flex-col">
                     
                     <div className="relative aspect-video bg-black/50 overflow-hidden">
                        <video src={vid.url} preload="metadata" muted className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" onMouseOver={e => (e.target as HTMLVideoElement).play()} onMouseOut={e => { const v = e.target as HTMLVideoElement; v.pause(); v.currentTime = 0; }}></video>
                        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider bg-gradient-to-r ${grad}`}>
                          {vid.category}
                        </div>
                        <div className="absolute top-4 right-4 px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-[10px] text-white">
                          {vid.duration}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r ${grad} scale-90 group-hover:scale-110 transition-transform shadow-lg`}>
                             <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                           </div>
                        </div>
                     </div>
                     <div className="p-6 flex-1 flex flex-col">
                       <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors line-clamp-1">{vid.title}</h3>
                       <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1">{vid.description}</p>
                     </div>
                     <div className={`h-1 w-full opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r ${grad}`}></div>
                   </div>
                 );
               })}
            </div>
          </div>
        </section>

        {/* MODAL */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 md:p-6 transition-opacity">
            <button onClick={() => setSelectedVideo(null)} className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xl transition-all hover:scale-110 z-10">&times;</button>
            <div className="w-full max-w-6xl flex flex-col items-center">
               <video src={selectedVideo.url} controls autoPlay className="w-full rounded-2xl shadow-[0_0_50px_rgba(31,107,61,0.3)] bg-black aspect-video"></video>
               <div className="mt-8 text-center w-full max-w-3xl">
                 <div className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold text-white uppercase tracking-wider bg-gradient-to-r ${categoryGradients[selectedVideo.category] || categoryGradients.default} mb-4`}>
                   {selectedVideo.category}
                 </div>
                 <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{selectedVideo.title}</h2>
                 <p className="text-gray-400 text-lg leading-relaxed">{selectedVideo.description}</p>
               </div>
            </div>
          </div>
        )}

      </main>
    </>
  );
}
