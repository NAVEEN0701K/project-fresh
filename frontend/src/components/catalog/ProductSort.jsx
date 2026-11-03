import { ArrowUpDown } from 'lucide-react';
import { SORT_OPTIONS } from './ProductFilters';

export default function ProductSort({ params, onUpdate, totalCount }) {
  const currentSort = `${params.sort || 'createdAt'}_${params.order || 'desc'}`;

  const handleSort = (val) => {
    const [sort, order] = val.split('_');
    onUpdate({ sort, order });
  };

  return (
    <div className="hidden lg:flex items-center justify-between mb-5">
      <p className="text-sm text-gray-500">
        <span className="font-semibold text-gray-800">{totalCount}</span> products found
      </p>
      <div className="flex items-center gap-2">
        <ArrowUpDown className="w-4 h-4 text-gray-400" />
        <select
          value={currentSort}
          onChange={(e) => handleSort(e.target.value)}
          className="border border-gray-200 bg-white px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 cursor-pointer"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
