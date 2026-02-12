import { defineStore } from "pinia";
import api from "@/api/index";

export const useMessageStore = defineStore("messages", {
  state: () => ({
    messages: [],
    loading: false,
    error: null,
  }),
  actions: {
    async getMessages(filteredOptions = {}) {
      this.loading = true;
      try {
        const response = await api.get("messages/", { params: filteredOptions });
        this.messages = response.data.results.reverse();
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    }
  },
});