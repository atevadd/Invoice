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
}
.container {
  width: 65%;
  margin-inline: auto;
  margin-top: 3%;
}

@media screen and(max-width: 450px) {
  #page {
    display: flex;
    flex-direction: column;
  }
}
</style>
