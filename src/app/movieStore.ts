import { movieApi } from "../api/movieapi";
import type {
  Movie,
  Pagination,
  MovieListResponse,
  CreateMoviePayload,
} from "../types/movie";
import type { HistoryResponse } from "../types/movie";

export const movieStore = {
  movies: [] as Movie[],
  pagination: null as Pagination | null,

  async listMovie(
    page = 1,
    limit = 8,
    search?: string,
    type_movie?: string
  ): Promise<MovieListResponse> {
    const res = await movieApi.getListMovie(page, limit, search, type_movie);
    this.movies = res.data;
    this.pagination = res.pagination;
    return res;
  },

  async createMovie(payload: CreateMoviePayload) {
    return await movieApi.createMovie(payload);
  },

  async deleteMovie(id: number) {
    return await movieApi.deleteMovie(id);
  },

  async historyEditsAdmin(page = 1, limit = 20): Promise<HistoryResponse> {
    return await movieApi.historyEditsAdmin(page, limit);
  },
};
