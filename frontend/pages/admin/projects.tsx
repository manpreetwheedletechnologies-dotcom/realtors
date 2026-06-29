import { Search, Filter, Plus, FileText, CheckCircle2, Clock } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';

export default function AdminProjects() {
  return (
    <AdminLayout title="Projects">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-1 text-gray-900">Project Management</h1>
          <p className="text-gray-500 text-sm">Manage, filter, and track all your infrastructure scanning projects.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium shadow-sm hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
            <Plus className="w-4 h-4" />
            New Project
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <FileText className="w-8 h-8 text-gray-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">No Active Projects Selected</h2>
        <p className="text-gray-500 max-w-md mx-auto mb-8">You haven't initiated any specific project views yet. Use the New Project button to start scanning a new site.</p>
      </div>
    </AdminLayout>
  );
}
