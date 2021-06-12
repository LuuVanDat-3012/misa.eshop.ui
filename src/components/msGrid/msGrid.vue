<template>
  <div class="ms-grid">
    <div class="ms-grid-header">
      <div class="ms-grid-store-code">
          <div class="ms-grid-title"></div>
          <div class="ms-filter-store-code">
              <div class="ms-filter-option"></div>
              <div class="ms-filter-box"></div>
          </div>
      </div>
      <div class="ms-grid-store-name"></div>
      <div class="ms-grid-store-address"></div>
      <div class="ms-grid-store-status"></div>
    </div>
    <div class="ms-grid-content"></div>
  </div>
</template>
<script>
export default {
  name: 'msGrid'
}
</script>
<style lang="scss">
@import "../../scss/common.scss";
@import "../../scss/msGrid.scss";
</style>
