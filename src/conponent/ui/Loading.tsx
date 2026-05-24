export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-28 h-28 rounded-full border-4 border-gray-800"></div>
        <div className="absolute w-28 h-28 rounded-full border-4 border-transparent border-t-red-500 border-r-red-400 animate-spin"></div>
        <div className="w-16 h-16 rounded-full bg-gray-950 border border-gray-800 shadow-2xl flex items-center justify-center">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        </div>
      </div>
      <div className="absolute mt-44 text-center">
        <p className="text-red-500 tracking-[0.3em] text-sm font-semibold animate-pulse">
          LOADING
        </p>
        <p className="text-gray-500 text-xs mt-2">Fetching movies...</p>
      </div>
    </div>
  );
}
