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

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
.sidebar {
  width: 100%;
  background-color: var(--color-sidebar);
  position: sticky;
  top: 0;
  border-radius: 0 20px 20px 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  z-index: 99;

  @include mobile {
    position: relative;
    min-height: 100%;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 0px;
    align-items: center;
  }
}

.bottom-nav-items {
  position: relative;
  margin-top: auto;

  @include mobile {
    display: flex;
    align-items: center;
    // border: 1px solid red;
    margin: 0;
    align-self: stretch;

    &::before {
      content: "";
      position: absolute;
      left: 45%;
      transform: translateX(-50%);
      top: 0;
      width: 2px;
      height: 100%;
      background-color: #494e6e;
    }
  }
}

.bottom-nav-items hr {
  width: 100%;
  display: block;
  margin: 20px 0;
  background-color: #494e6e;
  border: none;
  height: 2px;

  @include mobile {
    display: none;
    transform: rotateZ(90deg);
  }
}

.bottom-nav-items .theme-changer {
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;

  @include mobile {
    margin: 0;
    margin-inline: 30px;
  }
}

.bottom-nav-items .theme-changer i {
  font-size: 1.4rem;
  color: var(--in-brand-color-accent);
}

.bottom-nav-items img {
  position: relative;
  display: block;
  width: 40px;
  height: 40px;
  margin-inline: auto;
  margin-bottom: 20px;

  @include mobile {
    margin: 0;
    margin-inline: 30px;
  }
}
</style>
