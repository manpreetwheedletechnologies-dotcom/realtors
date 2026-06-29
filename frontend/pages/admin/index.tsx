import { 
  FolderKanban, 
  Box, 
  Activity, 
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';

export default function AdminOverview() {
  return (
    <AdminLayout title="Overview">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-1 text-gray-900">Platform Analytics</h1>
          <p className="text-gray-500 text-sm">Welcome back! Here's the latest data from your drone fleets.</p>
        </div>
        <button className="px-5 py-2.5 bg-green-700 text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-green-800 hover:-translate-y-0.5 transition-all">
          + New Scan
        </button>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { title: 'Active Projects', value: '24', icon: FolderKanban, color: 'from-green-500 to-green-600', trend: '+12% this month' },
          { title: 'Scanned Area', value: '1,250', unit: 'sq km', icon: Box, color: 'from-teal-500 to-teal-600', trend: '+450 sq km' },
          { title: 'Issues Detected', value: '12', icon: AlertCircle, color: 'from-red-500 to-orange-500', trend: '-3 since yesterday' },
          { title: 'AI Uptime', value: '99.9', unit: '%', icon: Activity, color: 'from-emerald-400 to-emerald-600', trend: 'Optimal Performance' }
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className={`absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${kpi.color} rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity`}></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center text-white shadow-lg`}>
                <kpi.icon className="w-6 h-6" />
              </div>
              <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-5 h-5" /></button>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1 relative z-10">{kpi.title}</h3>
            <div className="flex items-baseline gap-1 mb-2 relative z-10 text-gray-900">
              <span className="text-3xl font-extrabold tracking-tight">{kpi.value}</span>
              {kpi.unit && <span className="text-sm text-gray-500 font-medium">{kpi.unit}</span>}
            </div>
            <p className="text-xs text-gray-400 font-medium relative z-10">{kpi.trend}</p>
          </div>
        ))}
      </div>

      {/* RECENT PROJECTS TABLE */}
      <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-900">Recent Scans</h2>
          <button className="text-sm font-semibold text-green-700 hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-sm text-gray-500 bg-gray-50/50">
                <th className="px-8 py-4 font-semibold">Project Name</th>
                <th className="px-8 py-4 font-semibold">Location</th>
                <th className="px-8 py-4 font-semibold">Status</th>
                <th className="px-8 py-4 font-semibold">Processing Progress</th>
                <th className="px-8 py-4 font-semibold text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { name: 'Railway OHE Inspection', loc: 'Delhi NCR', status: 'Completed', progress: 100, date: 'Today, 10:45 AM', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500' },
                { name: 'Bridge Pillar Deflection', loc: 'Mumbai', status: 'Processing', progress: 68, date: 'Today, 08:30 AM', icon: Clock, color: 'text-green-600', bg: 'bg-green-600' },
                { name: 'Highway Asphalt Volume', loc: 'Bangalore', status: 'Processing', progress: 34, date: 'Yesterday', icon: Clock, color: 'text-green-600', bg: 'bg-green-600' },
                { name: 'Station Platform Clearance', loc: 'Kolkata', status: 'Completed', progress: 100, date: 'Jun 10, 2026', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500' }
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="font-bold text-gray-900 mb-1 group-hover:text-green-700 transition-colors cursor-pointer">{row.name}</div>
                    <div className="text-xs text-gray-500">ID: PGI-2026-{9000 + idx}</div>
                  </td>
                  <td className="px-8 py-5 text-sm font-medium text-gray-600">{row.loc}</td>
                  <td className="px-8 py-5">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold ${row.color} bg-current/10 border border-current/20`}>
                      <row.icon className="w-3.5 h-3.5" />
                      {row.status}
                    </div>
                  </td>
                  <td className="px-8 py-5 w-64">
                    <div className="flex items-center gap-3">
                      <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`h-full ${row.bg} rounded-full transition-all duration-1000 ease-out`} style={{ width: `${row.progress}%` }}></div>
                      </div>
                      <span className="text-xs font-bold text-gray-500 w-8 text-right">{row.progress}%</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-medium text-gray-500 text-right">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
