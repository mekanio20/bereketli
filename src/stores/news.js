import { defineStore } from "pinia";
import api from "@/api/index";

export const useNewsStore = defineStore("news", {
  state: () => ({
    news: [],
    news_count: 0,
    news_detail: {},
    loading: false,
    error: null,
  }),
  actions: {
    getNewsById(id) {
      return this.newsData.find((news) => news.id === Number(id));
    },

    async fetchNews() {
      this.loading = true;
      try {
        const response = await api.get("news/");
        this.news = response.data.results;
        this.news_count = response.data.count;
        return response.data;
      } catch (error) {
        console.log("GET news: ", error);
        this.error = error;
        throw error;
      }
    },

    async fetchNewsById(id) {
      this.loading = true;
      try {
        const response = await api.get(`news/${id}/`);
        this.news_detail = response.data;
        return response.data;
      } catch (error) {
        console.log("GET news: ", error);
        this.error = error;
        throw error;
      }
    },
  },
});
