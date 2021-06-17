<template>
  <div class="ms-content">
    <ms-tool-bar
      @openDialog="openDialog"
      @deleteStore="deleteStore"
      @loadStore="loadStore"
      @editStore="editStore"
    />
    <ms-grid ref="grid" />
    <ms-dialog
      v-show="isActiveDialog"
      @closeDialog="isActiveDialog = false"
      ref="dialog"
      @loadStore="loadStore"
    />
    <ms-popup-save v-show="isActivePopupSave" />
    <ms-popup-delete
      v-show="isActivePopupDelete"
      ref="popupDelete"
      @loadStore="loadStore"
      @closePopupDelete="isActivePopupDelete = !isActivePopupDelete"
    />
  </div>
</template>
<script>
export default {
  name: 'msContent',
  data () {
    return {
      isActiveDialog: false, // Biến hiển thị dialog
      isActivePopupDelete: false, // Biến hiển thị popup delete
      isActivePopupSave: false // Biến hiển thị popup delete
    }
  },
  methods: {
    /**
     * Hàm hiển thị dialog và gọi hàm load Country của dialog
     * CreatedBy: LVDat (16/06/2021)
     */
    openDialog () {
      this.isActiveDialog = true
      this.$refs.dialog.loadCountry()
    },
    /**
     * Hàm gửi yêu cầu load lại dữ liệu
     * CreatedBy: LVDat (16/06/2021)
     */
    loadStore () {
      this.$refs.grid.loadStore()
    },
    /**
     * Hàm hiển thị popup xác nhận xoá
     * CreatedBy: LVDat (16/06/2021)
     */
    deleteStore () {
      this.isActivePopupDelete = true
      this.$refs.popupDelete.store = this.$refs.grid.storeSelected
    },
    /**
     * Hàm gửi đi 1 store để hiện thị lên dialog và sửa
     * CreatedBy: LVDat (16/06/2021)
     */
    editStore () {
      this.isActiveDialog = true
      this.$refs.dialog.editStore(this.$refs.grid.storeSelected)
    }
  }
}
</script>

<style lang="scss">
@import "../../scss/common.scss";
@import "../../scss/msContent.scss";
</style>
