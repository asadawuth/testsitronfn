import { api } from "./api";

export const authApi = {
  login: async (identifier: string, password: string) => {
    const res = await api.post("/users/login", { identifier, password });
    return res.data;
  },

  oauthLogin: async (provider: string, oauthData: any) => {
    const res = await api.post("/users/oauth", {
      provider,
      ...oauthData,
    });
    return res.data;
  },

  logout: async () => {
    return api.post("/users/logout");
  },

  logoutAll: async () => {
    return api.post("/users/logoutall");
  },

  usersystem: async (page = 1, limit = 50) => {
    const res = await api.get(`/users/userststem?page=${page}&limit=${limit}`);
    return res.data;
  },
};
