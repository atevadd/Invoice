<script setup>
import AppSidebar from "./components/AppSidebar.vue";
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

<style>
@import "@/assets/base.css";

#page {
  display: grid;
  grid-template-columns: 7% 93%;
  align-items: flex-start;
}
main {
  position: relative;
  /* border: 2px solid red; */
}
.container {
  width: 65%;
  margin-inline: auto;
  margin-top: 3%;
}
</style>
