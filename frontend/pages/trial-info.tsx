import Head from 'next/head';
import { useRouter } from 'next/router';

export default function TrialInfo() {
  const router = useRouter();
  const { category } = router.query;
  const catName = category ? String(category).charAt(0).toUpperCase() + String(category).slice(1) : 'Module';

  return (
    <>
      <Head>
        <title>{catName} Trial - PGI Realtors</title>
      </Head>
      <main className="min-h-screen bg-stone-50 text-gray-800 transition-colors duration-300 pt-24 flex items-center">
        
        <section className="relative w-full py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(15,42,28,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,42,28,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
          
          <div className="relative z-10 container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 mb-6">
                  <span className="text-xs font-bold text-green-700 uppercase tracking-widest">Enterprise Sandbox</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  <span className="text-gray-900 block">Explore </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">{catName} Trial</span>
                </h1>
                <p className="text-lg text-gray-500 mb-10 leading-relaxed">
                  Experience the full capabilities of PGI Realtors for your {catName.toLowerCase()} projects with our interactive sandbox environment.
                </p>
                <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-[0_0_30px_rgba(47,158,91,0.4)] transition-all hover:-translate-y-1">
                  Access Sandbox Now
                </button>
              </div>
              
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative p-10 bg-[#0F2A1C] rounded-3xl border border-black/10 shadow-2xl">
                   <h3 className="text-white mb-8 font-bold text-2xl">Module Statistics</h3>
                   <div className="grid grid-cols-2 gap-8">
                     <div>
                       <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300 text-5xl font-bold mb-2">12k+</h4>
                       <p className="text-gray-400 text-sm font-medium tracking-wide uppercase">Active Scans</p>
                     </div>
                     <div>
                       <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-300 text-5xl font-bold mb-2">5M+</h4>
                       <p className="text-gray-400 text-sm font-medium tracking-wide uppercase">Data Points</p>
                     </div>
                   </div>
                   <div className="mt-10 pt-8 border-t border-white/10">
                     <p className="text-gray-400 text-sm flex items-center gap-2">
                       <span className="text-green-400">🔒</span> Available exclusively to verified enterprise accounts.
                     </p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
