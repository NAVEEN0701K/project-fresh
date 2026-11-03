import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ pagination, onPageChange }) {
  const { currentPage, totalPages, totalCount, hasNextPage, hasPrevPage } = pagination;

  if (totalPages <= 1) return null;

  const pages = [];
  const delta = 1;
  const left = currentPage - delta;
  const right = currentPage + delta;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= left && i <= right)) {
      pages.push(i);
    } else if (i === left - 1 || i === right + 1) {
      pages.push('...');
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
      <p className="text-sm text-gray-500">
        Showing page <span className="font-semibold text-gray-700">{currentPage}</span> of{' '}
        <span className="font-semibold text-gray-700">{totalPages}</span> ({totalCount} products)
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrevPage}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {pages.map((page, idx) => (
          <button
            key={idx}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === '...'}
            className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-medium transition-colors ${
              page === currentPage
                ? 'bg-primary-700 text-white'
                : page === '...'
                ? 'text-gray-400 cursor-default'
                : 'border border-gray-200 text-gray-600 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
