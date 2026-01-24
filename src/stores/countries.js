import { defineStore } from "pinia";
import api from "@/api/index";

export const useCountryStore = defineStore("countries", {
  state: () => ({
    countries: [],
    country: {},
    error: null,
    loading: false,
  }),
  actions: {
    async fetchCountries() {
      this.loading = true;
      try {
        const response = await api.get("countries/");
        this.countries = response.data;
        return response.data;
      } catch (error) {
        console.log('GET countries: ', error);
        this.error = error;
        throw error
      } finally {
        this.loading = false;
      }
    },
    // DETAILS
    async fetchCountry(id) {
      this.loading = true;
      try {
        const response = await api.get(`countries/${id}/`);
        this.country = response.data;
        return response.data;
      } catch (error) {
        console.log('GET country: ', error);
        this.error = error;
        throw error
      } finally {
        this.loading = false;
      }
    },
  },
});
