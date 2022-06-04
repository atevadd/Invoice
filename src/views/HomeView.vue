<script setup>
import AppButton from "../components/AppButton.vue";
import InvoiceItem from "@/components/InvoiceItem.vue";
import AppFilter from "@/components/AppFilter.vue";

const allInvoice = true;
</script>

<template>
  <header>
    <div class="heading-text">
      <h1 class="heading">Invoice</h1>
      <p class="subheading">There are a total of 7 invoices</p>
    </div>
    <div class="heading-actions">
      <AppFilter />
      <AppButton
        ><i class="ri-add-line"></i> <span>New Invoice</span></AppButton
      >
    </div>
  </header>
  <!-- The invoice listing here -->
  <section class="invoice-list" v-if="allInvoice">
    <InvoiceItem
      v-for="item in 5"
      :key="item"
      code="#RT300"
      date="20 Dec 2021"
      client="John doe"
      :amount="2000"
      status="paid" />
  </section>
  <section class="empty" v-else>
    <img src="@/assets/images/empty.png" alt="" />
    <h1>There is nothing here</h1>
    <p>
      Create an invoice by clicking the <br />
      New Invoice button and get started
    </p>
  </section>
</template>

<style lang="scss" scoped>
header {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
}

.heading-text h1 {
  line-height: 1;
  font-size: 2.1rem;
  font-weight: 500;
}
.heading-text p {
  font-size: 0.9rem;
  color: var(--in-brand-color-accent);
}

.heading-actions {
  position: relative;
  display: flex;
  align-items: center;
}

.invoice-list {
  width: 100%;
  position: relative;
}

.empty {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 150px;

  h1 {
    font-weight: 400;
    font-size: 1.9rem;
    margin-bottom: 10px;
  }
  p {
    color: var(--in-brand-color-accent);
    text-align: center;
  }
}
</style>
