import { defineStore } from "pinia";
import api from "@/api/index";

export const useContactStore = defineStore("contact", {
    state: () => ({
       contact: {},
       error: null,
       loading: false,
    }),
    actions: {
        async fetchContact() {
            this.loading = true;
            try {
                const response = await api.get("contact-info/");
                this.contact = response.data;
                return response.data;
            } catch (error) {
                console.log('GET contact: ', error);
                this.error = error;
                throw error
            } finally {
                this.loading = false;
            }
        },
    },
});