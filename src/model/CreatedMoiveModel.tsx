import { useState } from "react";
import { ImagePlus, Film } from "lucide-react";
import { observer } from "mobx-react-lite";
import { movieStore } from "../store/movieStore";
import type { MovieType, Movie } from "../types/movie";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: (created?: Movie) => void;
};

function CreatedMovieModel({ open, onClose, onSuccess }: Props) {
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [typeMovie, setTypeMovie] = useState<MovieType>("G");
  const [rate, setRate] = useState(1);
  const [image, setImage] = useState<File | null>(null);

  if (!open) return null;

  const handleCreateMovie = async () => {
    try {
      if (!title.trim()) {
        alert("Movie title is required");
        return;
      }

      if (title.length > 50) {
        alert("Title max 50 characters");
        return;
      }

      if (releaseYear.length !== 4) {
        alert("Release year must be 4 digits");
        return;
      }

      if (rate < 1 || rate > 100) {
        alert("Rate must be between 1 - 100");
        return;
      }

      if (!image) {
        alert("Please upload poster image");
        return;
      }

      const created = await movieStore.createMovie({
        title,
        release_year: releaseYear,
        type_movie: typeMovie,
        rate,
        image,
      });

      onSuccess(created as Movie);

      setTitle("");
      setReleaseYear("");
      setTypeMovie("G");
      setRate(1);
      setImage(null);

      onClose();
    } catch (err) {
      console.error("Create movie error:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div className="w-full max-w-lg bg-linear-to-b from-gray-900 to-black border border-red-500/30 rounded-3xl shadow-2xl overflow-hidden animate-fadeIn">
        <div className="relative p-6 border-b border-white/10">
          <div className="absolute inset-0 bg-red-500/5 blur-3xl" />

          <div className="relative flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-red-600 flex items-center justify-center shadow-lg">
              <Film size={28} className="text-white" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-white">Create Movie</h1>

              <p className="text-gray-400 text-sm mt-1">
                Add a new movie to your collection
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-5">
            <label className="block text-gray-300 mb-2 text-sm font-medium">
              Movie Title
            </label>

            <input
              type="text"
              maxLength={50}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter movie title"
              className="
                w-full p-4 rounded-xl
                bg-black/40
                border border-gray-700
                text-white
                outline-none
                focus:border-red-500
                transition
              "
            />

            <div className="text-right text-xs text-gray-500 mt-1">
              {title.length}/50
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-gray-300 mb-2 text-sm font-medium">
              Release Year
            </label>

            <input
              type="text"
              maxLength={4}
              value={releaseYear}
              onChange={(e) =>
                setReleaseYear(e.target.value.replace(/\D/g, ""))
              }
              placeholder="e.g. 2025"
              className="
                w-full p-4 rounded-xl
                bg-black/40
                border border-gray-700
                text-white
                outline-none
                focus:border-red-500
                transition
              "
            />
          </div>

          <div className="mb-5">
            <label className="block text-gray-300 mb-2 text-sm font-medium">
              Movie Type
            </label>

            <select
              value={typeMovie}
              onChange={(e) => setTypeMovie(e.target.value as MovieType)}
              className="
                w-full p-4 rounded-xl
                bg-black/40
                border border-gray-700
                text-white
                outline-none
                focus:border-red-500
                transition
              "
            >
              <option value="G">G</option>
              <option value="PG">PG</option>
              <option value="M">M</option>
              <option value="MA">MA</option>
              <option value="R">R</option>
            </select>
          </div>

          <div className="mb-5">
            <label className="block text-gray-300 mb-2 text-sm font-medium">
              Movie Rating
            </label>

            <input
              type="number"
              min={1}
              max={100}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              placeholder="Rate 1 - 100"
              className="
                w-full p-4 rounded-xl
                bg-black/40
                border border-gray-700
                text-white
                outline-none
                focus:border-red-500
                transition
              "
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 mb-2 text-sm font-medium">
              Movie Poster
            </label>

            <label
              className="
                w-full flex flex-col items-center justify-center
                p-8 border-2 border-dashed border-gray-700
                rounded-2xl cursor-pointer
                hover:border-red-500
                bg-black/30
                transition
              "
            >
              <ImagePlus size={42} className="text-red-500 mb-3" />

              <span className="text-gray-300 text-sm font-medium">
                Click to upload poster
              </span>

              <span className="text-gray-500 text-xs mt-1">PNG, JPG, WEBP</span>

              {image && (
                <div className="mt-4 text-green-400 text-sm">{image.name}</div>
              )}

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setImage(e.target.files[0]);
                  }
                }}
              />
            </label>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleCreateMovie}
              disabled={movieStore.loading}
              className="
                w-1/2
                bg-red-600 hover:bg-red-700
                disabled:opacity-50
                text-white py-4 rounded-xl
                font-bold
                transition
                shadow-lg
                cursor-pointer
              "
            >
              {movieStore.loading ? "Creating..." : "Save Movie"}
            </button>

            <button
              onClick={onClose}
              className="
                w-1/2
                bg-gray-800 hover:bg-gray-700
                text-white py-4 rounded-xl
                font-bold
                transition
                cursor-pointer
              "
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(CreatedMovieModel);
