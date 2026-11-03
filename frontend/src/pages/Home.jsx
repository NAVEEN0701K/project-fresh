import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Leaf, Shield, Clock, Star, ArrowRight, Zap } from 'lucide-react';
import HeroBanner from '../components/catalog/HeroBanner';
import CategoryList from '../components/catalog/CategoryList';
import ProductGrid from '../components/catalog/ProductGrid';
import { useProducts } from '../hooks/useProducts';

const BENEFITS = [
  { icon: Truck, title: 'Free Delivery', desc: 'Free delivery on orders above Rs 499', color: 'bg-blue-100 text-blue-600' },
  { icon: Leaf, title: '100% Fresh', desc: 'Farm-to-door freshness guarantee', color: 'bg-green-100 text-green-600' },
  { icon: Shield, title: 'Quality Assured', desc: 'Every product quality-checked', color: 'bg-purple-100 text-purple-600' },
  { icon: Clock, title: 'Express Delivery', desc: 'Same-day delivery available', color: 'bg-orange-100 text-orange-600' },
];

const OFFERS = [
  {
    title: 'Fruits Festival',
    subtitle: 'Up to 25% off on seasonal fruits',
    desc: 'Stock up on mangoes, berries and exotic tropical picks',
    cta: 'Shop Fruits',
    to: '/fruits',
    bg: 'bg-gradient-to-br from-amber-50 to-orange-100',
    border: 'border-orange-200',
    btnColor: 'bg-orange-500 hover:bg-orange-600',
  },
  {
    title: 'Veggie Deals',
    subtitle: 'Everyday low prices on vegetables',
    desc: 'Fresh from certified organic farms near you',
    cta: 'Shop Vegetables',
    to: '/vegetables',
    bg: 'bg-gradient-to-br from-green-50 to-emerald-100',
    border: 'border-green-200',
    btnColor: 'bg-primary-700 hover:bg-primary-800',
  },
  {
    title: 'Flower Sale',
    subtitle: 'Special prices on premium bouquets',
    desc: 'Perfect for gifting, events and decor',
    cta: 'Shop Flowers',
    to: '/flowers',
    bg: 'bg-gradient-to-br from-pink-50 to-rose-100',
    border: 'border-pink-200',
    btnColor: 'bg-rose-500 hover:bg-rose-600',
  },
];

export default function Home() {
  const { products: featured, loading: featuredLoading, error: featuredError } = useProducts({ featured: 'true', limit: 8 });
  const { products: newest, loading: newestLoading, error: newestError } = useProducts({ limit: 8, sort: 'createdAt', order: 'desc' });

  useEffect(() => {
    document.title = 'FreshBasket - Farm-Fresh Marketplace';
  }, []);

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Benefits Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {BENEFITS.map((b) => (
            <div key={b.title} className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-gray-100">
              <div className={`w-10 h-10 ${b.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <b.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{b.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shop by Category */}
      <CategoryList />

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span className="text-sm font-semibold text-amber-600 uppercase tracking-wide">Featured</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Top Picks for You</h2>
          </div>
          <Link
            to="/catalog?featured=true"
            className="hidden sm:flex items-center gap-1.5 text-primary-700 font-semibold text-sm hover:text-primary-800 transition-colors"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <ProductGrid products={featured} loading={featuredLoading} error={featuredError} />
        <Link
          to="/catalog?featured=true"
          className="sm:hidden mt-4 flex items-center justify-center gap-1.5 text-primary-700 font-semibold text-sm"
        >
          View All Featured <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Promotional Offers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-center gap-2 mb-6">
          <Zap className="w-5 h-5 text-accent fill-accent" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Special Offers</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {OFFERS.map((offer) => (
            <div
              key={offer.title}
              className={`${offer.bg} border ${offer.border} rounded-3xl p-6 flex flex-col justify-between min-h-[200px]`}
            >
              <div>
                <h3 className="text-lg font-extrabold text-gray-900">{offer.title}</h3>
                <p className="text-sm font-semibold text-gray-700 mt-1">{offer.subtitle}</p>
                <p className="text-xs text-gray-500 mt-2">{offer.desc}</p>
              </div>
              <Link
                to={offer.to}
                className={`mt-4 inline-flex items-center gap-2 ${offer.btnColor} text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors w-fit`}
              >
                {offer.cta} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Newest Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">New Arrivals</h2>
            <p className="text-gray-500 text-sm mt-1">Freshest stock just arrived</p>
          </div>
          <Link
            to="/catalog"
            className="hidden sm:flex items-center gap-1.5 text-primary-700 font-semibold text-sm hover:text-primary-800 transition-colors"
          >
            All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <ProductGrid products={newest} loading={newestLoading} error={newestError} />
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-gradient-to-r from-primary-700 to-primary-800 rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Stay Fresh, Stay Updated!
          </h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            Get exclusive offers, seasonal picks and farm-fresh deals delivered straight to your inbox.
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="bg-accent text-white px-5 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
