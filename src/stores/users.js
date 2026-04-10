import { defineStore } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useToastStore } from "@/stores/toast";
import { setUserId } from "@/composables/useTokens";
import api from "@/api/index";
import i18n from "@/i18n/index";
const { t } = i18n.global

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
        setUserId(response.data.id);
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
          title: t('success.name'),
          message: t('success.user_update'),
        });
      } catch (error) {
        this.error = error;
        toast.show({
          type: "error",
          title: t('errors.name'),
          message: t('errors.user_update'),
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
