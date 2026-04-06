// ── BMI ───────────────────────────────────────────────────────────────────────

/** Returns BMI rounded to 1 decimal, or null if inputs are invalid. */
export function calcBmi(weightKg, heightCm) {
  if (!weightKg || !heightCm) return null;
  const m = heightCm / 100;
  return Number((weightKg / (m * m)).toFixed(1));
}

/** Returns a label + Tailwind colour classes for a given BMI value. */
export function bmiCategory(bmi) {
  if (bmi < 18.5) return { label: 'Underweight',    color: 'text-blue-600 bg-blue-50 border-blue-100' };
  if (bmi < 25)   return { label: 'Healthy Weight',  color: 'text-emerald-600 bg-emerald-50 border-emerald-100' };
  if (bmi < 30)   return { label: 'Overweight',      color: 'text-yellow-600 bg-yellow-50 border-yellow-100' };
  return           { label: 'Obese',                 color: 'text-red-600 bg-red-50 border-red-100' };
}

// ── Mifflin-St Jeor BMR ───────────────────────────────────────────────────────

/**
 * Estimates Basal Metabolic Rate.
 * sex: 'male' | 'female'  (defaults to 'male')
 */
export function calcBmr(weightKg, heightCm, age, sex = 'male') {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return Math.round(sex === 'female' ? base - 161 : base + 5);
}

// ── Onboarding localStorage helpers ──────────────────────────────────────────

const KEYS = {
  age:      'onboarding_age',
  height:   'onboarding_height',
  weight:   'onboarding_weight',
  goal:     'onboarding_goal',
  complete: 'onboarding_complete',
};

export const onboardingStorage = {
  save: (data) => Object.entries(data).forEach(([k, v]) => {
    if (KEYS[k]) localStorage.setItem(KEYS[k], v);
  }),

  load: () => ({
    age:      Number(localStorage.getItem(KEYS.age)    || 0),
    height:   Number(localStorage.getItem(KEYS.height) || 0),
    weight:   Number(localStorage.getItem(KEYS.weight) || 0),
    goal:     localStorage.getItem(KEYS.goal)     || '',
    complete: localStorage.getItem(KEYS.complete) === 'true',
  }),

  markComplete: () => localStorage.setItem(KEYS.complete, 'true'),

  clear: () => Object.values(KEYS).forEach((k) => localStorage.removeItem(k)),
};
