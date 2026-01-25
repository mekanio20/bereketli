import { defineStore } from "pinia";
import api from "@/api/index";

export const useItemCategoryStore = defineStore("item_categories", {
  state: () => ({
    item_categories: [],
    item_category: {},
    error: null,
    loading: false,
  }),
  actions: {
    async fetchItemCategories() {
      this.loading = true;
      try {
        const response = await api.get("item-categories/");
        this.item_categories = response.data;
        return response.data;
      } catch (error) {
        console.log('GET item_categories: ', error);
        this.error = error;
        throw error
      } finally {
        this.loading = false;
      }
    },
    // DETAILS
    async fetchItemCategory(id) {
      this.loading = true;
      try {
        const response = await api.get(`item-categories/${id}/`);
        this.item_category = response.data;
        return response.data;
      } catch (error) {
        console.log('GET item_category: ', error);
        this.error = error;
        throw error
      } finally {
        this.loading = false;
      }
    },
  },
});