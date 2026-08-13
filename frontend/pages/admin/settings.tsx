import { useState, useEffect } from 'react';
import { User, Shield, Loader2, Check } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const getAuthToken = () => {
    if (typeof document === 'undefined') return '';
    const value = `; ${document.cookie}`;
    const parts = value.split(`; auth_token=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
    return '';
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = getAuthToken();
      try {
        const res = await fetch(`${API_URL}/api/v1/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Could not load your profile.');
        const data = await res.json();
        setName(data.name || '');
        setEmail(data.email || '');
      } catch (err: any) {
        setProfileMsg({ type: 'err', text: err.message || 'Error loading profile' });
      } finally {
        setProfileLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSaveProfile = async () => {
    setProfileSaving(true);
    setProfileMsg(null);
    const token = getAuthToken();
    try {
      const res = await fetch(`${API_URL}/api/v1/auth/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Could not save changes.');
      setName(data.name);
      setEmail(data.email);
      setProfileMsg({ type: 'ok', text: 'Profile updated successfully.' });
      setTimeout(() => setProfileMsg(null), 4000);
    } catch (err: any) {
      setProfileMsg({ type: 'err', text: err.message || 'Something went wrong.' });
    } finally {
      setProfileSaving(false);
    }
  };

  const handleChangePassword = async () => {
    setPasswordMsg(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMsg({ type: 'err', text: 'Please fill in all password fields.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'err', text: 'New password and confirmation do not match.' });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMsg({ type: 'err', text: 'New password must be at least 6 characters.' });
      return;
    }

    setPasswordSaving(true);
    const token = getAuthToken();
    try {
      const res = await fetch(`${API_URL}/api/v1/auth/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Could not change password.');
      setPasswordMsg({ type: 'ok', text: 'Password changed successfully.' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordMsg(null), 4000);
    } catch (err: any) {
      setPasswordMsg({ type: 'err', text: err.message || 'Something went wrong.' });
    } finally {
      setPasswordSaving(false);
    }
  };

  const tabs = [
    { id: 'profile' as const, icon: User, label: 'Profile' },
    { id: 'security' as const, icon: Shield, label: 'Security' },
  ];

  return (
    <AdminLayout title="Settings">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight mb-1 text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm">Manage your admin account details.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Sidebar */}
        <div className="w-full lg:w-64 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                activeTab === tab.id ? 'bg-green-50 text-green-800' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
          {activeTab === 'profile' && (
            <>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>

              {profileLoading ? (
                <div className="flex items-center gap-2 text-gray-400 text-sm py-6">
                  <Loader2 className="w-4 h-4 animate-spin" /> Loading profile...
                </div>
              ) : (
                <>
                  {profileMsg && (
                    <div
                      className={`mb-6 px-4 py-3 rounded-xl text-sm font-medium ${
                        profileMsg.type === 'ok'
                          ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                          : 'bg-red-50 border border-red-200 text-red-600'
                      }`}
                    >
                      {profileMsg.text}
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-6 mb-8">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 text-gray-900"
                      />
                      <p className="text-xs text-gray-400 mt-1.5">This is also the email you use to log in.</p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                    <button
                      onClick={handleSaveProfile}
                      disabled={profileSaving}
                      className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium text-sm shadow-lg shadow-green-500/30 transition-all disabled:opacity-60"
                    >
                      {profileSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                      {profileSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </>
              )}
            </>
          )}

          {activeTab === 'security' && (
            <>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Change Password</h2>

              {passwordMsg && (
                <div
                  className={`mb-6 px-4 py-3 rounded-xl text-sm font-medium ${
                    passwordMsg.type === 'ok'
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                      : 'bg-red-50 border border-red-200 text-red-600'
                  }`}
                >
                  {passwordMsg.text}
                </div>
              )}

              <div className="grid grid-cols-1 gap-6 mb-8 max-w-md">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 text-gray-900"
                  />
                  <p className="text-xs text-gray-400 mt-1.5">At least 6 characters.</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 text-gray-900"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 max-w-md">
                <button
                  onClick={handleChangePassword}
                  disabled={passwordSaving}
                  className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium text-sm shadow-lg shadow-green-500/30 transition-all disabled:opacity-60"
                >
                  {passwordSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  {passwordSaving ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}