import { defineStore } from "pinia";
import api from "@/api/index";

export const useCalculatorStore = defineStore("calculator", {
    state: () => ({
       error: null,
       loading: false,
    }),
    actions: {
        async calculate(data) {
            this.loading = true;
            try {
                const response = await api.post("calculator/", data);
                return response.data;
            } catch (error) {
                console.log('POST calculator: ', error);
                this.error = error;
                throw error
            } finally {
                this.loading = false;
            }
        },
    },
});