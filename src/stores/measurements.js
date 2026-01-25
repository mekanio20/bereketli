import { defineStore } from "pinia";
import api from "@/api/index";

export const useMeasurementStore = defineStore("measurements", {
  state: () => ({
    measurements: [],
    measurement: {},
    error: null,
    loading: false,
  }),
  actions: {
    async fetchMeasurements() {
      this.loading = true;
      try {
        const response = await api.get("measurements/");
        this.measurements = response.data;
        return response.data;
      } catch (error) {
        console.log('GET measurements: ', error);
        this.error = error;
        throw error
      } finally {
        this.loading = false;
      }
    },
    // DETAILS
    async fetchMeasurement(id) {
      this.loading = true;
      try {
        const response = await api.get(`measurements/${id}/`);
        this.measurement = response.data;
        return response.data;
      } catch (error) {
        console.log('GET measurement: ', error);
        this.error = error;
        throw error
      } finally {
        this.loading = false;
      }
    },
  },
});