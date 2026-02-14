import { defineStore } from "pinia";
import { useToastStore } from "@/stores/toast";
import api from "@/api/index";

export const useNotificationStore = defineStore("notifications", {
  state: () => ({
    notifications: [],
    notification: {},
    error: null,
    loading: false,
  }),
  getters: {
    unreadNotifications: (state) => state.notifications.filter((notification) => !notification.is_read)?.length,
  },
  actions: {
    async fetchNotifications(filteredOptions = {}) {
      this.loading = true;
      try {
        const response = await api.get("notifications/", {
          params: filteredOptions,
        });
        this.notifications = response.data.results;
        return response.data.results;
      } catch (error) {
        console.log("GET notifications: ", error);
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async fetchNotification(id) {
      this.loading = true;
      try {
        const response = await api.get(`notifications/${id}/`);
        this.notification = response.data;
        return response.data;
      } catch (error) {
        console.log("GET notification: ", error);
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    // PATCH
    async updateNotification(id, data) {
      const toast = useToastStore();
      this.loading = true;
      try {
        const response = await api.patch(`notifications/${id}/`, data);
        this.notifications = this.notifications.map((data) =>
          data.id === id ? response.data : data,
        );
        return response.data;
      } catch (error) {
        console.log("PATCH notification: ", error);
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    // READ ALL
    async readAllNotifications() {
      this.loading = true;
      try {
        const response = await api.post("notifications/read-all/");
        return response.data;
      } catch (error) {
        console.log("PATCH notification: ", error);
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
