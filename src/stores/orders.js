import { defineStore } from "pinia";
import api from "@/api/index";
import { useToastStore } from "@/stores/toast";
import i18n from "@/i18n/index";
const { t } = i18n.global

export const useOrderStore = defineStore("orders", {
  state: () => ({
    orders: [],
    order: {},
    error: null,
    loading: false,
  }),
  actions: {
    async fetchOrders(filteredOptions = {}) {
      this.loading = true;
      try {
        const response = await api.get("orders/", { params: filteredOptions });
        this.orders = response.data.results;
        return response.data.results;
      } catch (error) {
        console.log("GET orders: ", error);
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async fetchOrder(id) {
      this.loading = true;
      try {
        const response = await api.get(`orders/${id}/`);
        this.order = response.data;
        return response.data;
      } catch (error) {
        console.log("GET order: ", error);
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    // PATCH
    async updateOrder(id, data) {
      const toast = useToastStore();
      this.loading = true;
      try {
        const response = await api.patch(`orders/${id}/`, data);
        this.orders = this.orders.map((order) =>
          order.id === id ? response.data : order,
        );

        toast.show({
          type: "success",
          title: t('success.name'),
          message: t('success.order'),
        });

        return response.data;
      } catch (error) {
        console.log("PATCH order: ", error);
        toast.show({
          type: "error",
          title: t('errors.name'),
          message: t('errors.order'),
        });
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
