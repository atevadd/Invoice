<script setup>
import AppStatus from "./AppStatus.vue";

const props = defineProps({
  id: Number,
  code: String,
  date: String,
  client: String,
  amount: Number,
  status: String,
});

const baseUrl = "/invoice/";
</script>

<template>
  <RouterLink
    :to="{ name: 'invoice', params: { id: id } }"
    class="invoice-item">
    <span class="invoice-code">{{ code }}</span>
    <span class="invoice-date">Due {{ date }}</span>
    <span class="invoice-client">{{ client }}</span>
    <span class="invoice-amount">${{ amount }}</span>
    <AppStatus :status="status" />
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
  margin-bottom: 20px;
  transition: border 0.3s ease;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-card-bg);
}

.invoice-code {
  color: var(--color-text);
}
.invoice-amount {
  color: var(--color-text);
}

.invoice-item:hover {
  border: 1px solid var(--in-brand-color);
}

.invoice-date,
.invoice-client {
  color: var(--in-brand-color-accent);
  font-size: 0.9rem;
}

.invoice-arrow {
  color: var(--in-brand-color);
  font-weight: 800;
}
</style>
