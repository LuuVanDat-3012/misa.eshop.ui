<template>
    <div class="ms-content">
        <ms-tool-bar  @openDialog='openDialog' @loadData="loadData" class="custom-ms-toolbar"/>
        <ms-grid ref="grid"/>
        <ms-dialog v-show="isActiveDialog" @closeDialog='isActiveDialog = false' ref="dialog"/>
        <ms-popup-delete v-show="isActivePopupDelete" />
        <ms-popup-save v-show="isActivePopupSave" />
    </div>
</template>
<script>
import msPopupSave from '../../components/msPopupSave/msPopupSave.vue'
export default {
  components: { msPopupSave },
  name: 'msContent',
  data () {
    return {
      isActiveDialog: false, // Biến hiển thị dialog
      isActivePopupDelete: false, // Biến hiển thị popup delete
      isActivePopupSave: false // Biến hiển thị popup delete
    }
  },
  methods:
  {
    /**
     * Hàm hiện thị dialog và load danh sách quốc gia
     * CreatedBy: lVDat (15/06/2021)
     */
    openDialog () {
      this.$refs.dialog.getCountry()
      this.$refs.dialog.focusInput()
      this.isActiveDialog = true
    },
    /**
     * Hàm gọi tới component ms-grid để load lại dữ liệu
     * CreateBy: LVDat (15/06/2021)
     */
    loadData () {
      this.$refs.grid.loadData()
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/common.scss';
@import '../../scss/msContent.scss'
</style>
