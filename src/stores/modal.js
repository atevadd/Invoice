import { defineStore } from "pinia";

export const useModalStore = defineStore({
  id: "modal",

  state: () => ({
    isModalActive: false,
    isDeleteModalActive: false,
  }),
  actions: {
    openModal() {
      this.isModalActive = true;
    },
    closeModal() {
      this.isModalActive = false;
    },
    openDeleteModal() {
      this.isDeleteModalActive = true;
    },
    closeDeleteModal() {
      this.isDeleteModalActive = false;
    },
  },
});
