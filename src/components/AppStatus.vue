<template>
  <span v-if="status == 'paid'" class="invoice-status-paid">paid</span>
  <span v-else-if="status == 'pending'" class="invoice-status-pending"
    >Pending</span
  >
  <span v-else class="invoice-status-draft">Draft</span>
</template>

<script setup>
const props = defineProps({
  status: String,
});
</script>

<style lang="scss" scoped>
.invoice-status-paid {
  display: inline-block;
  position: relative;
  padding: 8px 35px;
  border-radius: 5px;
  text-transform: capitalize;
  line-height: 1.6;
  font-size: 0.9rem;
  background-color: rgba($color: #33d69f, $alpha: 0.06);
  color: #33d69f;

  &::before {
    content: "";
    position: absolute;
    top: 48%;
    left: 18px;
    width: 8px;
    height: 8px;
    background-color: #33d69f;
    border-radius: 50%;
    transform: translateY(-50%);
  }
}
.invoice-status-pending {
  display: inline-block;
  position: relative;
  padding: 8px 35px;
  border-radius: 5px;
  text-transform: capitalize;
  line-height: 1.6;
  font-size: 0.9rem;
  background-color: rgba($color: #ff8f00, $alpha: 0.06);
  color: #ff8f00;

  &::before {
    content: "";
    position: absolute;
    top: 48%;
    left: 18px;
    width: 8px;
    height: 8px;
    background-color: #ff8f00;
    border-radius: 50%;
    transform: translateY(-50%);
  }
}
.invoice-status-draft {
  display: inline-block;
  position: relative;
  padding: 8px 35px;
  border-radius: 5px;
  text-transform: capitalize;
  line-height: 1.6;
  font-size: 0.9rem;
  background-color: rgba($color: #373b53, $alpha: 0.06);
  color: #373b53;

  //   @media (prefers-color-scheme: dark) {
  //     color: #fff;
  //     background: rgba($color: #fff, $alpha: 0.05);
  //   }
  @media (prefers-color-scheme: light) {
    background-color: rgba($color: #373b53, $alpha: 0.06);
    color: #373b53;
  }

  &::before {
    content: "";
    position: absolute;
    top: 48%;
    left: 18px;
    width: 8px;
    height: 8px;
    background-color: #373b53;
    border-radius: 50%;
    transform: translateY(-50%);

    // @media (prefers-color-scheme: dark) {
    //   background-color: #fff;
    // }
    @media (prefers-color-scheme: light) {
      background-color: #373b53;
    }
  }
}
</style>
