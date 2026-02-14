import { defineStore } from "pinia";
import api from "@/api/index";

export const useSupportStore = defineStore("support", {
  state: () => ({
    support: {},
    loading: false,
    error: null,
  }),
  actions: {
    async getMessages() {
      this.loading = true;
      try {
        const response = await api.get("support-room/");
        console.log('Response -> ', response);
        this.support = response.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    }
  },
});