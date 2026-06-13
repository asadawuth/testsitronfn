import { Star, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import type { Movie } from "../types/movie";
import { movieStore } from "../store/movieStore";
import { observer } from "mobx-react-lite";
import { MovieSkeleton } from "../conponent/ui/MovieSkeleton";
import Pagination from "../conponent/ui/Pagination";
import CreatedMovieModel from "../model/CreatedMoiveModel";
import EditsDeleteMovieModel from "../model/EditsDeleteMovieModel";

const getRatingUI = (type: string) => {
  switch (type) {
    case "G":
      return {
        label: "General Audiences",
        desc: "Suitable for all ages",
        color: "bg-green-500",
      };

    case "PG":
      return {
        label: "Parental Guidance Suggested",
        desc: "Some material may not be suitable for children",
        color: "bg-blue-500",
      };

    case "M":
      return {
        label: "Mature Audiences",
        desc: "Recommended for adults",
        color: "bg-yellow-500",
      };

    case "MA":
      return {
        label: "Mature Audience",
        desc: "Strong content for mature viewers",
        color: "bg-orange-500",
      };

    case "R":
      return {
        label: "Restricted",
        desc: "Adults only content",
        color: "bg-red-600",
      };

    default:
      return {
        label: "Unknown",
        desc: "",
        color: "bg-gray-500",
      };
  }
};

const MoviePage = observer(() => {
  const [openCreatedMovie, setOpenCreatedMovie] = useState(false);
  const [openEditsAndDelete, setOpenEditsAndDelete] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const fetchMovies = async () => {
    try {
      await movieStore.listMovie(movieStore.page, 8);
    } catch (err) {
      console.error("Fetch movies error:", err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [movieStore.page]);

  if (movieStore.loading) {
    return (
      <div className="bg-black min-h-screen p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <MovieSkeleton key={i} />
        ))}
      </div>
    );
  }

  const handleDelete = async (id: number) => {
    try {
      await movieStore.deleteMovie(id);
      await movieStore.listMovie(movieStore.page, 8);
      setOpenEditsAndDelete(false);
    } catch (err) {
      console.error("Delete movie error:", err);
      throw err;
    }
  };

  return (
    <>
      <div className="bg-black min-h-screen text-white px-8 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">🎬 Movies</h1>
          <p className="text-gray-400 text-sm mt-1">
            Explore latest movies and ratings
          </p>
          <button
            onClick={() => setOpenCreatedMovie(true)}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-yellow-400 via-amber-500 to-yellow-600 text-black font-bold shadow-lg shadow-yellow-500/30 hover:scale-105 hover:shadow-yellow-400/50 active:scale-95 transition-all duration-300 cursor-pointer
            "
          >
            👉 Click Create Movie
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movieStore.movies.map((movie) => {
            const rating = getRatingUI(movie.type_movie);
            return (
              <div
                key={movie.id}
                className=" group relative rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 shadow-xl cursor-pointer hover:scale-[1.04] transition duration-300
                "
              >
                <div className="relative aspect-2/3 overflow-hidden">
                  <img
                    src={`${import.meta.env.VITE_API_URL}${movie.image_url}`}
                    alt={movie.title}
                    className=" w-full h-full object-cover group-hover:scale-110 transition duration-500
                    "
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />
                  <div className="absolute top-3 right-3 bg-black/70 px-2 py-1 rounded-full flex items-center gap-1">
                    <Star
                      size={20}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <span className="text-sm font-bold">
                      {(movie.rate / 20).toFixed(1)}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedMovie(movie);
                      setOpenEditsAndDelete(true);
                    }}
                    className="cursor-pointer absolute top-16 right-3 w-11 h-11 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-xl hover:bg-yellow-400 hover:scale-110 transition-all duration-300"
                  >
                    <Pencil size={20} className="text-white hover:text-black" />
                  </button>
                  <div className="absolute top-3 left-3 group/rating">
                    <div
                      className={` px-3 py-1 rounded-full text-white text-sm font-bold shadow-lg ${rating.color}
                      `}
                    >
                      {rating.label}
                    </div>
                    <div className="absolute left-0 mt-2 hidden group-hover/rating:block">
                      <div className="bg-black/90 text-white text-[10px] px-2 py-1 rounded-md whitespace-nowrap">
                        {rating.desc}
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 w-full p-4">
                    <h2 className="text-white font-bold text-2xl truncate">
                      {movie.title}
                    </h2>
                    <div className="flex justify-between text-sm text-gray-300 mt-1">
                      <span>{movie.release_year}</span>
                      <span>{movie.type_movie}</span>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm text-gray-300 mb-1">
                        <span>Rating</span>
                        <span>{movie.rate}%</span>
                      </div>
                      <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-2 bg-linear-to-r from-yellow-400 to-red-500 transition-all duration-500"
                          style={{ width: `${movie.rate}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Pagination
          page={movieStore.page}
          totalPages={movieStore.pagination?.totalPages || 1}
          onPageChange={(page) => {
            movieStore.setPage(page);
          }}
        />
      </div>
      <CreatedMovieModel
        open={openCreatedMovie}
        onClose={() => setOpenCreatedMovie(false)}
        onSuccess={() => {
          fetchMovies();
          setOpenCreatedMovie(false);
        }}
      />
      <EditsDeleteMovieModel
        open={openEditsAndDelete}
        movie={selectedMovie}
        onClose={() => setOpenEditsAndDelete(false)}
        onUpdate={async () => {
          await fetchMovies();
          setOpenEditsAndDelete(false);
        }}
        onDelete={handleDelete}
      />
    </>
  );
});

export default MoviePage;
