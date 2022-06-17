<template>
  <div class="icon">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="37.708"
      viewBox="0 0 40 37.708">
      <path
        id="Combined_Shape"
        d="M20,37.708A20,20,0,0,1,10.694,0L20,18.707,29.305,0A20,20,0,0,1,20,37.708Z"
        transform="translate(0 0)"
        fill="#fff" />
    </svg>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
.icon {
  align-self: center;
  background-color: var(--in-brand-color);
  width: 100%;
  height: 100px;
  border-radius: 0 20px 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  @include mobile {
    width: 80px;
    height: 80px;
  }
}
</style>
