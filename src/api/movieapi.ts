import { api } from "./api";
import type { EditsDataMovie } from "../types/movie";

export const movieApi = {
  getListMovie: async (
    page = 1,
    limit = 8,
    search?: string,
    type_movie?: string
  ) => {
    const res = await api.get("/listmovie/getlistmovie", {
      params: { page, limit, search, type_movie },
    });
    return res.data;
  },

  createMovie: async (payload: any) => {
    const formData = new FormData();
    Object.entries(payload).forEach(([k, v]) => {
      if (v) formData.append(k, v as any);
    });

    const res = await api.post("/listmovie/createdmovie", formData);
    return res.data;
  },

  deleteMovie: async (id: number) => {
    const res = await api.delete(`/listmovie/deletelistmovie/${id}`);
    return res.data;
  },

  historyEditsAdmin: async (page = 1, limit = 20) => {
    const res = await api.get("/listmovie/history", {
      params: { page, limit },
    });
    return res.data;
  },

  editListMovie: async (id: number, payload: EditsDataMovie) => {
    const formData = new FormData();

    Object.entries(payload).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        formData.append(k, v as any);
      }
    });

    const res = await api.patch(`/listmovie/editslistmovie/${id}`, formData);

    return res.data;
  },
};
