import ProductCard from './ProductCard';
import Loader from '../common/Loader';
import { PackageSearch, RefreshCw } from 'lucide-react';

export default function ProductGrid({ products, loading, error, onRetry }) {
  if (loading) return <Loader count={8} />;

  if (error && (!products || products.length === 0)) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-3xl border border-gray-100 shadow-sm my-4">
        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4 text-primary-700">
          <PackageSearch className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Products are loading</h3>
        <p className="text-xs text-gray-500 max-w-sm mb-5">
          Connecting to our farm catalog. Click below to refresh stock.
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="btn-shine inline-flex items-center gap-2 bg-primary-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md hover:bg-primary-800 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh Products
          </button>
        )}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-3xl border border-gray-100 shadow-sm my-4">
        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 text-gray-400">
          <PackageSearch className="w-8 h-8" />
        </div>
        <p className="font-bold text-gray-800 text-base">No products match your criteria</p>
        <p className="text-xs text-gray-400 mt-1 max-w-sm">
          Try clearing filters, searching for a different keyword, or exploring another category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 animate-fade-in">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
