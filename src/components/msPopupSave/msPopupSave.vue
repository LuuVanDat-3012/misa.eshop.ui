<template>
  <div class="ms-popup-save">
    <div class="popup-model"></div>
    <div class="popup">
      <div class="popup-title">
        <div class="content-title">Dữ liệu chưa được lưu</div>
        <div class="btn-close" @click="ClosePopup"></div>
      </div>

      <div class="popop-content">
        <div class="content-icon"></div>
        <div class="content-text">
          Dữ liệu đã thay đổi, bạn có muốn lưu không?
        </div>
      </div>

      <div class="popup-button">
        <div class="ms-btn-save ms-footer-btn-common">
          <div class="ms-icon-common ms-btn-save-icon"></div>
          <div class="ms-btn-save-text">Lưu</div>
        </div>
        <div class="ms-btn-dont-save">
          <div class="ms-icon-common ms-btn-dont-save-icon"></div>
          <div class="ms-btn-dont-save-text">Không lưu</div>
        </div>
        <div class="ms-btn-cancel ms-footer-btn-common">
          <div class="ms-btn-cancel-icon ms-icon-common"></div>
          <div class="ms-btn-cancel-text">Hủy bỏ</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'msPopupSave',
  setup () {}
}
</script>
<style lang="scss">
@import "../../scss/common.scss";
@import "../../scss/msPopupSave.scss";
</style>
