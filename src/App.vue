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
}
.container {
  width: 65%;
  margin-inline: auto;
  margin-top: 3%;
}
</style>
