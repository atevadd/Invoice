<template>
  <div class="input-box">
    <label :for="id">{{ labelName }}</label>
    <input
      :type="type"
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)" />
  </div>
</template>

<script setup>
const props = defineProps({
  id: String,
  type: String,
  labelName: String,
  modelValue: String,
});

defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped>
.input-box {
  width: 100%;
  position: relative;

  input {
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
