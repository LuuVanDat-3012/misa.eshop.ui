<template>
  <div class="ms-toolbar">
    <div class="ms-btn-insert ms-btn-common">
      <div class="btn-insert-icon ms-icon"></div>
      <div class="btn-insert-text text-common">Thêm mới</div>
    </div>
    <div class="ms-btn-duplication ms-btn-common">
      <div class="btn-duplication-icon  ms-icon"></div>
      <div class="btn-duplication-text text-common">Nhân bản</div>
    </div>
    <div class="ms-btn-edit ms-btn-common">
      <div class="btn-edit-icon  ms-icon"></div>
      <div class="btn-edit-text text-common">Sửa</div>
    </div>
    <div class="ms-btn-delete ms-btn-common">
      <div class="btn-delete-icon  ms-icon"></div>
      <div class="btn-delete-text text-common">Xoá</div>
    </div>
    <div class="ms-btn-reload ms-btn-common specia-border">
      <div class="btn-reload-icon  ms-icon"></div>
      <div class="btn-reload-text text-common">Nạp</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'msToolBar'
}
</script>
<style lang="scss">
@import "../../scss/common.scss";
@import "../../scss/msToolBar.scss";
</style>
