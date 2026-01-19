import { defineStore } from "pinia";
import api from "@/api/index";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  clearTokens,
} from "@/composables/useTokens";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    access_token: localStorage.getItem("bereketli_access"),
    refresh_token: localStorage.getItem("bereketli_refresh"),
    error: null,
    loading: false,
  }),
  getters: {
    isAuthenticated: (state) => !!state.access_token,
  },
  actions: {
    // SET
    setError(message) {
      this.error = message;
    },
    clearError() {
      this.error = "";
    },
    // API
    async login(data) {
      this.loading = true;
      try {
        const response = await api.post("token/", data);
        setAccessToken(response.data.access);
        setRefreshToken(response.data.refresh);
      } catch (error) {
        this.error = error;
        throw error
      } finally {
        this.loading = false;
      }
    },
    async register(data) {
      this.loading = true;
      try {
        const response = await api.post("token/", data);
        setAccessToken(response.data.access);
        setRefreshToken(response.data.refresh);
      } catch (error) {
        this.error = error;
        throw error
      } finally {
        this.loading = false;
      }
    },
    async sendOtp(data) {
      this.loading = true;
      try {
        const otp = await api.post("otp/", data);
        return otp
      } catch (error) {
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
  logout() {
    this.access_token = null;
    this.refresh_token = null;
    this.subdomain = null;
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("subdomain");
  },
});
