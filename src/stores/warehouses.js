import { defineStore } from "pinia";
import { isWarehouseOpen } from "@/utils/booleans";
import api from "@/api/index";

export const useWarehouseStore = defineStore("warehouses", {
    state: () => ({
       warehouses: [],
       warehouse: {},
       error: null,
       loading: false,
    }),
    actions: {
        async fetchWarehouses(filteredOptions = {}) {
            this.loading = true;
            try {
                const response = await api.get("warehouses/", { params: filteredOptions });
                this.warehouses = response.data.map((warehouse) => ({
                    ...warehouse,
                    isOpen: isWarehouseOpen(warehouse.work_hours_start, warehouse.work_hours_end),
                }));
                return this.warehouses
            } catch (error) {
                console.log('GET warehouses: ', error);
                this.error = error;
                throw error
            } finally {
                this.loading = false;
            }
        },
        async fetchWarehouse(id) {
            this.loading = true;
            try {
                const response = await api.get(`warehouses/${id}/`);
                this.warehouse = response.data;
                return response.data
            } catch (error) {
                console.log('GET warehouse: ', error);
                this.error = error;
                throw error
            } finally {
                this.loading = false;
            }
        },
    },
});