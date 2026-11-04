import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CATEGORIES = [
  {
    name: 'Fresh Fruits',
    slug: 'fruits',
    path: '/fruits',
    description: 'Apples, mangoes, berries and more',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=80',
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    bgGlow: 'rgba(251,146,60,0.25)',
    count: '50+ varieties',
    badge: 'Most Popular',
  },
  {
    name: 'Vegetables',
    slug: 'vegetables',
    path: '/vegetables',
    description: 'Farm-fresh daily picks from certified farms',
    image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=400&q=80',
    gradient: 'from-green-500 via-emerald-500 to-teal-600',
    bgGlow: 'rgba(16,185,129,0.25)',
    count: '60+ varieties',
    badge: 'Best Value',
  },
  {
    name: 'Fresh Flowers',
    slug: 'flowers',
    path: '/flowers',
    description: 'Roses, lilies, bouquets and more',
    image: 'https://images.unsplash.com/photo-1487530811015-780b680a3f74?w=400&q=80',
    gradient: 'from-pink-500 via-rose-500 to-fuchsia-600',
    bgGlow: 'rgba(236,72,153,0.25)',
    count: '40+ varieties',
    badge: 'Gift Ready',
  },
];

export default function CategoryList() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Shop by Category</h2>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">Explore our freshest picks across all categories</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
        {CATEGORIES.map((cat, i) => (
          <CategoryCard key={cat.slug} category={cat} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}

export function CategoryCard({ category, delay = 0 }) {
  return (
    <Link
      to={category.path}
      className="group relative overflow-hidden rounded-3xl h-56 sm:h-64 block shadow-md hover:shadow-2xl transition-all duration-500 animate-slide-up"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Image */}
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700 ease-out"
        style={{ transform: 'scale(1)' }}
        loading="lazy"
      />

      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-70 group-hover:opacity-80 transition-opacity duration-300`}
        style={{ mixBlendMode: 'multiply' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      {/* Badge */}
      <div className="absolute top-4 right-4">
        <span className="bg-white/25 backdrop-blur text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/30">
          {category.badge}
        </span>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
        <h3 className="text-white text-xl sm:text-2xl font-extrabold leading-tight drop-shadow-sm">
          {category.name}
        </h3>
        <p className="text-white/80 text-sm mt-1 leading-snug">{category.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-white/80 text-xs font-semibold bg-white/20 backdrop-blur px-3 py-1 rounded-full border border-white/25">
            {category.count}
          </span>
          <span className="flex items-center gap-1 bg-white text-gray-900 text-xs font-black px-3.5 py-1.5 rounded-full shadow-md group-hover:gap-2 transition-all duration-300">
            Shop Now <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* Hover glow at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"
        style={{ background: category.bgGlow }}
      />
    </Link>
  );
}
