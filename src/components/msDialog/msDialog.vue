<template>
  <div class="ms-dialog">
    <div class="ms-dialog-model"></div>
    <div class="ms-dialog-main">
      <div class="ms-dialog-header">
        <div class="ms-header-title">Thêm mới cửa hàng</div>
        <div class="ms-icon-close"></div>
      </div>

      <div class="ms-dialog-body">
        <div class="ms-row">
          <div class="ms-row-text">
            Mã cửa hàng <span class="ms-field-requied">(*)</span>
          </div>
          <div class="ms-form-text">
              <input type="text" class="ms-field-input" />
          </div>
        </div>

        <div class="ms-row">
          <div class="ms-row-text">
            Tên cửa hàng <span class="ms-field-requied">(*)</span>
          </div>
          <div class="ms-form-text">
               <input type="text" class="ms-field-input" />
          </div>
        </div>

        <div class="ms-row-large">
          <div class="ms-row-text">
            Địa chỉ<span class="ms-field-requied">(*)</span>
          </div>
          <div class="ms-form-text">
               <input type="text" class="ms-field-input" />
          </div>
        </div>

        <div class="ms-row ms-row-2-col">
          <div class="ms-col">
            <div class="ms-row-text">Số điện thoại</div>
            <div class="ms-form-text"></div>
          </div>
          <div class="ms-col">
            <div class="ms-row-text">Mã số thuế</div>
            <div class="ms-form-text"></div>
          </div>
        </div>

        <div class="ms-row">
          <div class="ms-row-text">Quốc gia</div>
          <div class="ms-form-text"></div>
        </div>

        <div class="ms-row ms-row-2-col">
          <div class="ms-col">
            <div class="ms-row-text">Tỉnh/Thành phố</div>
            <div class="ms-form-text"></div>
          </div>
          <div class="ms-col">
            <div class="ms-row-text">Quận/Huyện</div>
            <div class="ms-form-text"></div>
          </div>
        </div>

        <div class="ms-row ms-row-2-col">
          <div class="ms-col">
            <div class="ms-row-text">Phường/Xã</div>
            <div class="ms-form-text"></div>
          </div>
          <div class="ms-col">
            <div class="ms-row-text">Đường phố</div>
            <div class="ms-form-text"></div>
          </div>
        </div>
      </div>
      <div class="ms-dialog-footer"></div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
@import "../../scss/common.scss";
@import "../../scss/msDialog.scss";
</style>
