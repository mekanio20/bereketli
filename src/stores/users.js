import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import api from "@/api/index";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
    loading: false,
    error: null,
  }),
  actions: {
    async getUser() {
      this.loading = true;
      try {
        const response = await api.get("users/me/");
        this.user = response.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async getUserById(id) {
      this.loading = true;
      try {
        const response = await api.get(`users/${id}/`);
        this.user = response.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async updateUser(user) {
      this.loading = true;
      try {
        const response = await api.put(`users/${user.id}/`, user);
        this.user = response.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async deleteUser(id) {
      this.loading = true;
      const auth = useAuthStore();
      try {
        await api.delete(`users/${id}/`);
        auth.logout();
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
});
