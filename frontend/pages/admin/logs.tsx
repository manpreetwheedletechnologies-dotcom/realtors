import { Activity, RefreshCcw, Wifi } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';

export default function AdminLogs() {
  return (
    <AdminLayout title="Drone Logs">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-1 text-gray-900">Drone Telemetry Logs</h1>
          <p className="text-gray-500 text-sm">Real-time status and historical logs from your drone fleet.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium shadow-sm hover:bg-gray-50 transition-colors">
          <RefreshCcw className="w-4 h-4" />
          Sync
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="font-semibold text-gray-900">Live Connection: 3 Drones Active</span>
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((log) => (
            <div key={log} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-green-100 text-green-700 flex items-center justify-center">
                  <Wifi className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900">DJI Matrice 300 RTK - Unit {log}</h4>
                  <p className="text-xs text-gray-500">Sync completed successfully • 142 images uploaded</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">10:4{log} AM</div>
                <div className="text-xs text-gray-500">Today</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
