import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import Logo from '../components/Logo';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await res.json(); // { access_token: '...' }

      document.cookie = `auth_token=${data.access_token}; path=/; max-age=604800; SameSite=Lax`;

      router.push('/admin');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login - PGI Realtors</title>
      </Head>
      <main className="min-h-screen bg-stone-100 flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300">

        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <img alt="Construction background" className="w-full h-full object-cover opacity-20 mix-blend-luminosity grayscale" src="https://images.unsplash.com/photo-1541888081156-f56f18fb5f09?q=80&w=2000&auto=format&fit=crop" />
          <div className="absolute inset-0 bg-gradient-to-br from-stone-100/90 via-stone-100/80 to-stone-100"></div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-emerald-500/20 via-green-500/15 to-lime-400/15 rounded-full blur-3xl opacity-50 animate-[spin_20s_linear_infinite] z-0"></div>

        {/* Login Box */}
        <div className="w-full max-w-md bg-white/80 backdrop-blur-2xl border border-black/5 p-8 sm:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-10 relative">

          <div className="flex justify-center mb-10">
            <Logo />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">Welcome Back</h1>
            <p className="text-gray-500 text-sm">Sign in to access your 3D infrastructure analytics.</p>
          </div>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@3dbharat.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-gray-700">Password</label>
                <a href="#" className="text-xs font-semibold text-green-700 hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-green-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign In to Dashboard
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            Don't have an account? <a href="#" className="font-semibold text-gray-900 hover:underline">Request access</a>
          </div>
        </div>
      </main>
    </>
  );
}