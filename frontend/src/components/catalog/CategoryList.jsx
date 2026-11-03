import { Link } from 'react-router-dom';

const CATEGORIES = [
  {
    name: 'Fresh Fruits',
    slug: 'fruits',
    path: '/fruits',
    description: 'Apples, mangoes, berries & more',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=80',
    color: 'from-amber-400/80 to-orange-500/80',
    emoji: '',
    count: '50+ varieties',
  },
  {
    name: 'Vegetables',
    slug: 'vegetables',
    path: '/vegetables',
    description: 'Farm-fresh daily picks',
    image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=400&q=80',
    color: 'from-green-500/80 to-emerald-600/80',
    emoji: '',
    count: '60+ varieties',
  },
  {
    name: 'Fresh Flowers',
    slug: 'flowers',
    path: '/flowers',
    description: 'Roses, lilies, bouquets & more',
    image: 'https://images.unsplash.com/photo-1487530811015-780b680a3f74?w=400&q=80',
    color: 'from-pink-400/80 to-rose-500/80',
    emoji: '',
    count: '40+ varieties',
  },
];

export default function CategoryList() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Shop by Category</h2>
        <p className="text-gray-500 mt-2">Explore our freshest picks across all categories</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {CATEGORIES.map((cat) => (
          <CategoryCard key={cat.slug} category={cat} />
        ))}
      </div>
    </section>
  );
}

export function CategoryCard({ category }) {
  return (
    <Link to={category.path} className="group relative overflow-hidden rounded-3xl h-52 sm:h-60 block">
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        loading="lazy"
      />
      <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-70 group-hover:opacity-75 transition-opacity duration-300`} />

      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="text-3xl mb-2">{category.emoji}</div>
        <h3 className="text-white text-xl font-extrabold leading-tight">{category.name}</h3>
        <p className="text-white/80 text-sm mt-1">{category.description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-white/70 text-xs font-medium bg-white/20 px-2 py-1 rounded-full">{category.count}</span>
          <span className="text-white text-sm font-semibold group-hover:translate-x-1 transition-transform duration-200">
            Shop 
          </span>
        </div>
      </div>
    </Link>
  );
}
