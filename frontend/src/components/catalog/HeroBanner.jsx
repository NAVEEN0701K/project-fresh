import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Truck, Leaf } from 'lucide-react';

const IMAGES = [
  'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=320&q=80',
  'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=320&q=80',
  'https://images.unsplash.com/photo-1487530811015-780b680a3f74?w=320&q=80',
  'https://images.unsplash.com/photo-1542838132-92c53300491e?w=320&q=80',
];

const TRUST_BADGES = [
  { icon: ShieldCheck, text: 'Quality Assured' },
  { icon: Truck, text: 'Free Delivery' },
  { icon: Leaf, text: '100% Fresh' },
];

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-fresh rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-4 sm:mt-6 min-h-[420px] sm:min-h-[480px]">
      {/* Animated gradient orbs */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/8 rounded-full blur-3xl animate-float-slow pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-emerald-300/15 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/3 left-1/2 w-40 h-40 bg-orange-300/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-8 right-1/3 w-24 h-24 bg-green-200/10 rounded-full blur-xl pointer-events-none animate-spin-slow" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: Text */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-full mb-5 border border-white/20 animate-slide-up">
              <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse flex-shrink-0" />
              <Sparkles className="w-3.5 h-3.5 text-green-300 flex-shrink-0" />
              Farm-to-Door Freshness, Daily
            </div>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 animate-slide-up animate-delay-100"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              The Freshest
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-200">
                Market Online
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-white/80 text-base sm:text-lg mb-8 max-w-lg leading-relaxed animate-slide-up animate-delay-200">
              Premium fruits, farm-fresh vegetables and beautiful flowers —
              delivered within hours, straight from certified organic farms.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 animate-slide-up animate-delay-300">
              <Link
                to="/catalog"
                className="btn-shine inline-flex items-center gap-2 bg-white text-primary-700 font-bold px-7 py-3.5 rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 shadow-lg"
              >
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/fruits"
                className="btn-shine inline-flex items-center gap-2 border-2 border-white/40 text-white font-semibold px-7 py-3.5 rounded-2xl hover:bg-white/15 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm"
              >
                Browse Fruits
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-6 sm:gap-10 mt-10 animate-slide-up animate-delay-400">
              {[
                { value: '500+', label: 'Fresh Products' },
                { value: '50K+', label: 'Happy Customers' },
                { value: '100%', label: 'Fresh Guarantee' },
              ].map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <p
                    className="text-2xl sm:text-3xl font-black text-white"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-white/60 text-xs mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 mt-8 animate-slide-up animate-delay-500">
              {TRUST_BADGES.map((b) => (
                <div
                  key={b.text}
                  className="glass-card flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-semibold"
                  style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}
                >
                  <b.icon className="w-3.5 h-3.5 text-green-300" />
                  {b.text}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image mosaic */}
          <div className="hidden lg:block animate-slide-in-right animate-delay-200">
            <div className="grid grid-cols-2 gap-4">
              {IMAGES.map((src, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl overflow-hidden shadow-xl ring-2 ring-white/20 ${
                    idx === 1 || idx === 2 ? 'mt-6' : ''
                  }`}
                  style={{
                    animation: `float ${3.5 + idx * 0.4}s ease-in-out infinite`,
                    animationDelay: `${idx * 0.5}s`,
                  }}
                >
                  <img
                    src={src}
                    alt="Fresh produce"
                    className="w-full h-36 object-cover hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
    </section>
  );
}
