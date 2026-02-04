import { defineStore } from "pinia";
import { useToastStore } from "@/stores/toast";
import api from "@/api/index";

export const useOrderRequestStore = defineStore("order_requests", {
  state: () => ({
    order_requests: [],
    order_request: {},
    error: null,
    loading: false,
  }),
  actions: {
    async fetchOrderRequests(filteredOptions = {}) {
      this.loading = true;
      try {
        const response = await api.get("order-requests/", {
          params: filteredOptions,
        });
        this.order_requests = response.data.results;
        return response.data.results;
      } catch (error) {
        console.log("GET order requests: ", error);
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async fetchOrderRequest(id) {
      this.loading = true;
      try {
        const response = await api.get(`order-requests/${id}/`);
        this.order_request = response.data;
        return response.data;
      } catch (error) {
        console.log("GET order request: ", error);
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    // POST
    async createOrderRequest(data) {
      const toast = useToastStore();
      this.loading = true;
      try {
        const response = await api.post("order-requests/", data);
        this.order_requests.push(response.data);

        toast.show({
          type: "success",
          title: "Üstünlikli",
          message: "Sargyt islegi üstünlikli ugradyldy.",
        });

        return response.data;
      } catch (error) {
        console.log("POST order request: ", error);
        toast.show({
          type: "error",
          title: "Ýalňyşlyk",
          message: "Sargyt islegini ugratmakda näsazlyk ýüze çykdy.",
        });
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
        const response = await api.patch(`order-requests/${id}/`, data);
        this.order_requests = this.order_requests.map((order) =>
          order.id === id ? response.data : order,
        );

        toast.show({
          type: "success",
          title: "Üstünlikli",
          message: "Sargyt islegi üstünlikli üýtgedildi.",
        });

        return response.data;
      } catch (error) {
        console.log("PATCH order request: ", error);
        toast.show({
          type: "error",
          title: "Ýalňyşlyk",
          message: "Sargyt islegini üýtgetmekde näsazlyk ýüze çykdy.",
        });
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    // DELETE
    async deleteOrderRequest(id) {
      const toast = useToastStore();
      this.loading = true;
      try {
        const response = await api.delete(`order-requests/${id}/`);
        this.order_requests = this.order_requests.filter(
          (order) => order.id !== id,
        );

        toast.show({
          type: "success",
          title: "Üstünlikli",
          message: "Sargyt islegi üstünlikli pozuldy.",
        });

        return response.data;
      } catch (error) {
        console.log("DELETE order request: ", error);
        toast.show({
          type: "error",
          title: "Ýalňyşlyk",
          message: "Sargyt islegini pozmakda näsazlyk ýüze çykdy.",
        });
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
