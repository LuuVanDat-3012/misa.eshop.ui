<template>
    <div class="popup-container">
        <div class="popup-model"></div>
        <div class="popup">
            <div class="popup-title">
                <div class="content-title">Xoá dữ liệu</div>
                <div class="btn-close" @click="ClosePopup"></div>
            </div>

            <div class="popop-content">
                <div class="content-icon"></div>
                <div class="content-text">Bạn có chắc muốn xoá <b>C-0123</b> khỏi danh sách cửa hàng?</div>
            </div>

            <div class="popup-button">
                <div class="btn-cancel-popup " @click="closePopup">
                   <div class="btn-cancel-popup-icon"></div>
                   <div class="btn-cancel-popup-text">Hủy bỏ</div>
                </div>
                <div class="btn-confirm" @click="deleteStore">
                     <div class="btn-confirm-icon"></div>
                   <div class="btn-confirm-text">Xóa</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'msPopupDelete',
  setup () {

  }
}
</script>
<style lang="scss">
@import "../../scss/common.scss";
@import "../../scss/msPopupDelete.scss";
</style>
