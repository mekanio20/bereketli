import router from '@/router/index';
import { useToastStore } from "@/stores/toast";
import { defineStore } from "pinia";
import api from "@/api/index";
import i18n from "@/i18n/index";
const { t } = i18n.global
import {
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
      const toast = useToastStore();
      this.loading = true;
      try {
        const response = await api.post("token/", data);
        setAccessToken(response.data.access);
        setRefreshToken(response.data.refresh);
        this.access_token = response.data.access
        this.refresh_token = response.data.refresh
        return response
      } catch (error) {
        toast.show({
          type: "error",
          title: t('errors.name'),
          message: t('errors.login_failed'),
        })
        this.error = error;
        throw error
      } finally {
        this.loading = false;
      }
    },
    async register(data) {
      const toast = useToastStore();
      this.loading = true;
      try {
        const response = await api.post("register/", data);
        setAccessToken(response.data.access);
        setRefreshToken(response.data.refresh);
        this.access_token = response.data.access
        this.refresh_token = response.data.refresh
        return response
      } catch (error) {
        toast.show({
          type: "error",
          title: t('errors.name'),
          message: t('errors.register_failed'),
        })
        this.error = error;
        throw error
      } finally {
        this.loading = false;
      }
    },
    async sendOtp(data) {
      const toast = useToastStore();
      this.loading = true;
      try {
        const otp = await api.post("otp/", data);
        return otp
      } catch (error) {
        if (data.purpose === "registration") {
          toast.show({
            type: "error",
            title: t('errors.name'),
            message: t('errors.register_failed'),
          })
        }
        if (data.purpose === "forgot_password") {
          toast.show({
            type: "error",
            title: t('errors.name'),
            message: t('errors.reset_password_failed'),
          })
        }
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async resetPassword(data) {
      const toast = useToastStore();
      this.loading = true;
      try {
        const response = await api.post("password-reset/", data);
        setAccessToken(response.data.access);
        setRefreshToken(response.data.refresh);
        this.access_token = response.data.access
        this.refresh_token = response.data.refresh
        return response
      } catch (error) {
        toast.show({
          type: "error",
          title: t('errors.name'),
          message: t('errors.reset_password_failed'),
        })
        this.error = error;
        throw error
      } finally {
        this.loading = false;
      }
    },
    logout() {
      clearTokens();
      this.access_token = null;
      this.refresh_token = null;
      router.push({ name: "Home" });
    },
  },
});
