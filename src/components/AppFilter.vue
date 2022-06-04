<template>
  <div class="filter">
    <label for="dropdown" id="toggle-dropdown">
      <input type="checkbox" id="dropdown" hidden ref="toggle" />
      <label for="dropdown" class="dropdown-text"
        >Filter by status <i class="ri-arrow-down-s-line"></i
      ></label>
    </label>
    <div class="filter-dropdown" ref="dropdown">
      <div class="dropdown-item">
        <input type="checkbox" id="status" />
        <label for="status">status</label>
      </div>
      <div class="dropdown-item">
        <input type="checkbox" id="pending" />
        <label for="pending">pending</label>
      </div>
      <div class="dropdown-item">
        <input type="checkbox" id="paid" />
        <label for="paid">paid</label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

const toggleDropdown = () => {
  const toggle = document.querySelector("#dropdown");
  const dropdown = document.querySelector(".filter-dropdown");

  if (toggle.checked) {
    dropdown.classList.add("active");
  } else {
    dropdown.classList.remove("active");
  }
};

onMounted(() => {
  document.querySelector("#toggle-dropdown").addEventListener("click", () => {
    toggleDropdown();
  });
});
</script>

<style lang="scss" scoped>
.heading-actions .filter {
  position: relative;
  margin-right: 20px;
}

.heading-actions .filter #toggle-dropdown #dropdown:checked + label {
  color: var(--in-brand-color);
}

.dropdown-text {
  display: flex;
  align-items: center;
}
.dropdown-text i {
  display: inline-block;
  margin-left: 10px;
}
.filter-dropdown {
  display: none;
  position: absolute;
  top: 40px;
  background-color: var(--in-light-bg);
  border-radius: 5px;
  box-shadow: 0 3px 13px rgba(0, 0, 0, 0.2);
  padding: 10px 40px 10px 20px;
  z-index: 100;
}

.filter-dropdown.active {
  display: block;
  animation: slideup 0.3s ease;
}
.dropdown-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 5px;
}

.dropdown-item input {
  margin-right: 15px;
  margin-top: 4px;
  vertical-align: middle;
}
.dropdown-item label {
  text-transform: capitalize;
  vertical-align: middle;
  line-height: 1.5;
}

@keyframes slideup {
  0% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
