export default function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-700/20 border border-green-600/30 shadow-[0_0_15px_rgba(31,107,61,0.3)]">
        {/* Abstract 3D/Infrastructure SVG Logo */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-green-700">
          <path d="M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2z"></path>
          <path d="M12 22V11"></path>
          <path d="m4 6.5 8 4.5 8-4.5"></path>
          <circle cx="12" cy="11" r="2" fill="currentColor" className="text-emerald-500"></circle>
        </svg>
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-xl font-bold tracking-tight leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">PGI</span>
        </span>
        <span className="text-[10px] font-semibold tracking-[0.2em] text-gray-500 uppercase leading-none mt-1">Realtors</span>
      </div>
    </div>
  );
}
