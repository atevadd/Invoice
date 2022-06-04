<template>
  <nav class="sidebar">
    <AppIcon />

    <div class="bottom-nav-items">
      <div class="theme-changer">
        <i class="ri-moon-fill"></i>
      </div>
      <hr />
      <img
        src="@/assets/images/user-img.png
      "
        alt="user profile picture"
        class="user-icon" />
    </div>
  </nav>
</template>

<script setup>
import AppIcon from "@/components/AppIcon.vue";
</script>

<style scoped>
.sidebar {
  width: 100%;
  background-color: var(--color-sidebar);
  position: relative;
  border-radius: 0 20px 20px 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.bottom-nav-items {
  margin-top: auto;
}

.bottom-nav-items hr {
  width: 100%;
  display: block;
  margin: 20px 0;
  background-color: #494e6e;
  border: none;
  height: 2px;
}

.bottom-nav-items .theme-changer {
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bottom-nav-items .theme-changer i {
  font-size: 1.4rem;
  color: var(--in-brand-color-accent);
}

.bottom-nav-items img {
  display: block;
  width: 40px;
  height: 40px;
  margin-inline: auto;
  margin-bottom: 20px;
}
</style>
