import { defineStore } from "pinia";
import api from "@/api/index";

export const useFaqsStore = defineStore("faqs", {
  state: () => ({
    faqs: [],
  }),
  actions: {
    toggleAccordion(index) {
      this.faqs.forEach((item, i) => {
        if (i !== index) {
          item.isOpen = false;
        }
      });
      this.faqs[index].isOpen = !this.faqs[index].isOpen;
    },
    setContentHeight(index, height) {
      this.faqs[index].contentHeight = height;
    },
    async fetchFaqs() {
      this.loading = true;
      try {
        const response = await api.get("faqs/");
        this.faqs = response.data.map((item) => ({ ...item, contentHeight: 200, isOpen: false }));
        return response.data;
      } catch (error) {
        console.log('GET faqs: ', error);
        this.error = error;
        throw error
      } finally {
        this.loading = false;
      }
    },
  },
});
