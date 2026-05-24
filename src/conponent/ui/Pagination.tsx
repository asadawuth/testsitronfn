import { ChevronLeft, ChevronRight } from "lucide-react";
type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};
export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePrev = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };
  const handleNext = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };
  return (
    <div className="flex items-center justify-center gap-3 mt-10">
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className="flex items-center gap-1 px-4 py-2 rounded-xl bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
      >
        <ChevronLeft size={18} />
        Prev
      </button>
      <div className="px-4 py-2 rounded-xl bg-gray-900 border border-gray-700 text-sm text-gray-300">
        Page <span className="text-white font-bold">{page}</span> / {totalPages}
      </div>
      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className="flex items-center gap-1 px-4 py-2 rounded-xl bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
      >
        Next
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
