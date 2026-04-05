import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { profileService } from '../../services/profileService';
import {
  GridIcon,
  WorkoutIcon,
  ChartIcon,
  UsersIcon,
  HelpIcon,
  LogoutIcon,
} from '../../components/icons';

const sidebarPrimaryLinks = [
  { label: 'Dashboard', active: false, icon: GridIcon, to: '/dashboard' },
  { label: 'Workouts', active: false, icon: WorkoutIcon, to: '/exercises' },
  { label: 'Progress', active: false, icon: ChartIcon, to: '/progress' },
  { label: 'Community', active: false, icon: UsersIcon, to: '/community' },
];

const sidebarSecondaryLinks = [
  { label: 'Support', icon: HelpIcon, to: '#' },
  { label: 'Sign Out', icon: LogoutIcon, to: '/login' },
];

const navLinks = [
  { label: 'Dashboard', to: '/dashboard', active: false },
  { label: 'Workouts', to: '/exercises', active: false },
  { label: 'Progress', to: '/progress', active: false },
  { label: 'Community', to: '/community', active: false },
];

export default function Profile() {
  const { user } = useAuth();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: 'Other',
    dateOfBirth: '',
    height: '',
    weight: '',
    fitnessGoal: 'General Fitness',
  });

  // Get user initials for avatar
  const userInitials = user?.name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U';

  // Fetch profile data on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await profileService.getProfile();
      if (response.success) {
        const profile = response.data;
        setFormData({
          name: profile.name || '',
          email: profile.email || '',
          gender: user?.gender || 'Other',
          dateOfBirth: user?.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
          height: profile.height || '',
          weight: profile.weight || '',
          fitnessGoal: user?.fitnessGoal || 'General Fitness',
        });
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage('');
      
      const response = await profileService.updateProfile({
        height: formData.height ? Number(formData.height) : undefined,
        weight: formData.weight ? Number(formData.weight) : undefined,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        fitnessGoal: formData.fitnessGoal,
      });

      if (response.success) {
        setMessage('Profile updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('Failed to update profile. Please try again.');
      console.error('Failed to update profile:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7f8] text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-[240px_minmax(0,1fr)]">
        <Sidebar primaryLinks={sidebarPrimaryLinks} secondaryLinks={sidebarSecondaryLinks} />

        <div className="flex min-w-0 flex-col">
          <Navbar navLinks={navLinks} userInitials={userInitials} searchPlaceholder="Search settings..." />

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-7xl space-y-6">
              
              {message && (
                <div className={`rounded-xl p-4 ${message.includes('success') ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                  {message}
                </div>
              )}

              {/* Profile Header */}
              <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
                {/* Left: Profile Card */}
                <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200/80">
                  {loading ? (
                    <div className="text-center py-8">Loading...</div>
                  ) : (
                    <div className="flex items-start gap-6">
                      {/* Avatar */}
                      <div className="relative shrink-0">
                        <div className="h-28 w-28 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-200 to-slate-300">
                          <div className="grid h-full w-full place-items-center text-4xl font-bold text-slate-600">
                            {userInitials}
                          </div>
                        </div>
                        <button
                          type="button"
                          className="absolute bottom-0 right-0 grid h-9 w-9 place-items-center rounded-xl bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 transition-colors"
                          aria-label="Edit avatar"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                      </div>

                      {/* Profile Info */}
                      <div className="flex-1 min-w-0">
                        <h1 className="text-3xl font-bold text-slate-900">{formData.name || 'User'}</h1>
                        <p className="mt-1 text-sm text-slate-500">Member since {new Date(user?.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                      
                        {/* Badges */}
                        <div className="mt-4 flex flex-wrap gap-2">
                          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
                            Runner
                          </span>
                          <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-purple-700">
                            Yoga
                          </span>
                          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700">
                            Level 24
                          </span>
                        </div>

                        {/* Stats */}
                        <div className="mt-6 grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Weight</p>
                            <p className="mt-1 text-xl font-bold text-slate-900">{formData.weight ? `${formData.weight} kg` : 'Not set'}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Height</p>
                            <p className="mt-1 text-xl font-bold text-slate-900">{formData.height ? `${formData.height} cm` : 'Not set'}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Goal</p>
                            <p className="mt-1 text-xl font-bold text-slate-900">{formData.fitnessGoal || 'Not set'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </section>

                {/* Right: Current Goal Card */}
                <section className="rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-700 p-8 text-white shadow-lg">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-100">
                    Current Goal
                  </h3>
                  <h2 className="mt-3 text-3xl font-bold">Marathon Readiness</h2>
                  
                  <div className="mt-8">
                    <div className="flex items-end justify-between">
                      <span className="text-sm font-medium text-emerald-100">Progress</span>
                      <span className="text-4xl font-bold">68%</span>
                    </div>
                    <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-emerald-800/50">
                      <div className="h-full w-[68%] rounded-full bg-white transition-all" />
                    </div>
                  </div>

                  <button
                    type="button"
                    className="mt-8 w-full rounded-xl bg-white/20 py-3 text-sm font-semibold text-white transition hover:bg-white/30"
                  >
                    Update Progress
                  </button>
                </section>
              </div>

              {/* Settings Sections */}
              <div className="grid gap-5 lg:grid-cols-2">
                
                {/* Personal Information */}
                <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-600">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">Personal Information</h2>
                  </div>

                  <div className="space-y-5">
                    {/* Email */}
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition focus:border-emerald-500 focus:bg-white focus:outline-none"
                      />
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-2">
                        Location
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 pl-11 text-sm text-slate-900 transition focus:border-emerald-500 focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Gender & Birth Date */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-2">
                          Gender
                        </label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition focus:border-emerald-500 focus:bg-white focus:outline-none"
                        >
                          <option value="Female">Female</option>
                          <option value="Male">Male</option>
                          <option value="Other">Other</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-2">
                          Birth Date
                        </label>
                        <input
                          type="date"
                          name="birthDate"
                          value={formData.birthDate}
                          onChange={handleInputChange}
                          className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition focus:border-emerald-500 focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Preferences */}
                <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-600">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">Preferences</h2>
                  </div>

                  <div className="space-y-5">
                    {/* Push Notifications */}
                    <div className="flex items-start gap-4">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-600">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-slate-900">Push Notifications</h3>
                        <p className="mt-0.5 text-xs text-slate-500">Workout reminders and goal alerts</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPushNotifications(!pushNotifications)}
                        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
                          pushNotifications ? 'bg-emerald-600' : 'bg-slate-300'
                        }`}
                        aria-label="Toggle push notifications"
                      >
                        <span
                          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                            pushNotifications ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {/* External Health Sync */}
                    <div className="flex items-start gap-4">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-600">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-slate-900">External Health Sync</h3>
                        <p className="mt-0.5 text-xs text-slate-500">Connect with Apple Health or Google Fit</p>
                      </div>
                      <button
                        type="button"
                        className="shrink-0 rounded-lg bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
                      >
                        Manage
                      </button>
                    </div>
                  </div>
                </section>

              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
                <button
                  type="button"
                  className="flex items-center gap-2 text-sm font-semibold text-red-600 transition hover:text-red-700"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Deactivate my account
                </button>

                <div className="flex gap-3">
                  <button
                    type="button"
                    className="rounded-xl border-2 border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-100 transition hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? 'Saving...' : 'Save All Changes'}
                  </button>
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
