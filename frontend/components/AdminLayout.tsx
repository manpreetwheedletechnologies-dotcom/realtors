import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  LayoutDashboard,
  FolderKanban,
  Box,
  Activity,
  Settings,
  Bell,
  Search,
  Menu,
  LogOut,
  Film,
  Image as ImageIcon,
  Users,
  MapPin,
  Mail,
} from 'lucide-react';
import Logo from './Logo';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

function timeAgo(dateStr: string) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function AdminLayout({ children, title = "Admin Panel" }: { children: React.ReactNode, title?: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  const getAuthToken = () => {
    if (typeof document === 'undefined') return '';
    const value = `; ${document.cookie}`;
    const parts = value.split(`; auth_token=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
    return '';
  };

  const handleLogout = () => {
    // Clear the auth cookie the middleware checks for, then redirect.
    // Previously this only redirected without clearing the cookie, so
    // "logging out" and navigating back to /admin would still let you in.
    document.cookie = 'auth_token=; path=/; max-age=0; SameSite=Lax';
    router.push('/login');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/admin' },
    { icon: FolderKanban, label: 'Manage Plots', path: '/admin/plots' },
    { icon: Film, label: 'Manage Videos', path: '/admin/videos' },
    { icon: ImageIcon, label: 'Hero Section', path: '/admin/hero' },
    { icon: Users, label: 'Leads', path: '/admin/leads' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' }
  ];

  // ---------- SEARCH ----------
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [plotResults, setPlotResults] = useState<any[]>([]);
  const [leadResults, setLeadResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  const navMatches = navItems.filter((item) =>
    searchQuery.trim().length > 0 &&
    item.label.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  useEffect(() => {
    const q = searchQuery.trim();
    if (q.length < 2) {
      setPlotResults([]);
      setLeadResults([]);
      return;
    }

    setSearching(true);
    const token = getAuthToken();
    const timeout = setTimeout(() => {
      Promise.all([
        fetch(`${API_URL}/api/v1/lands`).then((r) => (r.ok ? r.json() : [])),
        fetch(`${API_URL}/api/v1/leads`, {
          headers: { Authorization: `Bearer ${token}` },
        }).then((r) => (r.ok ? r.json() : [])),
      ])
        .then(([lands, leads]) => {
          const ql = q.toLowerCase();
          const matchedPlots = (Array.isArray(lands) ? lands : [])
            .filter(
              (p: any) =>
                p.title?.toLowerCase().includes(ql) ||
                p.location?.toLowerCase().includes(ql)
            )
            .slice(0, 4);
          const matchedLeads = (Array.isArray(leads) ? leads : [])
            .filter(
              (l: any) =>
                `${l.firstName} ${l.lastName || ''}`.toLowerCase().includes(ql) ||
                l.email?.toLowerCase().includes(ql) ||
                l.phone?.toLowerCase().includes(ql)
            )
            .slice(0, 4);
          setPlotResults(matchedPlots);
          setLeadResults(matchedLeads);
        })
        .catch((err) => console.error('Error searching:', err))
        .finally(() => setSearching(false));
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const hasSearchResults = navMatches.length > 0 || plotResults.length > 0 || leadResults.length > 0;

  const goTo = (path: string) => {
    router.push(path);
    setSearchOpen(false);
    setSearchQuery('');
  };

  // ---------- NOTIFICATIONS ----------
  const [notifOpen, setNotifOpen] = useState(false);
  const [newLeads, setNewLeads] = useState<any[]>([]);
  const notifBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) return;
    fetch(`${API_URL}/api/v1/leads`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        const leads = Array.isArray(data) ? data : [];
        setNewLeads(leads.filter((l: any) => l.status === 'new').slice(0, 6));
      })
      .catch((err) => console.error('Error loading notifications:', err));
  }, [router.pathname]);

  // ---------- CLOSE DROPDOWNS ON OUTSIDE CLICK ----------
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
      if (notifBoxRef.current && !notifBoxRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <Head>
        <title>{title} - PGI Realtors</title>
      </Head>
      
      <div className="min-h-screen bg-stone-100 text-gray-800 font-sans flex overflow-hidden">
        
        {/* SIDEBAR */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} flex-shrink-0 transition-all duration-300 bg-white border-r border-gray-200 flex flex-col z-20 shadow-xl`}>
          <div className="h-20 flex items-center justify-between px-4 border-b border-gray-200">
            {sidebarOpen && (
              <div className="transform scale-75 origin-left cursor-pointer" onClick={() => router.push('/')}>
                <Logo />
              </div>
            )}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors mx-auto">
              <Menu className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto scrollbar-hide">
            {navItems.map((item, idx) => {
              const isActive = router.pathname === item.path;
              return (
                <button 
                  key={idx} 
                  onClick={() => router.push(item.path)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-md shadow-green-500/20' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span className="truncate">{item.label}</span>}
                </button>
              )
            })}
          </nav>
          
          <div className="p-4 border-t border-gray-200">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 transition-colors">
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          
          {/* TOP APP BAR */}
          <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-8 z-10 shrink-0">

            {/* SEARCH */}
            <div ref={searchBoxRef} className="relative w-full max-w-sm">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                placeholder="Search plots, leads, sections..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-transparent rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:bg-white transition-colors"
              />

              {searchOpen && searchQuery.trim().length > 0 && (
                <div className="absolute top-full left-0 mt-2 w-96 max-w-[90vw] bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-30">
                  {searching && (
                    <div className="px-4 py-3 text-xs text-gray-400 font-medium">Searching...</div>
                  )}

                  {!searching && !hasSearchResults && (
                    <div className="px-4 py-6 text-center text-sm text-gray-400 font-medium">
                      No results for "{searchQuery}"
                    </div>
                  )}

                  {navMatches.length > 0 && (
                    <div className="py-2">
                      <p className="px-4 pb-1 text-[11px] font-bold uppercase tracking-wide text-gray-400">Sections</p>
                      {navMatches.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => goTo(item.path)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-left transition-colors"
                        >
                          <item.icon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-800">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {plotResults.length > 0 && (
                    <div className="py-2 border-t border-gray-100">
                      <p className="px-4 pb-1 text-[11px] font-bold uppercase tracking-wide text-gray-400">Plots</p>
                      {plotResults.map((plot) => (
                        <button
                          key={plot._id}
                          onClick={() => goTo('/admin/plots')}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-left transition-colors"
                        >
                          <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">{plot.title}</p>
                            <p className="text-xs text-gray-400 truncate">{plot.location}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {leadResults.length > 0 && (
                    <div className="py-2 border-t border-gray-100">
                      <p className="px-4 pb-1 text-[11px] font-bold uppercase tracking-wide text-gray-400">Leads</p>
                      {leadResults.map((lead) => (
                        <button
                          key={lead._id}
                          onClick={() => goTo('/admin/leads')}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-left transition-colors"
                        >
                          <Users className="w-4 h-4 text-gray-400 shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">{lead.firstName} {lead.lastName}</p>
                            <p className="text-xs text-gray-400 truncate">{lead.email}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 ml-auto">
              {/* NOTIFICATIONS */}
              <div ref={notifBoxRef} className="relative">
                <button
                  onClick={() => setNotifOpen((v) => !v)}
                  className="relative p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
                >
                  <Bell className="w-5 h-5" />
                  {newLeads.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  )}
                </button>

                {notifOpen && (
                  <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-30">
                    <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                      <p className="text-sm font-bold text-gray-900">Notifications</p>
                      {newLeads.length > 0 && (
                        <span className="text-[11px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                          {newLeads.length} new
                        </span>
                      )}
                    </div>

                    {newLeads.length === 0 ? (
                      <div className="px-4 py-8 text-center text-sm text-gray-400 font-medium">
                        You're all caught up.
                      </div>
                    ) : (
                      <div className="max-h-80 overflow-y-auto">
                        {newLeads.map((lead) => (
                          <button
                            key={lead._id}
                            onClick={() => goTo('/admin/leads')}
                            className="w-full flex items-start gap-3 px-4 py-3 hover:bg-gray-50 text-left transition-colors border-b border-gray-50 last:border-0"
                          >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center text-white font-bold text-xs shrink-0 mt-0.5">
                              {lead.firstName?.[0]?.toUpperCase() || '?'}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-semibold text-gray-900 truncate">
                                New lead: {lead.firstName} {lead.lastName}
                              </p>
                              <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                <Mail className="w-3 h-3" /> {lead.email}
                              </p>
                              <p className="text-[11px] text-gray-400 mt-0.5">{timeAgo(lead.createdAt)}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    <button
                      onClick={() => goTo('/admin/leads')}
                      className="w-full text-center py-3 text-sm font-semibold text-green-700 hover:bg-green-50 transition-colors border-t border-gray-100"
                    >
                      View all leads
                    </button>
                  </div>
                )}
              </div>

              <div className="w-px h-6 bg-gray-300 mx-2"></div>

              {/* PROFILE — click goes straight to Settings. Letter-initial badge instead of a photo. */}
              <button
                onClick={() => router.push('/admin/settings')}
                className="flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-600 to-emerald-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  A
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-bold leading-tight text-gray-900">Admin</p>
                </div>
              </button>
            </div>
          </header>

          {/* PAGE CONTENT */}
          <main className="flex-1 overflow-y-auto p-8 scrollbar-hide">
            {children}
            <div className="h-12"></div> {/* Bottom Padding */}
          </main>
        </div>
      </div>
    </>
  );
}