import { defineStore } from "pinia";
import api from "@/api/index";

export const useContainerTypeStore = defineStore("container_types", {
    state: () => ({
      container_types: [],
      container_type: {},
      error: null,
      loading: false,
    }),
    actions: {
      async fetchContainerTypes(filteredOptions = {}) {
        this.loading = true;
        try {
          const response = await api.get("container-types/", { params: filteredOptions });
          this.container_types = response.data;
          return response.data;
        } catch (error) {
          console.log('GET container_types: ', error);
          this.error = error;
          throw error
        } finally {
          this.loading = false;
        }
      },
      async fetchContainerType(id) {
        this.loading = true;
        try {
          const response = await api.get(`container-types/${id}/`);
          this.container_type = response.data;
          return response.data;
        } catch (error) {
          console.log('GET container_type: ', error);
          this.error = error;
          throw error
        } finally {
          this.loading = false;
        }
      },
    },
})