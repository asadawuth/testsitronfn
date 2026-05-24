export function MovieSkeleton() {
  return (
    <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 animate-pulse">
      <div className="h-60 bg-gray-800"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
        <div className="h-2 bg-gray-700 rounded w-full"></div>
        <div className="h-2 bg-gray-700 rounded w-2/3"></div>
      </div>
    </div>
  );
}
