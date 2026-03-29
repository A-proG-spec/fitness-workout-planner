import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './onboarding.css';

const goals = [
  { value: 'lose', title: 'Lose Weight', subtitle: 'Burn fat while maintaining energy' },
  { value: 'gain', title: 'Gain Muscle', subtitle: 'Build strength and increase mass' },
  { value: 'maintain', title: 'Maintain', subtitle: 'Stay lean and improve mobility' },
];

export default function Onboarding2() {
  const navigate = useNavigate();
  const [selectedGoal, setSelectedGoal] = useState(localStorage.getItem('onboarding_goal') || 'gain');
  const [height, setHeight] = useState(Number(localStorage.getItem('onboarding_height') || 180));
  const [weight, setWeight] = useState(Number(localStorage.getItem('onboarding_weight') || 75));

  useEffect(() => {
    const h = Number(localStorage.getItem('onboarding_height'));
    const w = Number(localStorage.getItem('onboarding_weight'));
    if (h > 0) setHeight(h);
    if (w > 0) setWeight(w);
  }, []);

  const bmi = useMemo(() => {
    if (!height || !weight) return 0;
    return Number((weight / ((height / 100) * (height / 100))).toFixed(1));
  }, [height, weight]);

  const status = useMemo(() => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  }, [bmi]);

  const handleNext = () => {
    localStorage.setItem('onboarding_goal', selectedGoal);
    navigate('/onboarding/3');
  };

  return (
    <div style={{ minHeight: '100vh', padding: '2rem', background: '#f5f9ff', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', display: 'grid', gridTemplateColumns: '280px 1fr', gap: '1.5rem' }}>
        <aside style={{ background: '#fff', borderRadius: 16, padding: '1.5rem', boxShadow: '0 10px 30px rgba(15,60,99,.08)' }}>
          <h4 style={{ margin: 0, marginBottom: 16, color: '#1b3f34' }}>Onboarding</h4>
          <p style={{ margin: '0 0 20px 0', color: '#5f6f80', fontSize: 13 }}>Step 2 of 3</p>
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ color: '#53607f', padding: 10, borderRadius: 8 }}>Account</div>
            <div style={{ fontWeight: 600, color: '#0f2e26', background: '#e7f8ec', borderRadius: 8, padding: 10 }}>Physicality</div>
            <div style={{ color: '#53607f', padding: 10, borderRadius: 8 }}>Goals</div>
            <div style={{ color: '#53607f', padding: 10, borderRadius: 8 }}>Summary</div>
          </div>
        </aside>

        <main style={{ background: '#fff', borderRadius: 16, padding: '2rem', boxShadow: '0 10px 30px rgba(15,60,99,.08)' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#1c5d32', letterSpacing: '0.08em' }}>PERSONALIZED JOURNEY</div>
            <h1 style={{ margin: '0.5rem 0 0.8rem', fontSize: 40 }}>Define Your Ambition</h1>
            <p style={{ color: '#5a6b7d' }}>
              Based on your physical profile, let's establish the path forward. Where would you like to see yourself in 90 days?
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
            <section style={{ border: '1px solid #e2e8f0', borderRadius: 16, padding: '1rem' }}>
              <div style={{ fontSize: 14, color: '#0f8b53', fontWeight: 700 }}>Your Current Profile</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', margin: '1rem 0' }}>
                <span style={{ fontSize: 44, fontWeight: 700, color: '#0f8b53' }}>{bmi}</span>
                <span style={{ color: '#334155', fontWeight: 700 }}>&nbsp;BMI Index</span>
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, border: '1px solid #d1fae5', background: '#ecfdf5', color: '#065f46', borderRadius: 999, display: 'inline-block', padding: '0.2rem 0.75rem', marginBottom: 12 }}>
                {status}
              </div>
              <div style={{ marginTop: 12, fontSize: 12, color: '#64748b' }}>"
                Your BMI is within the {status.toLowerCase()} range. Focusing on metabolic flexibility and lean muscle retention would be optimal for your current stature.
                "</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 12, color: '#334155' }}>
                <span>Height: {height} cm</span>
                <span>Weight: {weight} kg</span>
              </div>
            </section>

            <section style={{ padding: '1rem', borderRadius: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Select Your Primary Focus</div>
              <div style={{ display: 'grid', gap: 12 }}>
                {goals.map((goal) => (
                  <button
                    key={goal.value}
                    onClick={() => setSelectedGoal(goal.value)}
                    style={{
                      border: selectedGoal === goal.value ? '2px solid #0f8b53' : '1px solid #d1d5db',
                      background: selectedGoal === goal.value ? '#ecfdf5' : '#fff',
                      borderRadius: 12,
                      padding: '12px',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontWeight: 700, marginBottom: '0.2rem', color: '#0f3e31' }}>{goal.title}</div>
                    <div style={{ color: '#5f6f80', fontSize: 13 }}>{goal.subtitle}</div>
                  </button>
                ))}
              </div>
            </section>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.8rem' }}>
            <button onClick={() => navigate('/onboarding/1')} style={{ border: 'none', background: 'transparent', color: '#0f8b53', fontWeight: 700, cursor: 'pointer' }}>&larr; Back</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12, color: '#5f6f80' }}>Completion</span>
              <div style={{ width: 110, height: 8, background: '#e6ebf0', borderRadius: 999 }}>
                <div style={{ width: '66%', height: 8, background: '#0f8b53', borderRadius: 999 }} />
              </div>
            </div>
            <button onClick={handleNext} style={{ border: 'none', borderRadius: 10, background: '#0f8b53', color: '#fff', padding: '0.9rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>
              Continue to Step 3
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
