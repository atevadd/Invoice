<template>
  <!-- back button -->
  <button class="back">
    <i class="ri-arrow-left-s-line"></i><span>Go back</span>
  </button>

  <!-- page header -->
  <header>
    <div class="status">
      <span class="status-text">Status</span>
      <AppStatus status="pending" />
    </div>

    <div class="actions">
      <AppButton class="edit">Edit</AppButton>
      <AppButton class="delete">Delete</AppButton>
      <AppButton class="default">Mark as read</AppButton>
    </div>
  </header>

  <!-- Page content -->
  <section id="content"></section>
</template>

<script setup>
import AppStatus from "../components/AppStatus.vue";
import AppButton from "../components/AppButton.vue";
</script>

<style lang="scss" scoped>
.back {
  background-color: transparent;
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  font-size: 0.89rem;
  cursor: pointer;
  vertical-align: middle;
  line-height: 1.6;

  i {
    display: inline-block;
    margin-right: 10px;
    color: var(--in-brand-color);
    font-weight: 800;
    font-size: 1.5rem;
  }
  span {
    vertical-align: middle;
    line-height: 1;
    // border: 1px solid;
    color: var(--color-text-heading);
  }
}
header {
  margin-top: 10px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-card-bg);
  box-shadow: 0 10px 10px rgba(71, 83, 158, 0.1);
  border-radius: 8px;
  padding: 20px 20px;

  .status {
    &-text {
      display: inline-block;
      margin-inline: 20px;
      color: var(--in-brand-color-accent);
    }
  }

  .actions {
    display: flex;

    .btn {
      margin-right: 10px;
    }
  }
}
</style>
