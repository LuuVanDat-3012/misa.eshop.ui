<template>
  <div class="ms-content">
    <ms-tool-bar
      @openDialog="openDialog"
      @deleteStore="deleteStore"
      @loadStore="loadStore"
      @editStore="editStore"
    />
    <ms-grid ref="grid" @editStore='editStore' @getStoreSelected='getStoreSelected'/>
    <ms-dialog
      v-show="isActiveDialog"
      @closeDialog="closeDialog"
      ref="dialog"
      :editMode="editMode"
      @displayPopupError="displayPopupError"
    />
    <ms-popup-save v-show="isActivePopupSave" />
    <ms-popup-delete
      v-show="isActivePopupDelete"
      ref="popupDelete"
      @loadStore="loadStore"
      @closePopupDelete="isActivePopupDelete = !isActivePopupDelete"
    />
    <ms-popup-error v-show="isActivePopupError" @closePopupError="closePopupError"/>
  </div>
</template>
<script>
export default {
  name: 'msContent',
  data () {
    return {
      isActiveDialog: false, // Biến hiển thị dialog
      isActivePopupDelete: false, // Biến hiển thị popup delete
      isActivePopupSave: false, // Biến hiển thị popup save
      isActivePopupError: false, // Biến hiển thị popup error
      editMode: 0,
      storeSelected: ''
    }
  },
  methods: {
    /**
     * Hàm hiển thị dialog và gọi hàm load Country của dialog
     * CreatedBy: LVDat (16/06/2021)
     */
    openDialog () {
      this.isActiveDialog = true
      this.editMode = 1
      this.$refs.grid.storeSelected = this.$refs.dialog.store
      this.$refs.dialog.loadCountry()
      this.$refs.dialog.focusInput()
    },
    closeDialog (store) {
      this.isActiveDialog = false
      this.$refs.grid.storeSelected = store
      this.$refs.grid.listStore.forEach(element => {
        if (element.storeId === store.storeId) {
          element = store
        }
      })
    },
    /**
     * Hàm gửi yêu cầu load lại dữ liệu
     * CreatedBy: LVDat (16/06/2021)
     */
    loadStore () {
      this.$refs.grid.loadStoreDefault()
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
      this.editMode = 2
      this.$refs.dialog.editStore(this.storeSelected)
    },
    /**
     * Hàm lấy thông tin store khi nhấn click trên grid
     */
    getStoreSelected (store) {
      this.storeSelected = store
    },
    /**
     * Hàm hiện thị popup error khi trùng mã
     */
    displayPopupError () {
      this.isActivePopupError = true
    },
    closePopupError () {
      this.isActivePopupError = false
      this.$refs.dialog.focusInput()
    }
  }
}
</script>

<style lang="scss">
@import "../../scss/common.scss";
@import "../../scss/msContent.scss";
</style>
