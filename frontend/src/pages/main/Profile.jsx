import { useCallback, useEffect, useMemo, useState } from 'react';
import EquilibriumShell from '../../components/equilibrium/EquilibriumShell.jsx';
import { useAuth } from '../../hooks/useAuth';
import { getProfile, updateProfile } from '../../services/profileService';
import { getStoredAccessToken } from '../../utils/authStorage';
import { onboardingStorage } from '../../utils/fitness.js';

const GREEN = '#006D44';
const GREEN_DARK = '#0d4a3a';

const LS_PREFS = 'equilibrium_profile_prefs';

function loadPrefs() {
  try {
    const raw = localStorage.getItem(LS_PREFS);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function savePrefs(prefs) {
  try {
    localStorage.setItem(LS_PREFS, JSON.stringify(prefs));
  } catch {
    /* ignore */
  }
}

function Toggle({ on, onChange, id }) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors ${
        on ? '' : 'bg-gray-200'
      }`}
      style={on ? { backgroundColor: GREEN } : undefined}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
          on ? 'translate-x-[22px]' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

function IconBriefcase({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.25 14.15v4.125c0 1.036-.84 1.875-1.875 1.875H5.625c-1.036 0-1.875-.84-1.875-1.875v-4.125M12 12.75h.008v.008H12V12.75zm0 0h.008v.008H12V12.75zm0 0h.008v.008H12V12.75zm0 0h.008v.008H12V12.75M3.375 9.75h17.25c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 18v-7.125c0-.621.504-1.125 1.125-1.125zM12 12.75h.008v.008H12V12.75zm0 0h.008v.008H12V12.75zM2.25 9.75V6.375c0-.621.504-1.125 1.125-1.125h17.25c.621 0 1.125.504 1.125 1.125V9.75M12 12.75h.008v.008H12V12.75z"
      />
    </svg>
  );
}

function IconSliders({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H15"
      />
    </svg>
  );
}

function IconMapPin({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
  );
}

function IconCalendar({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5" />
    </svg>
  );
}

function IconPencil({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      />
    </svg>
  );
}

function IconX({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

const inputClass =
  'mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition-shadow focus:border-gray-300 focus:ring-2 focus:ring-[#006D44]/20';

export default function Profile() {
  const { user } = useAuth();
  const onboard = useMemo(() => onboardingStorage.load(), []);

  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmiResult, setBmiResult] = useState(null);

  const savedPrefs = useMemo(() => loadPrefs(), []);

  const [email, setEmail] = useState(savedPrefs?.email ?? user?.email ?? '');
  const [location, setLocation] = useState(savedPrefs?.location ?? 'Barcelona, Spain');
  const [gender, setGender] = useState(savedPrefs?.gender ?? 'Female');
  const [birthDate, setBirthDate] = useState(savedPrefs?.birthDate ?? '1995-12-05');
  const [darkMode, setDarkMode] = useState(savedPrefs?.darkMode ?? false);
  const [pushNotifications, setPushNotifications] = useState(savedPrefs?.pushNotifications ?? true);
  const [goalProgress, setGoalProgress] = useState(savedPrefs?.goalProgress ?? 68);

  const [avatarUrl, setAvatarUrl] = useState(
    savedPrefs?.avatarUrl ??
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=320&h=320&fit=crop&q=80'
  );

  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const displayName = user?.name?.trim() || 'Elena Rodriguez';
  const memberSince = savedPrefs?.memberSince ?? 'Oct 2023';

  const goalTitle = useMemo(() => {
    const g = onboard.goal || '';
    if (/marathon|run|cardio/i.test(g)) return 'Marathon Readiness';
    if (/muscle|strength|lift/i.test(g)) return 'Strength Foundation';
    if (/yoga|mobility/i.test(g)) return 'Mobility & Balance';
    if (g.length > 3) return g.slice(0, 32) + (g.length > 32 ? '…' : '');
    return 'Marathon Readiness';
  }, [onboard.goal]);

  const ageDisplay = useMemo(() => {
    if (birthDate) {
      const d = new Date(birthDate);
      if (!Number.isNaN(d.getTime())) {
        const diff = Date.now() - d.getTime();
        return Math.max(18, Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000)));
      }
    }
    return onboard.age > 0 ? onboard.age : 29;
  }, [birthDate, onboard.age]);

  const weightDisplay = weight !== '' ? Number(weight) : onboard.weight > 0 ? onboard.weight : 64;
  const heightDisplay = height !== '' ? Number(height) : onboard.height > 0 ? onboard.height : 172;

  const snapshot = useCallback(
    () => ({
      email,
      location,
      gender,
      birthDate,
      darkMode,
      pushNotifications,
      goalProgress,
      avatarUrl,
      height,
      weight,
    }),
    [email, location, gender, birthDate, darkMode, pushNotifications, goalProgress, avatarUrl, height, weight]
  );

  const [baseline, setBaseline] = useState(() => snapshot());

  useEffect(() => {
    const loadProfile = async () => {
      if (!getStoredAccessToken()) return;
      try {
        setLoading(true);
        const response = await getProfile();
        const data = response.data || {};
        const h = data.height != null ? String(data.height) : height;
        const w = data.weight != null ? String(data.weight) : weight;
        const em = data.email ?? email;
        if (data.height != null) setHeight(h);
        if (data.weight != null) setWeight(w);
        if (data.bmi) setBmiResult(data.bmi);
        if (data.email) setEmail(em);
        setBaseline({
          email: em,
          location,
          gender,
          birthDate,
          darkMode,
          pushNotifications,
          goalProgress,
          avatarUrl,
          height: h,
          weight: w,
        });
      } catch {
        setError('Some profile data could not be loaded from the server.');
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional mount-only load; prefs state is initial
  }, []);

  const onAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarUrl(url);
  };

  const persistLocalPrefs = () => {
    savePrefs({
      email,
      location,
      gender,
      birthDate,
      darkMode,
      pushNotifications,
      goalProgress,
      avatarUrl: avatarUrl.startsWith('blob:') ? undefined : avatarUrl,
      memberSince,
    });
  };

  const onSaveAll = async (e) => {
    e.preventDefault();
    setError('');
    setStatus('');
    persistLocalPrefs();

    if (getStoredAccessToken()) {
      try {
        setLoading(true);
        const payload = {
          height: height === '' ? undefined : Number(height),
          weight: weight === '' ? undefined : Number(weight),
        };
        const response = await updateProfile(payload);
        if (response?.data?.bmi) setBmiResult(response.data.bmi);
        setStatus('All changes saved.');
      } catch {
        setError('Could not sync height/weight to the server. Other settings were saved locally.');
      } finally {
        setLoading(false);
      }
    } else {
      setStatus('Preferences saved on this device. Sign in to sync height and weight.');
    }
    setBaseline(snapshot());
  };

  const onCancel = () => {
    if (!baseline) return;
    setEmail(baseline.email);
    setLocation(baseline.location);
    setGender(baseline.gender);
    setBirthDate(baseline.birthDate);
    setDarkMode(baseline.darkMode);
    setPushNotifications(baseline.pushNotifications);
    setGoalProgress(baseline.goalProgress);
    setAvatarUrl(baseline.avatarUrl);
    setHeight(baseline.height);
    setWeight(baseline.weight);
    setStatus('');
    setError('');
  };

  const bumpGoal = () => {
    setGoalProgress((p) => Math.min(100, p + 4));
  };

  return (
    <EquilibriumShell searchPlaceholder="Search settings…">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold tracking-tight md:text-[2rem]" style={{ color: GREEN_DARK }}>
          Profile
        </h1>

        {(error || status) && (
          <div className="mt-4 space-y-2">
            {error && <p className="rounded-xl bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>}
            {status && <p className="rounded-xl bg-emerald-50 px-4 py-2 text-sm text-emerald-800">{status}</p>}
          </div>
        )}

        <form className="mt-8 space-y-8" onSubmit={onSaveAll}>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <div className="relative shrink-0">
                  <img
                    src={avatarUrl}
                    alt=""
                    className="h-28 w-28 rounded-2xl object-cover ring-1 ring-gray-100 sm:h-32 sm:w-32"
                  />
                  <label className="absolute -bottom-1 -right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#006D44] text-white shadow-md ring-2 ring-white">
                    <IconPencil className="h-4 w-4" />
                    <input type="file" accept="image/*" className="sr-only" onChange={onAvatarChange} />
                  </label>
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl font-bold text-gray-900">{displayName}</h2>
                  <p className="mt-1 text-sm text-gray-500">Premium Member since {memberSince}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-violet-800">
                      Runner
                    </span>
                    <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-violet-800">
                      Yoga
                    </span>
                    <span className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-white" style={{ backgroundColor: GREEN }}>
                      Level 24
                    </span>
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-3 border-t border-gray-100 pt-6 text-center sm:text-left">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Weight</p>
                      <p className="mt-1 text-sm font-bold text-gray-900">{weightDisplay} kg</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Height</p>
                      <p className="mt-1 text-sm font-bold text-gray-900">{heightDisplay} cm</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Age</p>
                      <p className="mt-1 text-sm font-bold text-gray-900">{ageDisplay}</p>
                    </div>
                  </div>
                  {bmiResult && (
                    <p className="mt-4 text-xs text-gray-500">
                      BMI {bmiResult.bmi} · {bmiResult.category}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div
              className="flex flex-col justify-between rounded-2xl p-6 text-white shadow-sm"
              style={{ backgroundColor: GREEN_DARK }}
            >
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">Current goal</p>
                <h2 className="mt-2 text-2xl font-bold leading-tight">{goalTitle}</h2>
                <div className="mt-6">
                  <div className="flex justify-between text-sm font-medium text-white/90">
                    <span>Progress</span>
                    <span>{goalProgress}%</span>
                  </div>
                  <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/20">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{ width: `${goalProgress}%`, backgroundColor: '#5eead4' }}
                    />
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={bumpGoal}
                className="mt-8 w-full rounded-xl border border-white/25 bg-white/10 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/15"
              >
                Update Progress
              </button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-gray-900">
                <IconBriefcase className="h-5 w-5 text-gray-500" />
                <h3 className="text-base font-bold">Personal Information</h3>
              </div>

              <label className="mt-6 block text-sm font-medium text-gray-600" htmlFor="profile-email">
                Email address
              </label>
              <input
                id="profile-email"
                type="email"
                className={inputClass}
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                autoComplete="email"
              />

              <label className="mt-4 block text-sm font-medium text-gray-600" htmlFor="profile-location">
                Location
              </label>
              <div className="relative mt-1.5">
                <IconMapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="profile-location"
                  type="text"
                  className={`${inputClass} pl-10`}
                  value={location}
                  onChange={(ev) => setLocation(ev.target.value)}
                />
              </div>

              <label className="mt-4 block text-sm font-medium text-gray-600" htmlFor="profile-gender">
                Gender
              </label>
              <select
                id="profile-gender"
                className={inputClass}
                value={gender}
                onChange={(ev) => setGender(ev.target.value)}
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>

              <label className="mt-4 block text-sm font-medium text-gray-600" htmlFor="profile-birth">
                Birth date
              </label>
              <div className="relative mt-1.5">
                <IconCalendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="profile-birth"
                  type="date"
                  className={`${inputClass} pl-10`}
                  value={birthDate}
                  onChange={(ev) => setBirthDate(ev.target.value)}
                />
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-600" htmlFor="profile-height">
                    Height (cm)
                  </label>
                  <input
                    id="profile-height"
                    type="number"
                    min="1"
                    step="0.1"
                    className={inputClass}
                    value={height}
                    onChange={(ev) => setHeight(ev.target.value)}
                    placeholder="172"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600" htmlFor="profile-weight">
                    Weight (kg)
                  </label>
                  <input
                    id="profile-weight"
                    type="number"
                    min="1"
                    step="0.1"
                    className={inputClass}
                    value={weight}
                    onChange={(ev) => setWeight(ev.target.value)}
                    placeholder="64"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-gray-900">
                <IconSliders className="h-5 w-5 text-gray-500" />
                <h3 className="text-base font-bold">Preferences</h3>
              </div>

              <div className="mt-6 flex items-center justify-between gap-4 border-b border-gray-100 pb-5">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Dark appearance</p>
                  <p className="mt-0.5 text-xs text-gray-500">Use a darker theme across the app.</p>
                </div>
                <Toggle id="toggle-dark" on={darkMode} onChange={setDarkMode} />
              </div>

              <div className="mt-5 flex items-center justify-between gap-4 border-b border-gray-100 pb-5">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Push notifications</p>
                  <p className="mt-0.5 text-xs text-gray-500">Workout reminders and goal nudges.</p>
                </div>
                <Toggle id="toggle-push" on={pushNotifications} onChange={setPushNotifications} />
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">External health sync</p>
                  <p className="mt-1 text-xs text-gray-500">Connect with Apple Health or Google Fit.</p>
                </div>
                <button
                  type="button"
                  className="shrink-0 rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Manage
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-4 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              className="flex items-center justify-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 sm:justify-start"
            >
              <IconX className="h-4 w-4" />
              Deactivate my account
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="rounded-xl border border-gray-200 bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-200/80"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-95 disabled:opacity-60"
                style={{ backgroundColor: GREEN_DARK }}
              >
                {loading ? 'Saving…' : 'Save All Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </EquilibriumShell>
  );
}
