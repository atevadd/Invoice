<script setup>
const props = defineProps({
  code: String,
  date: String,
  client: String,
  amount: Number,
  status: String,
});
</script>

<template>
  <RouterLink to="/" class="invoice-item">
    <span class="invoice-code">{{ code }}</span>
    <span class="invoice-date">Due {{ date }}</span>
    <span class="invoice-client">{{ client }}</span>
    <span class="invoice-amount">${{ amount }}</span>
    <span v-if="status == 'paid'" class="invoice-status-paid">paid</span>
    <span v-else-if="status == 'pending'" class="invoice-status-pending"
      >Pending</span
    >
    <span v-else class="invoice-status-draft">Draft</span>
    <span class="invoice-arrow"><i class="ri-arrow-right-s-line"></i></span>
  </RouterLink>
</template>

<style lang="scss" scoped>
.invoice-item {
  position: relative;
  width: 100%;
  border-radius: 5px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 10px 10px rgba(71, 83, 158, 0.1);
  margin-bottom: 30px;
  transition: border 0.3s ease;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.invoice-item:hover {
  border: 1px solid var(--in-brand-color);
}

.invoice-date,
.invoice-client {
  color: var(--in-brand-color-accent);
  font-size: 0.9rem;
}

.invoice-status-paid {
  display: inline-block;
  position: relative;
  padding: 8px 35px;
  border-radius: 5px;
  text-transform: capitalize;
  line-height: 1.6;
  font-size: 0.9rem;
  background-color: rgba($color: #33d69f, $alpha: 0.06);

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
  }
}

// .invoice-status-paid::before {
//   content: "";
//   position: absolute;
//   top: 48%;
//   left: 18px;
//   width: 8px;
//   height: 8px;
//   background-color: var(--in-status-green);
//   border-radius: 50%;
//   transform: translateY(-50%);
// }
.invoice-arrow {
  color: var(--in-brand-color);
  font-weight: 800;
}
</style>
