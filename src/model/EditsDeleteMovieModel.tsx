import { X, Trash2, Save, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { authStore } from "../store/authStore";
import { movieStore } from "../store/movieStore";
import type { Movie } from "../types/movie";

type Props = {
  open: boolean;
  onClose: () => void;
  movie: Movie | null;
  onUpdate?: () => void;
  onDelete?: (id: number) => void | Promise<void>;
};

const getDeleteErrorMessage = (err: any) => {
  const status = err?.response?.status;
  const message =
    err?.response?.data?.message ||
    err?.response?.data?.error ||
    err?.message ||
    "Unknown error";

  if (status === 401) {
    return "Delete failed: please login again.";
  }

  if (status === 403) {
    return "Delete failed: only MANAGER can delete movies.";
  }

  return `Delete failed${status ? ` (${status})` : ""}: ${message}`;
};

export default function EditsDeleteMovieModel({
  open,
  onClose,
  movie,
  onUpdate,
  onDelete,
}: Props) {
  const [tab, setTab] = useState<"edit" | "delete">("edit");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [form, setForm] = useState({
    title: "",
    release_year: "",
    type_movie: "G",
    rate: 0,
  });

  useEffect(() => {
    if (movie) {
      setForm({
        title: movie.title || "",
        release_year: movie.release_year || "",
        type_movie: movie.type_movie || "G",
        rate: movie.rate || 0,
      });

      setImageFile(null);
      setDeleteError("");
    }
  }, [movie]);

  const handleSave = async () => {
    if (!movie) return;
    try {
      setLoading(true);
      await movieStore.editListMovie(movie.id, {
        title: form.title,
        release_year: form.release_year,
        type_movie: form.type_movie as any,
        rate: form.rate,
        image: imageFile || undefined,
      });
      await onUpdate?.();
      onClose();
    } catch (err) {
      console.error("Edit movie error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMovie = async () => {
    if (!movie || !onDelete) return;

    try {
      setLoading(true);
      setDeleteError("");
      await onDelete(movie.id);
      onClose();
    } catch (err) {
      console.error("Delete movie error:", err);
      setDeleteError(getDeleteErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  if (!open || !movie) return null;

  const previewImage = imageFile
    ? URL.createObjectURL(imageFile)
    : `${import.meta.env.VITE_API_URL}${movie.image_url}`;
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />
      <div className="relative w-105 h-screen bg-zinc-900 border-l border-white/10 shadow-2xl animate-[slideInRight_0.35s_ease-out] overflow-y-auto">
        <div className="sticky top-0 z-10 bg-zinc-900 border-b border-white/10 p-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Movie Manager</h2>
            <p className="text-xs text-white/40 mt-1">
              Manage movie information
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition cursor-pointer"
          >
            <X size={18} className="text-white" />
          </button>
        </div>
        <div className="flex border-b border-white/10">
          <button
            onClick={() => setTab("edit")}
            className={`flex-1 py-4 text-sm font-medium transition cursor-pointer ${
              tab === "edit"
                ? "text-yellow-400 border-b-2 border-yellow-400 bg-yellow-400/5"
                : "text-white/50 hover:text-white"
            }`}
          >
            Edit
          </button>
          {authStore.user?.role === "MANAGER" && (
            <button
              onClick={() => setTab("delete")}
              className={`flex-1 py-4 text-sm font-medium transition cursor-pointer ${
                tab === "delete"
                  ? "text-red-400 border-b-2 border-red-400 bg-red-400/5"
                  : "text-white/50 hover:text-white"
              }`}
            >
              Delete
            </button>
          )}
        </div>
        <div className="p-5">
          {/* EDIT TAB */}
          {tab === "edit" && (
            <div className="space-y-5">
              {/* IMAGE */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={previewImage}
                  alt={movie.title}
                  className="w-full h-60 object-cover"
                />

                <label className="absolute bottom-3 right-3 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setImageFile(e.target.files[0]);
                      }
                    }}
                  />

                  <div className="w-11 h-11 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center hover:scale-105 transition">
                    <Upload size={18} className="text-white" />
                  </div>
                </label>
              </div>

              {/* INFO */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-black/30 border border-white/10 rounded-xl p-3">
                  <p className="text-xs text-white/40">Movie ID</p>

                  <p className="text-white font-semibold mt-1">#{movie.id}</p>
                </div>

                <div className="bg-black/30 border border-white/10 rounded-xl p-3">
                  <p className="text-xs text-white/40">Admin ID</p>

                  <p className="text-white font-semibold mt-1">
                    {movie.user_admin}
                  </p>
                </div>
              </div>

              {/* TITLE */}
              <div>
                <label className="text-sm text-white/70 block mb-2">
                  Movie Title
                </label>

                <input
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title: e.target.value,
                    })
                  }
                  className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-yellow-400"
                />
              </div>

              {/* YEAR */}
              <div>
                <label className="text-sm text-white/70 block mb-2">
                  Release Year
                </label>

                <input
                  type="text"
                  value={form.release_year}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      release_year: e.target.value,
                    })
                  }
                  className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-yellow-400"
                />
              </div>

              {/* RATE */}
              <div>
                <label className="text-sm text-white/70 block mb-2">
                  Rating %
                </label>

                <input
                  type="number"
                  min={0}
                  max={100}
                  value={form.rate}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      rate: Number(e.target.value),
                    })
                  }
                  className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-yellow-400"
                />
              </div>

              {/* TYPE */}
              <div>
                <label className="text-sm text-white/70 block mb-2">
                  Rating Type
                </label>

                <select
                  value={form.type_movie}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      type_movie: e.target.value,
                    })
                  }
                  className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-yellow-400"
                >
                  <option value="G">G</option>
                  <option value="PG">PG</option>
                  <option value="M">M</option>
                  <option value="MA">MA</option>
                  <option value="R">R</option>
                </select>
              </div>

              {/* CREATED */}
              <div className="rounded-xl bg-black/20 border border-white/10 p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/40">Created At</span>

                  <span className="text-white">
                    {movie.created_at?.slice(0, 10)}
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-white/40">Image URL</span>

                  <span className="text-white truncate max-w-45">
                    {movie.image_url}
                  </span>
                </div>
              </div>

              {/* SAVE */}
              <button
                onClick={handleSave}
                disabled={loading}
                className=" w-full h-12 rounded-xl bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 text-black font-bold flex items-center justify-center gap-2 transition cursor-pointer
  "
              >
                <Save size={18} />
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
          {tab === "delete" && authStore.user?.role === "MANAGER" && (
            <div className="space-y-5">
              <div className="rounded-2xl overflow-hidden border border-red-500/20">
                <img
                  src={`${import.meta.env.VITE_API_URL}${movie.image_url}`}
                  alt={movie.title}
                  className="w-full h-60 object-cover opacity-70"
                />
              </div>
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5">
                <h3 className="text-white font-bold text-lg">{movie.title}</h3>
                <p className="text-red-200/70 text-sm mt-2">
                  This action cannot be undone.
                </p>
              </div>
              <button
                onClick={handleDeleteMovie}
                disabled={loading}
                className="w-full h-12 rounded-xl bg-red-500 hover:bg-red-400 disabled:opacity-50 text-white font-bold flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Trash2 size={18} />
                {loading ? "Deleting..." : "Delete Movie"}
              </button>
              {deleteError && (
                <div className="text-center text-sm text-red-300">
                  {deleteError}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
