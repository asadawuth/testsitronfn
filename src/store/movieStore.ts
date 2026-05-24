import { makeAutoObservable, runInAction } from "mobx";
import { movieApi } from "../api/movieapi";
import type { EditsDataMovie } from "../types/movie";

import type {
  Movie,
  Pagination,
  MovieListResponse,
  CreateMoviePayload,
  HistoryItem,
} from "../types/movie";

class MovieStore {
  movies: Movie[] = [];
  pagination: Pagination | null = null;
  history: HistoryItem[] = [];
  loading = false;
  page = 1;

  constructor() {
    makeAutoObservable(this);
  }

  async listMovie(
    page = 1,
    limit = 8,
    search?: string,
    type_movie?: string
  ): Promise<MovieListResponse> {
    try {
      this.loading = true;

      const res = await movieApi.getListMovie(page, limit, search, type_movie);

      runInAction(() => {
        this.movies = res.data;
        this.pagination = res.pagination;
        this.page = page;
      });

      return res;
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async createMovie(payload: CreateMoviePayload) {
    return await movieApi.createMovie(payload);
  }

  async deleteMovie(id: number) {
    return await movieApi.deleteMovie(id);
  }

  async historyEditsAdmin(page = 1, limit = 20) {
    try {
      this.loading = true;

      const res = await movieApi.historyEditsAdmin(page, limit);

      runInAction(() => {
        this.history = res.data;
        this.pagination = res.pagination;
        this.page = page;
      });

      return res;
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  setPage(page: number) {
    this.page = page;
  }

  async editListMovie(id: number, payload: EditsDataMovie) {
    try {
      this.loading = true;

      const res = await movieApi.editListMovie(id, payload);

      return res;
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

export const movieStore = new MovieStore();
