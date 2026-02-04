import { defineStore } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useToastStore } from "@/stores/toast";
import api from "@/api/index";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {},
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
      const toast = useToastStore();
      this.loading = true;
      try {
        const response = await api.put(`users/${user.id}/`, user);
        this.user = response.data;

        toast.show({
          type: "success",
          title: "Üstünlikli",
          message: "Ulanyjy maglumatlary üstünlikli täzelendi.",
        });
      } catch (error) {
        this.error = error;
        toast.show({
          type: "error",
          title: "Ýalňyşlyk",
          message: "Ulanyjy maglumatlaryny täzeläp bolmady.",
        });
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
