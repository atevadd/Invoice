<template>
  <div class="filter">
    <label for="dropdown" id="toggle-dropdown">
      <input type="checkbox" id="dropdown" hidden ref="toggle" />
      <label for="dropdown" class="dropdown-text"
        ><span>Filter</span> <span class="hide"> by status</span>
        <i class="ri-arrow-down-s-line"></i
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
@import "@/assets/scss/_mixins.scss";

.filter {
  position: relative;
  margin-right: 20px;
  cursor: pointer;
}
#toggle-dropdown {
  cursor: pointer;
}
.heading-actions .filter #toggle-dropdown #dropdown:checked + label {
  color: var(--in-brand-color);
  cursor: pointer;
}

.dropdown-text {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  .hide {
    @include mobile {
      display: none;
    }
    @include desktop {
      margin-left: 5px;
    }
  }
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
  z-index: 90;
}

.filter-dropdown.active {
  display: block;
  animation: slideup 0.3s ease;
}
.dropdown-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 5px;

  input[type="checkbox"] {
    /* Add if not using autoprefixer */
    -webkit-appearance: none;
    appearance: none;
    /* For iOS < 15 to remove gradient background */
    background-color: #fff;
    width: 14px;
    height: 14px;
    display: grid;
    place-content: center;
    border: 1px solid var(--in-brand-color);
    border-radius: 0.15em;
    position: relative;
    padding: 5px;
  }

  input[type="checkbox"]::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    transform: scale(0);
    transition: 100ms transform ease-in-out;
    box-shadow: inset 1em 1em var(--in-brand-color);
    transform-origin: center;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  }

  input[type="checkbox"]:checked {
    background-color: var(--in-brand-color);
  }
  input[type="checkbox"]:checked::before {
    transform: scale(1);
    box-shadow: inset 1em 1em #fff;
  }

  & > input:checked + label {
    color: var(--in-brand-color);
  }
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
  cursor: pointer;
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
