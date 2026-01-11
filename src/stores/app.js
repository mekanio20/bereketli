import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    activeModal: "otp", // 'login' | 'register' | 'reset' | 'otp'
  }),
  actions: {
    toggleModal(modal) {
      this.activeModal = this.activeModal === modal ? null : modal;
    },
    closeModal() {
      this.activeModal = null;
    },
  },
});