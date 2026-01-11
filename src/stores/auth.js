import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    access_token: localStorage.getItem("access_token"),
    refresh_token: localStorage.getItem("refresh_token"),
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

      } catch (error) {}
    },
    async register() {
      this.loading = true;
      try {

      } catch (error) {}
    },
    async sendOtp() {
      this.loading = true;
      try {

      } catch (error) {}
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
