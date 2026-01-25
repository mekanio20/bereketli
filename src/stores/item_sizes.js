import { defineStore } from "pinia";
import api from "@/api/index";

export const useItemSizeStore = defineStore("item_sizes", {
  state: () => ({
    item_sizes: [],
    item_size: {},
    error: null,
    loading: false,
  }),
  actions: {
    async fetchItemSizes() {
      this.loading = true;
      try {
        const response = await api.get("item-sizes/");
        this.item_sizes = response.data;
        return response.data;
      } catch (error) {
        console.log('GET item_sizes: ', error);
        this.error = error;
        throw error
      } finally {
        this.loading = false;
      }
    },
    // DETAILS
    async fetchItemSize(id) {
      this.loading = true;
      try {
        const response = await api.get(`item-sizes/${id}/`);
        this.item_size = response.data;
        return response.data;
      } catch (error) {
        console.log('GET item_size: ', error);
        this.error = error;
        throw error
      } finally {
        this.loading = false;
      }
    },
  },
});