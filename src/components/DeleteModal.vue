<template>
  <div
    class="delete-modal"
    v-show="modalStore.isDeleteModalActive"
    @click.self="modalStore.closeDeleteModal">
    <div class="delete-modal-container">
      <h2>Confirm deletion</h2>
      <p>
        Are you sure you want to delete invoice #XM9141? This action cannot be
        undone.
      </p>
      <div class="modal-btns">
        <AppButton class="edit" @click="modalStore.closeDeleteModal"
          >Cancel</AppButton
        >
        <AppButton class="delete">Delete</AppButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppButton from "./AppButton.vue";
import { useModalStore } from "../stores/modal";

const modalStore = useModalStore();
</script>

<style lang="scss" scoped>
.delete-modal {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba($color: #000000, $alpha: 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;

  &-container {
    background-color: #fff;
    border-radius: 5px;
    padding: 35px;
    width: 35%;
    animation: scale 0.4s ease;

    h2 {
      font-weight: 400;
      text-transform: capitalize;
      margin-bottom: 10px;
    }
    p {
      font-size: 0.85rem;
    }

    .modal-btns {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-top: 25px;
    }
  }
}

@keyframes scale {
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
