import { makeAutoObservable } from "mobx";
import { authApi } from "../api/authapi";
import type { User, UserSystemItem } from "../types/auth";

const TOKEN_KEY = "access_token";
const USER_KEY = "user";

class AuthStore {
  token: string | null = localStorage.getItem(TOKEN_KEY);
  user: User | null = JSON.parse(localStorage.getItem(USER_KEY) || "null");
  users: UserSystemItem[] = [];
  loading = false;
  page = 1;
  totalPages = 1;

  constructor() {
    makeAutoObservable(this);
  }

  get isAuth() {
    return !!this.token;
  }

  async login(identifier: string, password: string) {
    try {
      this.loading = true;
      const res = await authApi.login(identifier, password);
      localStorage.setItem(TOKEN_KEY, res.accessToken);
      localStorage.setItem(USER_KEY, JSON.stringify(res.user));
      this.token = res.accessToken;
      this.user = res.user;
      return res;
    } finally {
      this.loading = false;
    }
  }

  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
    this.token = token;
  }

  setUser(user: User, token?: string) {
    if (token) {
      this.setToken(token);
    }
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.user = user;
  }

  async logout() {
    await authApi.logout();
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.token = null;
    this.user = null;
  }

  async logoutAll() {
    await authApi.logoutAll();
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.token = null;
    this.user = null;
  }

  async usersystem(page = 1, limit = 50) {
    try {
      this.loading = true;
      const res = await authApi.usersystem(page, limit);
      this.users = res.data;
      this.totalPages = res.pagination.totalPages;
      this.page = page;
      return res;
    } finally {
      this.loading = false;
    }
  }

  setPage(page: number) {
    this.page = page;
  }

  clearAuth() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.token = null;
    this.user = null;
  }
}

export const authStore = new AuthStore();
