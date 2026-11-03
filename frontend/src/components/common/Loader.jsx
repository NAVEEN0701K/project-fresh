export default function Loader({ count = 8, className = '' }) {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="skeleton h-48 w-full" />
          <div className="p-4 space-y-3">
            <div className="skeleton h-3 w-1/3 rounded" />
            <div className="skeleton h-5 w-3/4 rounded" />
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-2/3 rounded" />
            <div className="flex justify-between items-center pt-1">
              <div className="skeleton h-6 w-1/3 rounded" />
              <div className="skeleton h-8 w-1/3 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
