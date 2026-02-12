import { defineStore } from "pinia";
import api from "@/api/index";

export const useRoomStore = defineStore("rooms", {
  state: () => ({
    rooms: [],
    loading: false,
    error: null,
  }),
  actions: {
    async getRooms() {
      this.loading = true;
      try {
        const response = await api.get("rooms/");
        this.rooms = response.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    }
  },
});
