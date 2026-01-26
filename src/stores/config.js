import { defineStore } from "pinia";
import api from "@/api/index";

export const useConfigStore = defineStore("config", {
    state: () => ({
       usd_rate: null,
       error: null,
       loading: false,
    }),
    actions: {
        async fetchConfig(usd) {
            this.loading = true;
            try {
                const response = await api.get("configuration/");
                this.usd_rate = response.data.dollar_rate;
                return response.data
            } catch (error) {
                console.log('GET banners: ', error);
                this.error = error;
                throw error
            } finally {
                this.loading = false;
            }
        },
    },
});