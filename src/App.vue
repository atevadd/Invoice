<script setup>
import { dbInitialisation } from "@/database/db.js";
import { onMounted } from "vue";
import AppSidebar from "@/components/AppSidebar.vue";
import { useInvoiceStore } from "./stores/invoice";

const invoiceStore = useInvoiceStore();

// Setup database when page is initialized
onMounted(() => {
  dbInitialisation();
  invoiceStore.fetchInvoiceFromDatabase();
});
</script>

<template>
  <section id="page">
    <AppSidebar />
    <main>
      <div class="container">
        <RouterView />
      </div>
    </main>
  </section>
</template>

<style lang="scss">
@import "@/assets/scss/_mixins.scss";
@import "@/assets/base.css";

#page {
  display: grid;
  grid-template-columns: 7% 93%;
  align-items: flex-start;

  @include mobile {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}
main {
  position: relative;

  @include mobile {
    width: 100%;
  }
}
.container {
  width: 65%;
  margin-inline: auto;
  margin-top: 3%;

  @include mobile {
    width: 90%;
    margin-top: 5%;
  }
}
</style>
