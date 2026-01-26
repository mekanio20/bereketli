import { defineStore } from "pinia";
import api from "@/api/index";

export const useBannerStore = defineStore("banners", {
    state: () => ({
       banners: [],
       error: null,
       loading: false,
    }),
    actions: {
        async fetchBanners(filteredOptions = {}) {
            this.loading = true;
            try {
                const response = await api.get("banners/", { params: filteredOptions });
                this.banners = response.data;
                return response.data;
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