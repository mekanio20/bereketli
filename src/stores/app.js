import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    activeModal: "", // 'login' | 'register' | 'reset' | 'password' | 'otp'
  }),
  actions: {
    setModal(modal) {
      this.activeModal = modal;
    },
    toggleModal(modal) {
      this.activeModal = this.activeModal === modal ? null : modal;
    },
    closeModal() {
      this.activeModal = null;
      localStorage.removeItem("register_data");
      localStorage.removeItem("reset_data");
    },
  },
});