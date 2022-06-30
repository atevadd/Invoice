<template>
  <div class="input-box">
    <label :for="id">{{ labelName }}</label>
    <select
      :id="id"
      :value="modelValue"
      required
      @change="$emit('update:modelValue', $event.target.value)">
      <option value="" disabled>~ Select a option ~</option>
      <option v-for="(items, index) in listItems" :key="index" :value="items">
        {{ items }}
      </option>
    </select>
  </div>
</template>

<script setup>
const props = defineProps({
  id: String,
  type: String,
  labelName: String,
  listItems: Array,
  modelValue: String,
});

defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped>
.input-box {
  position: relative;
  width: 100%;

  select {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    outline: none;
    border: 1px solid var(--in-brand-color-accent);
    padding-inline: 10px;

    &:focus {
      border: 1px solid var(--in-brand-color);
    }
  }
  label {
    color: var(--in-brand-color-accent);
    font-size: 0.9rem;
    display: block;
  }
}
</style>
