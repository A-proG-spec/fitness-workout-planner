import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './onboarding.css';

const goalLabels = {
  lose: 'Weight Loss',
  gain: 'Lean Muscle Gain',
  maintain: 'Maintenance',
};

export default function Onboarding3() {
  const navigate = useNavigate();
  const [name, setName] = useState(() => localStorage.getItem('user_name') || 'Friend');
  const [weight, setWeight] = useState(() => Number(localStorage.getItem('onboarding_weight') || 75));
  const [goal, setGoal] = useState(() => localStorage.getItem('onboarding_goal') || 'gain');

  useEffect(() => {
    localStorage.setItem('onboarding_complete', 'true');
  }, []);

  const dailyTarget = Math.round((goal === 'lose' ? 2200 : goal === 'maintain' ? 2400 : 2650) * 1);
  const protein = Math.round(goal === 'gain' ? 0.45 : goal === 'lose' ? 0.4 : 0.42);

  return (
    <div style={{ minHeight: '100vh', padding: '2rem', background: 'linear-gradient(140deg, #ebf7ff 0%, #f9fafb 100%)', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center', paddingTop: '2rem' }}>
        <div style={{ width: 64, height: 64, margin: '0 auto', borderRadius: '50%', background: '#0f8b53', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 30, marginBottom: '1rem' }}>&#10003;</div>
        <h1 style={{ fontSize: 44, margin: 0 }}>Welcome to FitTrack, {name}!</h1>
        <p style={{ color: '#445166', marginTop: '0.75rem', marginBottom: '2rem' }}>
          Your personalized wellness plan is ready. We’ve calculated your targets based on your unique profile and goals.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: '1.2rem', boxShadow: '0 6px 18px rgba(15,60,99,.08)' }}>
            <div style={{ fontSize: 12, color: '#10b981', fontWeight: 700 }}>STARTING WEIGHT</div>
            <div style={{ fontSize: 34, fontWeight: 700, marginTop: 6 }}>{weight} kg</div>
            <div style={{ height: 8, width: '100%', background: '#e6ebf0', borderRadius: 999, marginTop: 10 }}>
              <div style={{ width: '55%', height: 8, background: '#0f8b53', borderRadius: 999 }} />
            </div>
          </div>

          <div style={{ background: '#fff', borderRadius: 16, padding: '1.2rem', boxShadow: '0 6px 18px rgba(15,60,99,.08)' }}>
            <div style={{ fontSize: 12, color: '#0f8b53', fontWeight: 700 }}>PRIMARY GOAL</div>
            <div style={{ fontSize: 26, fontWeight: 700, marginTop: 6 }}>{goalLabels[goal]}</div>
            <div style={{ color: '#64748b', fontSize: 13, marginTop: 3 }}>High Intensity Focus</div>
            <div style={{ marginTop: 10, fontSize: 12, color: '#10b981' }}>Personalized for you</div>
          </div>

          <div style={{ background: '#fff', borderRadius: 16, padding: '1.2rem', boxShadow: '0 6px 18px rgba(15,60,99,.08)' }}>
            <div style={{ fontSize: 12, color: '#0f8b53', fontWeight: 700 }}>DAILY TARGET</div>
            <div style={{ fontSize: 34, fontWeight: 700, marginTop: 6 }}>{dailyTarget.toLocaleString()} kcal</div>
            <div style={{ marginTop: 12, fontSize: 12, color: '#64748b' }}>Protein Focus</div>
            <div style={{ marginTop: 6, color: '#10b981', fontWeight: 700 }}>{Math.round(protein * 100)}%</div>
          </div>
        </div>

        <button onClick={() => navigate('/dashboard')} style={{ border: 'none', borderRadius: 12, background: '#0f8b53', color: '#fff', padding: '0.95rem 1.75rem', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
          Go to Dashboard &rarr;
        </button>

        <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 12 }}>You can update these preferences anytime in your settings.</p>
      </div>
    </div>
  );
}
