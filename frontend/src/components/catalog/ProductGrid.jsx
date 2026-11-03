import ProductCard from './ProductCard';
import Loader from '../common/Loader';
import { PackageSearch } from 'lucide-react';

export default function ProductGrid({ products, loading, error }) {
  if (loading) return <Loader count={8} />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <PackageSearch className="w-8 h-8 text-red-400" />
        </div>
        <p className="text-red-500 font-semibold">Something went wrong</p>
        <p className="text-sm text-gray-400 mt-1">{error}</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <PackageSearch className="w-8 h-8 text-gray-400" />
        </div>
        <p className="font-semibold text-gray-700">No products found</p>
        <p className="text-sm text-gray-400 mt-1">Try adjusting your filters or search term</p>
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
