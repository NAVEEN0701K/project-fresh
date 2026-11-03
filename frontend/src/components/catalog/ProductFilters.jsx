import { useState, useEffect } from 'react';
import { X, SlidersHorizontal, RotateCcw } from 'lucide-react';

const SORT_OPTIONS = [
  { value: 'createdAt_desc', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating_desc', label: 'Top Rated' },
  { value: 'name_asc', label: 'Name: AZ' },
];

export default function ProductFilters({ params, onUpdate, totalCount }) {
  const [localMin, setLocalMin] = useState(params.minPrice || '');
  const [localMax, setLocalMax] = useState(params.maxPrice || '');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const currentSort = `${params.sort || 'createdAt'}_${params.order || 'desc'}`;

  const handleSort = (val) => {
    const [sort, order] = val.split('_');
    onUpdate({ sort, order });
  };

  const applyPrice = () => {
    onUpdate({
      minPrice: localMin || undefined,
      maxPrice: localMax || undefined,
    });
  };

  const clearAll = () => {
    setLocalMin('');
    setLocalMax('');
    onUpdate({
      minPrice: undefined,
      maxPrice: undefined,
      isAvailable: undefined,
      sort: 'createdAt',
      order: 'desc',
    });
  };

  const hasActiveFilters =
    params.minPrice || params.maxPrice || params.isAvailable !== undefined;

  const FiltersContent = (
    <div className="space-y-5">
      {/* Availability */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Availability</h4>
        <div className="space-y-2">
          {[
            { label: 'All Products', value: undefined },
            { label: 'In Stock Only', value: true },
          ].map((opt) => (
            <label key={String(opt.value)} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="availability"
                checked={params.isAvailable === opt.value}
                onChange={() => onUpdate({ isAvailable: opt.value })}
                className="accent-primary-700"
              />
              <span className="text-sm text-gray-700">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Price Range ()</h4>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            min="0"
            value={localMin}
            onChange={(e) => setLocalMin(e.target.value)}
            placeholder="Min"
            className="w-1/2 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
          />
          <span className="text-gray-400 text-sm"></span>
          <input
            type="number"
            min="0"
            value={localMax}
            onChange={(e) => setLocalMax(e.target.value)}
            placeholder="Max"
            className="w-1/2 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
          />
        </div>
        <button
          onClick={applyPrice}
          className="mt-2 w-full bg-primary-700 text-white text-sm py-2 rounded-lg hover:bg-primary-800 transition-colors font-medium"
        >
          Apply
        </button>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearAll}
          className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 font-medium"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block w-56 flex-shrink-0">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-24">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </h3>
            {hasActiveFilters && (
              <button onClick={clearAll} className="text-xs text-red-500 hover:text-red-700">
                Clear
              </button>
            )}
          </div>
          {FiltersContent}
        </div>
      </div>

      {/* Mobile filter bar */}
      <div className="lg:hidden flex items-center gap-2 flex-wrap mb-4">
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 border border-gray-200 bg-white px-4 py-2 rounded-xl text-sm font-medium hover:border-primary-300 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4 text-primary-700" />
          Filters
          {hasActiveFilters && (
            <span className="bg-primary-700 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">!</span>
          )}
        </button>

        <select
          value={currentSort}
          onChange={(e) => handleSort(e.target.value)}
          className="border border-gray-200 bg-white px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        <span className="text-sm text-gray-500 ml-auto">{totalCount} products</span>
      </div>

      {/* Mobile drawer overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-2xl p-5 overflow-y-auto filter-drawer open">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-900 text-lg">Filters</h3>
              <button onClick={() => setDrawerOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            {FiltersContent}
            <button
              onClick={() => setDrawerOpen(false)}
              className="mt-6 w-full bg-primary-700 text-white py-3 rounded-xl font-semibold"
            >
              Show Results
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export { SORT_OPTIONS };
