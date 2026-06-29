import { Box, Upload, Download, Eye } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';

export default function AdminModels() {
  return (
    <AdminLayout title="3D Models">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-1 text-gray-900">3D Model Repository</h1>
          <p className="text-gray-500 text-sm">View and manage your processed Point Clouds and Mesh Data.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-green-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-green-800 hover:-translate-y-0.5 transition-all">
          <Upload className="w-4 h-4" />
          Upload Dataset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="bg-white border border-gray-200 rounded-3xl overflow-hidden group hover:shadow-lg transition-all">
            <div className="h-48 bg-gray-100 relative overflow-hidden">
              <img src={`https://images.unsplash.com/photo-${1541888081156 + item}?q=80&w=600&auto=format&fit=crop`} className="w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:opacity-100 group-hover:mix-blend-normal transition-all duration-500" alt="3D Model Thumbnail" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <span className="px-2 py-1 bg-green-600 text-white text-xs font-bold rounded">.PLY Point Cloud</span>
                <span className="text-white text-xs font-medium">1.2 GB</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-gray-900 mb-1 truncate">Site Scan #{8000 + item}</h3>
              <p className="text-xs text-gray-500 mb-4">Captured on Jun 10, 2026</p>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors">
                  <Eye className="w-4 h-4" /> View
                </button>
                <button className="flex items-center justify-center p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
