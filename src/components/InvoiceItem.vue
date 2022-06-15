<script setup>
import AppStatus from "./AppStatus.vue";

const props = defineProps({
  id: Number,
  code: String,
  date: String,
  client: String,
  amount: String,
  status: String,
});

const baseUrl = "/invoice/";
</script>

<template>
  <RouterLink
    :to="{ name: 'invoice', params: { id: id } }"
    class="invoice-item">
    <span class="invoice-code">{{ code }}{{ id }}</span>
    <span class="invoice-date">Due {{ date }}</span>
    <span class="invoice-client">{{ client }}</span>
    <span class="invoice-amount">${{ amount }}</span>
    <AppStatus status="paid" id="status" />
    <span class="invoice-arrow"><i class="ri-arrow-right-s-line"></i></span>
  </RouterLink>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

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

  @include mobile {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    // grid-template-rows: repeat(3, 1fr);
    // row-gap: 20px;
  }
}

.invoice-code {
  color: var(--color-text);

  @include mobile {
    grid-column: 1 / 2;
  }
}
.invoice-amount {
  color: var(--color-text);

  @include mobile {
    grid-column: 1 / span 2;
    grid-row: 3 / 3;
  }
}

.invoice-item:hover {
  border: 1px solid var(--in-brand-color);
}

.invoice-date {
  @include mobile {
    grid-column: 1 / span 2;
    grid-row: 2 / 3;
    margin-top: 25px;
  }
}

.invoice-date,
.invoice-client {
  color: var(--in-brand-color-accent);
  font-size: 0.9rem;
}

.invoice-client {
  @include mobile {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    // border: 1px solid red;
    justify-self: right;
  }
}
#status {
  @include mobile {
    grid-column: 2 / span 1;
    grid-row: 2 / 4;
    justify-self: right;
    align-self: center;
    // border: 1px solid red;
  }
}
.invoice-arrow {
  color: var(--in-brand-color);
  font-weight: 800;

  @include mobile {
    display: none;
  }
}
</style>
