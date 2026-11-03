import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-4 sm:mt-6">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Text */}
          <div className="animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full mb-5">
              <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
               Fresh from Farm to Your Door
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
              The Freshest
              <span className="block text-green-300">Market Online</span>
            </h1>

            <p className="text-white/80 text-lg sm:text-xl mb-8 max-w-lg">
              Shop premium fruits, farm-fresh vegetables and beautiful flowers  delivered within hours, straight from the source.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/catalog"
                className="inline-flex items-center gap-2 bg-white text-primary-700 font-bold px-7 py-3.5 rounded-2xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/fruits"
                className="inline-flex items-center gap-2 border-2 border-white/50 text-white font-semibold px-7 py-3.5 rounded-2xl hover:bg-white/10 transition-all duration-200"
              >
                Browse Fruits
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-10">
              {[
                { value: '500+', label: 'Fresh Products' },
                { value: '50K+', label: 'Happy Customers' },
                { value: '100%', label: 'Fresh Guarantee' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-extrabold text-white">{stat.value}</p>
                  <p className="text-white/60 text-xs">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image grid */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {[
              'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&q=80',
              'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=300&q=80',
              'https://images.unsplash.com/photo-1487530811015-780b680a3f74?w=300&q=80',
              'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&q=80',
            ].map((src, idx) => (
              <div
                key={idx}
                className={`rounded-2xl overflow-hidden ${idx === 0 || idx === 3 ? 'mt-4' : '-mt-4'}`}
              >
                <img
                  src={src}
                  alt="Fresh produce"
                  className="w-full h-36 object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
