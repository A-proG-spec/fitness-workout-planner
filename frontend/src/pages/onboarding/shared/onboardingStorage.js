const PROFILE_KEY = 'onboarding_profile';
const GOAL_KEY = 'onboarding_goal';

export function getOnboardingProfile() {
  try {
    const raw = sessionStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw);
    if (!p?.heightCm || !p?.weightKg) return null;
    return p;
  } catch {
    return null;
  }
}

export function setOnboardingGoal(goalId) {
  sessionStorage.setItem(GOAL_KEY, JSON.stringify({ id: goalId, savedAt: Date.now() }));
}

export function getOnboardingGoal() {
  try {
    const raw = sessionStorage.getItem(GOAL_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function computeBmi(heightCm, weightKg) {
  const m = heightCm / 100;
  if (m <= 0) return null;
  return weightKg / (m * m);
}

export function bmiBand(bmi) {
  if (bmi < 18.5) return { key: 'under', badge: 'UNDERWEIGHT', short: 'Underweight' };
  if (bmi < 25) return { key: 'normal', badge: 'NORMAL WEIGHT', short: 'Healthy' };
  if (bmi < 30) return { key: 'over', badge: 'OVERWEIGHT', short: 'Overweight' };
  return { key: 'obese', badge: 'OBESE', short: 'Obese' };
}

/** Map BMI ~16–40 to horizontal position % on the spectrum bar */
export function bmiMarkerPercent(bmi) {
  const clamped = Math.min(Math.max(bmi, 16), 40);
  return ((clamped - 16) / 24) * 100;
}

export function bmiCoachText(bandKey) {
  switch (bandKey) {
    case 'under':
      return 'Your BMI is below the typical healthy range. We will prioritize nutrient-dense fueling and strength-safe progression so you can build sustainably.';
    case 'normal':
      return 'You are in a healthy weight range for most adults. We will tune training volume and recovery to match your ambition without compromising metabolic health.';
    case 'over':
      return 'Your BMI suggests room to reduce body fat while preserving muscle. We will emphasize progressive overload paired with a moderate caloric approach.';
    case 'obese':
      return 'Your BMI indicates a higher body-fat range. We will start with joint-friendly volume and steady habits—small wins compound into major change.';
    default:
      return 'We will personalize your plan using the profile you provided.';
  }
}

/** Neutral Mifflin–St Jeor–style estimate (no gender on file). */
export function estimateDailyKcal(profile, goalId) {
  const { age, heightCm, weightKg } = profile;
  if (!age || !heightCm || !weightKg) return 2200;
  const bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 78;
  const tdee = Math.round(bmr * 1.45);
  const delta = goalId === 'lose' ? -350 : goalId === 'muscle' ? 280 : 0;
  return Math.max(1400, tdee + delta);
}

export const GOAL_OPTIONS = [
  {
    id: 'lose',
    title: 'Lose Weight',
    description: 'Burn fat while maintaining energy.',
    summaryTitle: 'Fat Loss',
    focusBadge: 'Calorie deficit focus',
    proteinPct: 32,
  },
  {
    id: 'muscle',
    title: 'Gain Muscle',
    description: 'Build strength and increase mass.',
    summaryTitle: 'Lean Muscle Gain',
    focusBadge: 'High intensity focus',
    proteinPct: 40,
  },
  {
    id: 'maintain',
    title: 'Maintain',
    description: 'Stay lean and improve mobility.',
    summaryTitle: 'Maintenance & mobility',
    focusBadge: 'Balanced focus',
    proteinPct: 30,
  },
];

export function getGoalOption(id) {
  return GOAL_OPTIONS.find((g) => g.id === id) || GOAL_OPTIONS[1];
}
