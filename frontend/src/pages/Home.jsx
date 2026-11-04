import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Leaf, Shield, Clock, Star, ArrowRight, Zap, TrendingUp, Sparkles } from 'lucide-react';
import HeroBanner from '../components/catalog/HeroBanner';
import CategoryList from '../components/catalog/CategoryList';
import ProductGrid from '../components/catalog/ProductGrid';
import ProductSlider from '../components/catalog/ProductSlider';
import { useProducts } from '../hooks/useProducts';

const BENEFITS = [
  { icon: Truck, title: 'Free Delivery', desc: 'Free on orders above Rs. 499', color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50', text: 'text-blue-700' },
  { icon: Leaf, title: '100% Fresh', desc: 'Farm-to-door freshness guarantee', color: 'from-green-500 to-emerald-500', bg: 'bg-green-50', text: 'text-green-700' },
  { icon: Shield, title: 'Quality Assured', desc: 'Every product quality-checked', color: 'from-purple-500 to-violet-500', bg: 'bg-purple-50', text: 'text-purple-700' },
  { icon: Clock, title: 'Express Delivery', desc: 'Same-day delivery available', color: 'from-orange-500 to-amber-500', bg: 'bg-orange-50', text: 'text-orange-700' },
];

const OFFERS = [
  {
    title: 'Fruits Festival',
    subtitle: 'Up to 25% off on seasonal fruits',
    desc: 'Mangoes, berries and exotic tropical picks',
    cta: 'Shop Fruits',
    to: '/fruits',
    gradient: 'from-amber-400 via-orange-400 to-red-400',
    ring: 'ring-orange-200',
  },
  {
    title: 'Veggie Deals',
    subtitle: 'Everyday low prices on vegetables',
    desc: 'Fresh from certified organic farms near you',
    cta: 'Shop Vegetables',
    to: '/vegetables',
    gradient: 'from-green-500 via-emerald-500 to-teal-500',
    ring: 'ring-green-200',
  },
  {
    title: 'Flower Sale',
    subtitle: 'Special prices on premium bouquets',
    desc: 'Perfect for gifting, events and decor',
    cta: 'Shop Flowers',
    to: '/flowers',
    gradient: 'from-pink-500 via-rose-500 to-fuchsia-500',
    ring: 'ring-pink-200',
  },
];

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function Home() {
  const { products: featured, loading: featuredLoading, error: featuredError, refetch: refetchFeatured } = useProducts({ featured: 'true', limit: 10 });
  const { products: newest, loading: newestLoading, error: newestError, refetch: refetchNewest } = useProducts({ limit: 8, sort: 'createdAt', order: 'desc' });

  useEffect(() => {
    document.title = 'FreshBasket - Farm-Fresh Marketplace';
  }, []);

  return (
    <div className="min-h-screen" style={{ background: '#F0FAF4' }}>
      {/* Hero Banner */}
      <HeroBanner />

      {/* Benefits Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {BENEFITS.map((b, i) => (
            <div
              key={b.title}
              className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-xs border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default animate-slide-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className={`w-10 h-10 ${b.bg} rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${b.color}`}>
                <b.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className={`text-sm font-bold ${b.text}`}>{b.title}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-snug">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <CategoryList />

      {/* Dynamic Product Carousel / Slider: Featured Top Picks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <ProductSlider
          products={featured}
          title="Featured Farm Picks"
          subtitle="Customer favorites moving fast — swipe or click arrows to explore"
          badge="Popular Today"
          autoPlay={true}
          autoPlayInterval={3800}
        />
      </section>

      {/* Stats Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="bg-gradient-to-r from-primary-700 via-emerald-700 to-primary-800 rounded-3xl p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/8 rounded-full blur-2xl" />
          <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { label: 'Happy Customers', value: 50000, suffix: '+' },
              { label: 'Fresh Products', value: 500, suffix: '+' },
              { label: 'Cities Served', value: 12, suffix: '' },
              { label: 'Years of Freshness', value: 5, suffix: '+' },
            ].map((s) => (
              <div key={s.label}>
                <p
                  className="text-3xl sm:text-4xl font-black text-white mb-1"
                  style={{ fontFamily: "'Poppins',sans-serif" }}
                >
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </p>
                <p className="text-white/60 text-xs font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Offers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center">
            <Zap className="w-5 h-5 text-orange-500 fill-orange-500" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Special Offers</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {OFFERS.map((offer, i) => (
            <div
              key={offer.title}
              className={`relative overflow-hidden rounded-3xl ring-1 ${offer.ring} bg-gradient-to-br ${offer.gradient} p-6 flex flex-col justify-between min-h-[220px] group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 animate-slide-up`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="absolute -top-8 -right-8 w-28 h-28 bg-white/15 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-black/10 rounded-full blur-2xl" />

              <div className="relative">
                <h3 className="text-xl font-extrabold text-white drop-shadow">{offer.title}</h3>
                <p className="text-sm font-semibold text-white/90 mt-1">{offer.subtitle}</p>
                <p className="text-xs text-white/70 mt-2">{offer.desc}</p>
              </div>
              <Link
                to={offer.to}
                className="btn-shine relative mt-5 inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-white/35 transition-all w-fit border border-white/30 shadow-md"
              >
                {offer.cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Newest Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-blue-500" />
              </div>
              <span className="text-sm font-bold text-blue-600 uppercase tracking-wide">New In</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">New Arrivals</h2>
            <p className="text-gray-500 text-sm mt-0.5">Freshest stock just arrived from the farm</p>
          </div>
          <Link
            to="/catalog"
            className="hidden sm:flex items-center gap-1.5 bg-gray-100 text-gray-700 font-bold text-sm px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors"
          >
            All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <ProductGrid products={newest} loading={newestLoading} error={newestError} onRetry={refetchNewest} />
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-emerald-700 to-teal-700 rounded-3xl p-8 sm:p-14 text-center">
          <div className="absolute -top-16 -left-16 w-56 h-56 bg-white/8 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-orange-300/15 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
              <Star className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
              Join 50,000+ happy subscribers
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3" style={{ fontFamily: "'Poppins',sans-serif" }}>
              Stay Fresh, Stay Updated!
            </h2>
            <p className="text-white/80 mb-8 max-w-lg mx-auto text-sm sm:text-base">
              Get exclusive offers, seasonal picks and farm-fresh deals straight to your inbox every week.
            </p>
            <div className="flex max-w-md mx-auto gap-2 flex-col sm:flex-row">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-5 py-3.5 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-white/50 shadow-inner bg-white/95"
              />
              <button className="btn-shine bg-orange-500 text-white px-6 py-3.5 rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 whitespace-nowrap">
                Subscribe Free
              </button>
            </div>
            <p className="text-white/50 text-xs mt-3">No spam, unsubscribe anytime.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
