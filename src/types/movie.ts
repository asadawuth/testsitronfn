export type MovieType = "G" | "PG" | "M" | "MA" | "R";

export interface Movie {
  id: number;
  user_admin: number;
  title: string;
  release_year: string;
  type_movie: MovieType;
  created_at: string;
  image_url: string;
  rate: number;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface MovieListResponse {
  message: string;
  pagination: Pagination;
  data: Movie[];
}

export interface CreateMoviePayload {
  title: string;
  release_year: string;
  type_movie: MovieType;
  rate: number;
  image: File | null;
}

export interface HistoryUser {
  first_name: string;
  last_name: string;
  role: string;
}

export interface MovieHistoryData {
  title: string;
  release_year: string;
  type_movie: string;
  image_url: string | null;
  rate: number | null;
}

export interface HistoryItem {
  id: number;
  user_id: number | null;
  movie_id: number | null;
  action: string;
  users: HistoryUser;
  old_data: MovieHistoryData | null;
  new_data: MovieHistoryData | null;
  created_at: string;
}

export interface HistoryResponse {
  message: string;
  pagination: Pagination;
  data: HistoryItem[];
}

export const movieTypeLabel: Record<MovieType, string> = {
  G: "General Audiences",
  PG: "Parental Guidance",
  M: "Mature",
  MA: "15+ Mature",
  R: "18+ Restricted",
};

export interface EditsDataMovie {
  title?: string;
  release_year?: string;
  type_movie?: string;
  rate?: number;
  image?: File;
}
