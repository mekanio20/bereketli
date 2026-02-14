import { defineStore } from "pinia";
import api from "@/api/index";

export const useForbiddenStore = defineStore("forbidden", {
  state: () => ({
    forbidden_cargos: [],
  }),
  actions: {
    toggleAccordion(index) {
      this.forbidden_cargos.forEach((item, i) => {
        if (i !== index) {
          item.isOpen = false;
        }
      });
      this.forbidden_cargos[index].isOpen = !this.forbidden_cargos[index].isOpen;
    },
    setContentHeight(index, height) {
      this.forbidden_cargos[index].contentHeight = height;
    },
    async fetchForbidden() {
      this.loading = true;
      try {
        const response = await api.get("forbidden-cargos/");
        this.forbidden_cargos = response.data.map((item) => ({ ...item, question: item.name, answer: item.description, contentHeight: 200, isOpen: false }));
        return response.data;
      } catch (error) {
        console.log('GET forbidden: ', error);
        this.error = error;
        throw error
      } finally {
        this.loading = false;
      }
    },
  },
});
