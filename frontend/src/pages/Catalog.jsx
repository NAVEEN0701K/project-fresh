import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductGrid from '../components/catalog/ProductGrid';
import ProductFilters from '../components/catalog/ProductFilters';
import ProductSort from '../components/catalog/ProductSort';
import Pagination from '../components/catalog/Pagination';

export default function Catalog() {
  const [searchParams] = useSearchParams();

  const initialParams = {
    search: searchParams.get('search') || undefined,
    category: searchParams.get('category') || undefined,
    featured: searchParams.get('featured') || undefined,
  };

  const { products, loading, error, pagination, params, updateParams, goToPage, refetch } = useProducts(initialParams);

  useEffect(() => {
    document.title = 'All Products - FreshBasket';
  }, []);

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">All Products</h1>
          <p className="text-gray-500 mt-1">Browse our complete fresh catalog</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters (Desktop Sidebar + Mobile Drawer in one component) */}
          <ProductFilters params={params} onUpdate={updateParams} totalCount={pagination.totalCount} />

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Desktop Sort */}
            <ProductSort params={params} onUpdate={updateParams} totalCount={pagination.totalCount} />

            {/* Search indicator */}
            {params.search && (
              <div className="mb-4 flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-600">
                  Results for: <strong>&quot;{params.search}&quot;</strong>
                </span>
                <button
                  onClick={() => updateParams({ search: undefined })}
                  className="text-xs text-red-500 hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}

            <ProductGrid products={products} loading={loading} error={error} onRetry={refetch} />
            <Pagination pagination={pagination} onPageChange={goToPage} />
          </div>
        </div>
      </div>
    </div>
  );
}
