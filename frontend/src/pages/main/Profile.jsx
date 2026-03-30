import { useEffect, useState } from 'react';
import { getProfile, updateProfile } from '../../services/profileService';
import { getStoredAccessToken } from '../../utils/authStorage';

const initialForm = {
  height: '',
  weight: '',
};

export default function Profile() {
  const [form, setForm] = useState(initialForm);
  const [bmiResult, setBmiResult] = useState(null);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      if (!getStoredAccessToken()) return;

      try {
        setLoading(true);
        const response = await getProfile();
        const data = response.data || {};

        setForm({
          height: data.height ?? '',
          weight: data.weight ?? '',
        });

        if (data.bmi) {
          setBmiResult(data.bmi);
        }
      } catch {
        setError('Unable to load profile. You can still use BMI calculator below.');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSaveProfile = async (event) => {
    event.preventDefault();
    setError('');
    setStatus('');

    if (!getStoredAccessToken()) {
      setError('Please sign in first to update profile.');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        height: form.height === '' ? undefined : Number(form.height),
        weight: form.weight === '' ? undefined : Number(form.weight),
      };

      const response = await updateProfile(payload);
      if (response?.data?.bmi) {
        setBmiResult(response.data.bmi);
      }
      setStatus('Profile updated successfully.');
    } catch {
      setError('Failed to update profile. Please check your inputs and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-3xl space-y-6 p-6">
      <header>
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="text-sm text-gray-600">Update your height and weight. BMI is calculated from your profile data.</p>
      </header>

      {error && <p className="rounded bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      {status && <p className="rounded bg-green-50 px-3 py-2 text-sm text-green-700">{status}</p>}

      <form className="grid gap-4 rounded border p-4" onSubmit={onSaveProfile}>
        <h2 className="text-lg font-medium">Update Metrics</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-1">
            <span className="text-sm">Height (cm)</span>
            <input className="rounded border px-3 py-2" type="number" min="1" step="0.1" name="height" value={form.height} onChange={onChange} />
          </label>

          <label className="grid gap-1">
            <span className="text-sm">Weight (kg)</span>
            <input className="rounded border px-3 py-2" type="number" min="1" step="0.1" name="weight" value={form.weight} onChange={onChange} />
          </label>
        </div>

        <button className="rounded bg-black px-4 py-2 text-white disabled:opacity-60" type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </form>

      <section className="space-y-3 rounded border p-4">
        <h2 className="text-lg font-medium">BMI Result</h2>

        {bmiResult && (
          <div className="rounded bg-gray-50 p-3 text-sm">
            <p>
              <strong>BMI:</strong> {bmiResult.bmi}
            </p>
            <p>
              <strong>Category:</strong> {bmiResult.category}
            </p>
          </div>
        )}
        {!bmiResult && <p className="text-sm text-gray-600">Save your height and weight to view BMI.</p>}
      </section>
    </section>
  );
}
