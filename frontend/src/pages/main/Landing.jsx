import { Link } from 'react-router-dom';

const trustedBy = ['ADDIS GYM', 'ETHIO FIT', 'LION SPORT', 'ABAY WELLNESS', 'RIFT VALLEY FC'];

const testimonials = [
  {
    text: '"This app completely changed how I train. The tracking features are detailed and very easy to use every day."',
    name: 'Abebe Girma',
    role: 'Personal Trainer, Addis Ababa',
    initials: 'AG',
  },
  {
    text: '"I tried many fitness apps but HulFit is different. It helped me lose 15kg in 3 months. I recommend it to everyone."',
    name: 'Tigist Haile',
    role: 'Fitness Enthusiast, Hawassa',
    initials: 'TH',
  },
  {
    text: '"Great app, great results. It fits perfectly into my daily routine and keeps me accountable every single day."',
    name: 'Dawit Bekele',
    role: 'Marathon Runner, Bahir Dar',
    initials: 'DB',
  },
];

const footerLinks = {
  HULFIT: ['Membership', 'Features', 'Pricing', 'Community'],
  COMPANY: ['About Us', 'Careers', 'Blog', 'Support'],
  RESOURCES: ['Help Center', 'Tutorials', 'Contact Us', 'Privacy'],
  SOCIAL: ['Instagram', 'Telegram', 'Facebook', 'YouTube'],
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-bold text-gray-900 text-lg tracking-tight">
            Hul<span className="text-emerald-600">Fit</span>
          </span>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-600 font-medium">
            <a href="#features" className="hover:text-emerald-600 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-emerald-600 transition-colors">Pricing</a>
            <a href="#community" className="hover:text-emerald-600 transition-colors">Community</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-28 pb-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 max-w-xl">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-5">
              Track Your <br />
              <span className="text-emerald-600">Fitness Journey</span> <br />
              Smarter
            </h1>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              Experience powerful insights, meal tracking, and personalized
              workout planning. Designed for the high-performance life.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <Link
                to="/register"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Dashboard mockup */}
          <div className="flex-1 flex justify-center">
            <div className="bg-gray-900 rounded-2xl p-4 w-full max-w-sm shadow-2xl">
              <div className="flex items-center gap-1.5 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <div className="bg-gray-800 rounded-xl p-4 mb-3">
                <p className="text-gray-400 text-xs mb-2">Weekly Progress</p>
                <div className="flex items-end gap-1.5 h-16">
                  {[30, 55, 40, 70, 60, 85, 75].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-emerald-500 opacity-80"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Calories', val: '2,140' },
                  { label: 'Workouts', val: '12' },
                  { label: 'Streak', val: '7d' },
                ].map((s) => (
                  <div key={s.label} className="bg-gray-800 rounded-lg p-2 text-center">
                    <p className="text-emerald-400 font-bold text-sm">{s.val}</p>
                    <p className="text-gray-500 text-xs">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trusted By ── */}
      <section className="py-10 border-y border-gray-100 bg-gray-50">
        <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-6 font-medium">
          Trusted by leading Ethiopian fitness companies
        </p>
        <div className="flex flex-wrap justify-center gap-10 px-6">
          {trustedBy.map((name) => (
            <span key={name} className="text-gray-400 font-bold text-sm tracking-widest">
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">The Science of Balance</h2>
          <p className="text-gray-500 text-sm max-w-lg mb-12">
            Our platform integrates every aspect of your health into a single dashboard that adapts as you grow.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Workout Tracking */}
            <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex flex-col row-span-2">
              <div className="p-6">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 rounded-full px-2 py-0.5">01</span>
                <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2">Workout Tracking</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Track your progress with intelligent schedules that always adapt. Get insights based on your performance.
                </p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80"
                alt="Workout"
                className="w-full h-52 object-cover mt-auto"
              />
            </div>

            {/* Stat card */}
            <div className="rounded-2xl bg-emerald-600 p-6 flex flex-col justify-between shadow-sm">
              <span className="text-xs font-semibold text-emerald-100 bg-emerald-700 rounded-full px-2 py-0.5 self-start">
                Top Performer
              </span>
              <div>
                <p className="text-6xl font-bold text-white mt-4">12.4k</p>
                <p className="text-emerald-200 text-sm mt-1">Weekly Active Users</p>
                <div className="flex items-end gap-1 h-8 mt-4">
                  {[40, 60, 45, 80, 55].map((h, i) => (
                    <div key={i} className="w-3 rounded-sm bg-emerald-400 opacity-70" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Diet Tracking */}
            <div className="rounded-2xl border border-gray-100 p-6 shadow-sm">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 rounded-full px-2 py-0.5">02</span>
              <h3 className="text-base font-bold text-gray-900 mt-3 mb-2">Diet Tracking</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Monitor your nutrition and calorie intake. Create meal plans that complement your workout routine.
              </p>
              <div className="flex items-center gap-2 mt-4">
                <div className="w-8 h-4 rounded-full bg-emerald-600" />
                <span className="text-xs text-gray-400">Auto-sync enabled</span>
              </div>
            </div>
          </div>

          {/* Progress Monitoring */}
          <div className="mt-5 rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 rounded-full px-2 py-0.5">03</span>
              <h3 className="text-base font-bold text-gray-900 mt-3 mb-2">Progress Monitoring</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                Real-time analytics to keep you motivated. Track every aspect of your fitness journey to hit your goals faster.
              </p>
            </div>
            <div className="flex items-end gap-2 h-16">
              {[50, 70, 45, 90, 65, 80, 55, 75].map((h, i) => (
                <div key={i} className="w-5 rounded-sm bg-emerald-200" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex gap-0.5 mb-3">
                  {[1,2,3,4,5].map((i) => (
                    <span key={i} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{t.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="bg-emerald-700 rounded-3xl px-10 py-16 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to elevate your wellness?
            </h2>
            <p className="text-emerald-200 text-sm mb-8 max-w-md mx-auto">
              Join 50,000+ users who have transformed their fitness. Your journey to peak wellness starts with one click.
            </p>
            <Link
              to="/register"
              className="inline-block bg-white text-emerald-700 font-bold px-8 py-3 rounded-xl hover:bg-emerald-50 transition-colors text-sm"
            >
              Sign Up Now
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-white border-t border-gray-100 py-14 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <p className="text-xs font-bold text-gray-900 tracking-widest mb-4">{heading}</p>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-gray-500 hover:text-emerald-600 transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-gray-400 mt-12">
          © {new Date().getFullYear()} HulFit. All rights reserved.
        </p>
      </footer>

    </div>
  );
}
