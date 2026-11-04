import { useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductGrid from '../components/catalog/ProductGrid';
import ProductFilters from '../components/catalog/ProductFilters';
import ProductSort from '../components/catalog/ProductSort';
import Pagination from '../components/catalog/Pagination';
import CategoryThemedBackground from '../components/common/CategoryThemedBackground';

export default function Flowers() {
  const { products, loading, error, pagination, params, updateParams, goToPage, refetch } = useProducts({
    category: 'flowers',
  });

  useEffect(() => {
    document.title = 'Fresh Flowers - FreshBasket';
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Flowers Background */}
      <CategoryThemedBackground category="flowers" />

      <div className="relative z-10">
        <div className="relative overflow-hidden bg-gradient-to-br from-pink-400 to-rose-500 h-40 sm:h-48 mx-4 sm:mx-6 lg:mx-8 mt-4 rounded-3xl shadow-lg">
        <div className="absolute inset-0 bg-black/10" />
        <img
          src="https://images.unsplash.com/photo-1487530811015-780b680a3f74?w=1200&q=70"
          alt="Fresh Flowers"
          className="w-full h-full object-cover mix-blend-overlay"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Fresh Flowers</h1>
          <p className="text-white/90 mt-1">Roses, lilies, marigolds, orchids and gorgeous bouquets</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <ProductFilters params={params} onUpdate={updateParams} totalCount={pagination.totalCount} />
          <div className="flex-1 min-w-0">
            <ProductSort params={params} onUpdate={updateParams} totalCount={pagination.totalCount} />
            <ProductGrid products={products} loading={loading} error={error} onRetry={refetch} />
            <Pagination pagination={pagination} onPageChange={goToPage} />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
