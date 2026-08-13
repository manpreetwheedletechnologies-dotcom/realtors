import { useState, useEffect } from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, ImageIcon, Save } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { resolveMediaUrl } from '../../utils/resolveMediaUrl';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function AdminHero() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [savedMsg, setSavedMsg] = useState('');

  const getAuthToken = () => {
    if (typeof document === 'undefined') return '';
    const value = `; ${document.cookie}`;
    const parts = value.split(`; auth_token=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
    return '';
  };

  const resolveSrc = (img: string) => resolveMediaUrl(img);

  const fetchHero = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/v1/hero`);
      if (!res.ok) throw new Error('Failed to fetch hero images');
      const data = await res.json();
      setImages(Array.isArray(data.images) ? data.images : []);
    } catch (err: any) {
      setError(err.message || 'Error loading hero images');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHero();
  }, []);

  // Persists the given image list to the backend. Used both by the manual
  // "Save Changes" button (for reorder/remove) AND automatically right
  // after a successful upload — previously an upload only updated local
  // state, so if the admin didn't separately click Save, the uploaded
  // image's path never made it into the database at all.
  const persistImages = async (list: string[]) => {
    const token = getAuthToken();
    if (!token) return false;
    try {
      const res = await fetch(`${API_URL}/api/v1/hero`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ images: list }),
      });
      if (!res.ok) throw new Error('Save failed');
      return true;
    } catch (err) {
      console.error('Error saving hero images:', err);
      return false;
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const token = getAuthToken();
    if (!token) {
      alert('You must be logged in to upload files.');
      return;
    }

    setUploading(true);
    try {
      const uploaded: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const bodyData = new FormData();
        bodyData.append('file', files[i]);

        const res = await fetch(`${API_URL}/api/v1/upload`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: bodyData,
        });

        if (!res.ok) throw new Error('File upload failed');
        const data = await res.json();
        uploaded.push(data.url);
      }

      const nextImages = [...images, ...uploaded];
      setImages(nextImages);

      // Auto-save immediately so the uploaded image is in the database
      // even if the admin navigates away without pressing Save Changes.
      const saved = await persistImages(nextImages);
      if (saved) {
        setSavedMsg('Image uploaded and saved — it is now live on the home page.');
        setTimeout(() => setSavedMsg(''), 4000);
      } else {
        alert('Image uploaded, but saving it to the database failed. Please click "Save Changes" to retry.');
      }
    } catch (err: any) {
      alert(err.message || 'Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMove = (index: number, direction: -1 | 1) => {
    setImages((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const handleSave = async () => {
    if (!getAuthToken()) {
      alert('You must be logged in as admin to save changes.');
      return;
    }

    setSaving(true);
    setSavedMsg('');
    const saved = await persistImages(images);
    if (saved) {
      setSavedMsg('Hero section updated — changes are now live on the home page.');
      setTimeout(() => setSavedMsg(''), 4000);
    } else {
      alert('Could not save hero images. Verify admin authentication.');
    }
    setSaving(false);
  };

  return (
    <AdminLayout title="Hero Section">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-1 text-gray-900">Home Page Hero Images</h1>
          <p className="text-gray-500 text-sm max-w-2xl">
            Control which images rotate through the hero section on the home page. Drag order with the
            arrows, remove images you don't want, and upload new ones — then hit Save to publish.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || loading}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {savedMsg && (
        <div className="mb-6 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium">
          {savedMsg}
        </div>
      )}

      {loading ? (
        <div className="text-center py-20 text-gray-400 font-medium">Loading hero images...</div>
      ) : error ? (
        <div className="text-center py-20 text-red-500 font-medium">{error}</div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
          {images.length === 0 && (
            <div className="text-center py-12 text-gray-400 text-sm font-medium">
              No hero images yet — upload some below.
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm group bg-gray-50 aspect-video"
              >
                <img src={resolveSrc(img)} alt={`Hero ${idx + 1}`} className="w-full h-full object-cover" />

                <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 text-white text-[10px] font-bold rounded-md backdrop-blur-sm">
                  #{idx + 1} {idx === 0 && '(shown first)'}
                </div>

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => handleMove(idx, -1)}
                    disabled={idx === 0}
                    title="Move earlier"
                    className="w-8 h-8 flex items-center justify-center bg-white/90 hover:bg-white rounded-full text-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(idx, 1)}
                    disabled={idx === images.length - 1}
                    title="Move later"
                    className="w-8 h-8 flex items-center justify-center bg-white/90 hover:bg-white rounded-full text-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(idx)}
                    title="Remove"
                    className="w-8 h-8 flex items-center justify-center bg-red-500/90 hover:bg-red-500 rounded-full text-white transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Upload dropzone tile, same grid so it sits alongside the images */}
            <label className="flex flex-col items-center justify-center aspect-video border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100/70 transition-colors">
              <ImageIcon className="w-6 h-6 text-gray-400 mb-1" />
              <p className="text-xs text-gray-500 font-semibold text-center px-2">
                {uploading ? 'Uploading...' : 'Add image(s)'}
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                disabled={uploading}
                onChange={handleUpload}
                className="hidden"
              />
            </label>
          </div>

          <p className="text-xs text-gray-400">
            Tip: the first image in the order is the one visitors see when the page first loads. Hero images
            rotate automatically every few seconds on the home page.
          </p>
        </div>
      )}
    </AdminLayout>
  );
}