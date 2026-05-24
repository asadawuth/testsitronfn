import { useEffect, useState } from "react";
import Pagination from "../conponent/ui/Pagination";
import { observer } from "mobx-react-lite";
import { movieStore } from "../store/movieStore";

const movieTypeLabel: Record<string, string> = {
  G: "G (General)",
  PG: "PG (Parental Guidance)",
  M: "M (Mature)",
  MA: "MA 15+ (Mature Accompanied)",
  R: "R 18+ (Restricted)",
};

const normalizeType = (type?: string | null) =>
  (type || "").trim().toUpperCase();

const HistoryListMovie = observer(() => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    movieStore.historyEditsAdmin(page);
  }, [page]);

  return (
    <>
      <div className="min-h-screen bg-black text-white p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Movie History</h1>
          <p className="text-white/40 text-sm">
            Audit log - edit history tracking
          </p>
        </div>
        {movieStore.loading ? (
          <div className="text-white/50">Loading...</div>
        ) : (
          <>
            <div className="space-y-4">
              {movieStore.history.map((item) => (
                <div
                  key={`${item.id}-${item.created_at}`}
                  className="border border-white/10 rounded-2xl bg-white/5 p-4 md:p-5"
                >
                  {/* user + time */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="font-semibold">
                        {item.users?.first_name} {item.users?.last_name}
                      </div>
                      <div className="text-xs text-white/40">
                        Role: {item.users?.role}
                      </div>
                    </div>

                    <div className="text-xs text-white/40">
                      {item.created_at
                        ? new Date(item.created_at).toLocaleString("th-TH")
                        : "-"}
                    </div>
                  </div>

                  {/* action */}
                  <div className="mb-3">
                    <span className="px-2 py-1 rounded bg-yellow-500/20 text-yellow-400 text-xs">
                      {item.action}
                    </span>
                    <span className="ml-2 text-white/40 text-xs">
                      Movie ID: {item.movie_id ?? "-"}
                    </span>
                  </div>

                  {/* compare */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* OLD */}
                    <div className="border border-red-500/20 bg-red-500/5 rounded-xl p-3">
                      <p className="text-xs text-red-400 mb-2">OLD</p>

                      <p className="text-sm">
                        Title: {item.old_data?.title ?? "-"}
                      </p>

                      <p className="text-sm">
                        Type:{" "}
                        {movieTypeLabel[
                          normalizeType(item.old_data?.type_movie)
                        ] ||
                          item.old_data?.type_movie ||
                          "-"}
                      </p>

                      <p className="text-sm">
                        Rate: {item.old_data?.rate ?? "-"}
                      </p>

                      {item.old_data?.image_url && (
                        <img
                          src={`${import.meta.env.VITE_API_URL}${
                            item.old_data.image_url
                          }`}
                          className="w-100 h-100 object-cover rounded mt-2"
                        />
                      )}
                    </div>

                    {/* NEW */}
                    <div className="border border-green-500/20 bg-green-500/5 rounded-xl p-3">
                      <p className="text-xs text-green-400 mb-2">NEW</p>

                      <p className="text-sm">
                        Title: {item.new_data?.title ?? "-"}
                      </p>

                      <p className="text-sm">
                        Type:{" "}
                        {movieTypeLabel[
                          normalizeType(item.new_data?.type_movie)
                        ] ||
                          item.new_data?.type_movie ||
                          "-"}
                      </p>

                      <p className="text-sm">
                        Rate: {item.new_data?.rate ?? "-"}
                      </p>

                      {item.new_data?.image_url && (
                        <img
                          src={`${import.meta.env.VITE_API_URL}${
                            item.new_data.image_url
                          }`}
                          className="w-100 h-100 object-cover rounded mt-2"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        <div className="mt-6">
          <Pagination
            page={page}
            totalPages={movieStore.pagination?.totalPages || 1}
            onPageChange={setPage}
          />
        </div>
      </div>
    </>
  );
});

export default HistoryListMovie;
