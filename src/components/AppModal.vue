<template>
  <div
    class="app-modal"
    id="app-modal"
    v-show="modalStore.isModalActive"
    @click.self="modalStore.closeModal">
    <div class="app-modal-container">
      <header>
        <h1>{{ modalName }}</h1>
      </header>

      <!-- Invoice form -->
      <div class="fields">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from "../stores/modal";

const props = defineProps({
  modalName: String,
});

const modalStore = useModalStore();
</script>

<style lang="scss" scoped>
.app-modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 10000%;
  max-height: 100vh;
  background-color: rgba($color: #000000, $alpha: 0.5);
  z-index: 99;
  //   display: none;

  &-container {
    position: relative;
    width: 40%;
    height: 100%;
    background-color: #fff;
    border-radius: 0 20px 20px 0;
    padding: 30px 35px;
    overflow-y: auto;
    animation: modal 0.6s ease;
    transition: 0.4s ease;

    // Customising the scrollbar for chrome and other webkit browsers
    &::-webkit-scrollbar {
      width: 0.5vw;
      cursor: pointer;
      display: none;
    }

    &::-webkit-scrollbar-track {
      background-color: #fff;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--in-text-dark-2);
      border-radius: 20px;
    }

    header {
      h1 {
        font-weight: 400;
      }
    }
  }
}

@keyframes modal {
  0% {
    transform: translateX(-70%);
  }
  100% {
    transform: translateX(0%);
  }
}
</style>
