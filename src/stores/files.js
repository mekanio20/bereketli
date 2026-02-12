import { defineStore } from "pinia";
import api from "@/api/index";

export const useFileStore = defineStore("files", {
  state: () => ({
    loading: false,
    error: null,
  }),
  actions: {
    async addFile(data) {
      this.loading = true;
      try {
        const response = await api.post("files/", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response
      } catch (error) {
        console.log('POST files: ', error);
        this.error = error;
        throw error
      } finally {
        this.loading = false;
      }
    }
  },
});