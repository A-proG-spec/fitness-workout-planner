
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './onboarding.css';

export default function Onboarding1() {
  const navigate = useNavigate();
  const [age, setAge] = useState(() => Number(localStorage.getItem('onboarding_age') || 25));
  const [height, setHeight] = useState(() => Number(localStorage.getItem('onboarding_height') || 180));
  const [weight, setWeight] = useState(() => Number(localStorage.getItem('onboarding_weight') || 75));

  const handleNext = () => {
    localStorage.setItem('onboarding_age', age);
    localStorage.setItem('onboarding_height', height);
    localStorage.setItem('onboarding_weight', weight);
    navigate('/onboarding/2');
  };

  return (
    <div style={{ minHeight: '100vh', padding: '2rem', background: '#f5f9ff', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', display: 'grid', gridTemplateColumns: '280px 1fr', gap: '1.5rem' }}>
        <aside style={{ background: '#fff', borderRadius: 16, padding: '1.5rem', boxShadow: '0 10px 30px rgba(15,60,99,.08)' }}>
          <h4 style={{ margin: 0, marginBottom: 16, color: '#1b3f34' }}>Onboarding</h4>
          <p style={{ margin: '0 0 20px 0', color: '#5f6f80', fontSize: 13 }}>Step 1 of 3</p>
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ fontWeight: 600, color: '#0f2e26', background: '#e7f8ec', borderRadius: 8, padding: 10 }}>Account</div>
            <div style={{ color: '#53607f', padding: 10, borderRadius: 8 }}>Physicality</div>
            <div style={{ color: '#53607f', padding: 10, borderRadius: 8 }}>Goals</div>
            <div style={{ color: '#53607f', padding: 10, borderRadius: 8 }}>Summary</div>
          </div>
        </aside>

        <main style={{ background: '#fff', borderRadius: 16, padding: '2rem', boxShadow: '0 10px 30px rgba(15,60,99,.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#1c5d32', letterSpacing: '0.08em' }}>INITIAL SETUP</div>
            <div style={{ fontSize: 12, color: '#5f6f80' }}>Step 1 of 3</div>
          </div>

          <h1 style={{ margin: '0 0 0.35rem', fontSize: 36, lineHeight: '1.1' }}>Build Your Profile</h1>
          <p style={{ color: '#5a6b7d', marginBottom: '1.5rem' }}>
            We use your physicality metrics to calibrate your base metabolic rate and personalize your training volume.
          </p>

          <div style={{ height: 8, width: '100%', background: '#e6ebf0', borderRadius: 999, marginBottom: '1.8rem' }}>
            <div style={{ width: '33%', height: 8, background: '#0f8b53', borderRadius: 999 }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <label style={{ display: 'grid', gap: 6 }}>
              <span style={{ fontSize: 12, color: '#334155' }}>AGE</span>
              <input type="number" min={10} max={120} value={age} onChange={(e) => setAge(+e.target.value)} style={{ border: '1px solid #cbd5e1', borderRadius: 10, padding: '0.75rem', width: '100%' }} />
            </label>
            <label style={{ display: 'grid', gap: 6 }}>
              <span style={{ fontSize: 12, color: '#334155' }}>HEIGHT</span>
              <input type="number" min={100} max={240} value={height} onChange={(e) => setHeight(+e.target.value)} style={{ border: '1px solid #cbd5e1', borderRadius: 10, padding: '0.75rem', width: '100%' }} />
            </label>
            <label style={{ display: 'grid', gap: 6 }}>
              <span style={{ fontSize: 12, color: '#334155' }}>WEIGHT</span>
              <input type="number" min={30} max={300} value={weight} onChange={(e) => setWeight(+e.target.value)} style={{ border: '1px solid #cbd5e1', borderRadius: 10, padding: '0.75rem', width: '100%' }} />
            </label>
          </div>

          <div style={{ background: '#f0fff4', borderRadius: 12, border: '1px solid #d1fae5', padding: '1rem', display: 'flex', gap: 12, marginBottom: '1.5rem' }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#10b981', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 14 }}>&#10003;</div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>Why we need this</div>
              <div style={{ color: '#1f2937' }}>
                Your data is encrypted and used solely for generating physiological baseline reports. We never share your health stats with third parties.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button style={{ border: 'none', background: 'transparent', color: '#0f8b53', fontWeight: 700, cursor: 'pointer' }}>Use imperial units</button>
            <button onClick={handleNext} style={{ border: 'none', borderRadius: 10, background: '#0f8b53', color: '#fff', padding: '0.9rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>
              Continue
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
