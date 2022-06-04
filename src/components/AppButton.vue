<template>
  <button class="btn" type="button"><slot></slot></button>
</template>

<script setup>
const props = defineProps({
  name: String,
});
</script>

<style lang="scss">
.btn {
  padding: 10px 20px 10px 10px;
  border-radius: 50px;
  background-color: var(--in-brand-color);
  border: none;
  outline: none;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.89rem;
  transition: 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: var(--in-brand-color-hover);
  }

  &.edit {
    background-color: #f9fafe;
    color: var(--in-brand-color-accent);
    padding-inline: 20px;
  }

  &.delete {
    background-color: var(--in-status-red);
    padding-inline: 20px;
    color: #fff;
  }
  &.default {
    padding-inline: 20px;
  }
}

.btn i {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #fff;
  color: var(--in-brand-color);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  font-weight: 800;
}
</style>
