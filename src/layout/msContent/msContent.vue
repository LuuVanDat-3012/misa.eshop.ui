<template>
    <div class="ms-content">
        <ms-tool-bar  @openDialog='openDialog'/>
        <ms-grid />
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
    // Hàm hiển thị dialog thêm mới
    openDialog () {
      this.isActiveDialog = true
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/common.scss';
@import '../../scss/msContent.scss'
</style>
