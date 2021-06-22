<template>
  <div class="ms-dialog">
    <div class="ms-dialog-model"></div>

    <div class="ms-dialog-main" :class="{ msDialogEdit: editMode === 2 }">
      <div class="ms-dialog-header">
        <div class="ms-header-title">{{ editModeTitle }}</div>
        <div class="ms-icon-close" @click="closeDialog"></div>
      </div>

      <div class="ms-dialog-body">
        <div class="ms-row">
          <div class="ms-row-text">
            Mã cửa hàng <span class="ms-field-requied">*</span>
          </div>
          <div
            class="ms-form-text"
            :class="{ error: isWarningCode, zoomOut: isWarningCode }"
          >
            <input
              type="text"
              class="ms-field-input"
              v-model="store.storeCode"
              ref="autofocus"
              @keyup="validateStoreCode"
            />
          </div>
          <div class="ms-error" v-if="isWarningCode">
            <div class="ms-icon-error"></div>
            <span class="ms-error-detail">{{errorStoreCode}}</span>
          </div>
        </div>

        <div class="ms-row">
          <div class="ms-row-text">
            Tên cửa hàng <span class="ms-field-requied">*</span>
          </div>
          <div
            class="ms-form-text"
            :class="{ error: isWarningName, zoomOut: isWarningName }"
          >
            <input
              type="text"
              class="ms-field-input"
              v-model="store.storeName"
              @keyup="validateStoreName"
              ref="inputStoreName"
            />
          </div>
           <div class="ms-error" v-if="isWarningName">
              <div class="ms-icon-error"></div>
              <span class="ms-error-detail">{{errorNull}}</span>
          </div>
        </div>

        <div class="ms-row-large">
          <div class="ms-row-text">
            Địa chỉ <span class="ms-field-requied">*</span>
          </div>
          <div
            class="ms-field-textarea"
            :class="{ error: isWarningAddress, zoomOut: isWarningAddress }"
          >
            <textarea
              name=""
              id="text-arena"
              cols="30"
              rows="10"
              @keyup="validateStoreAddress"
              v-model="store.address"
              ref="inputStoreAddress"
            ></textarea>
          </div>
          <div class="ms-error" v-if="isWarningAddress">
            <div class="ms-icon-error"></div>
            <span class="ms-error-detail">{{errorNull}}</span>
          </div>
        </div>

        <div class="ms-row ms-row-2-col">
          <div class="ms-col">
            <div class="ms-row-text">Số điện thoại</div>
            <div class="ms-form-text">
              <input
                type="text"
                class="ms-field-input"
                v-model="store.phoneNumber"
              />
            </div>
          </div>
          <div class="ms-col">
            <div class="ms-row-text text-padding-10px">Mã số thuế</div>
            <div class="ms-form-text">
              <input
                type="text"
                class="ms-field-input"
                v-model="store.storeTaxCode"
              />
            </div>
          </div>
        </div>

        <div class="ms-row">
          <div class="ms-row-text">Quốc gia</div>
          <div class="ms-form-select align-item-left">
            <ms-combobox
              class="custom-combobox"
              ref="cbbCountry"
              @changeValue="getProvince"
              :items="listCountry"
              @closeOtherComboboxs="closeWithoutCountry"
            />
          </div>
        </div>

        <div class="ms-row ms-row-2-col">
          <div class="ms-col">
            <div class="ms-row-text">Tỉnh/Thành phố</div>
            <div class="ms-form-select">
              <ms-combobox
                class="custom-combobox"
                ref="cbbProvince"
                @changeValue="getDistrict"
                :items="this.listProvince"
                @closeOtherComboboxs="closeWithoutProvince"
              />
            </div>
          </div>
          <div class="ms-col">
            <div class="ms-row-text text-padding-10px">Quận/Huyện</div>
            <div class="ms-form-select">
              <ms-combobox
                class="custom-combobox"
                ref="cbbDistrict"
                :items="this.listDistrict"
                @changeValue="getWard"
                @closeOtherComboboxs="closeWithoutDistrict"
              />
            </div>
          </div>
        </div>

        <div class="ms-row ms-row-2-col">
          <div class="ms-col">
            <div class="ms-row-text">Phường/Xã</div>
            <div class="ms-form-select">
              <ms-combobox
                class="custom-combobox"
                ref="cbbWard"
                @changeValue="confirmPosition"
                :items="this.listWard"
              />
            </div>
          </div>
          <div class="ms-col">
            <div class="ms-row-text text-padding-10px">Đường phố</div>
            <div class="ms-form-text">
              <input
                type="text"
                class="ms-field-input"
                v-model="store.street"
              />
            </div>
          </div>
        </div>

        <div class="ms-row ms-checkbox" v-if="editMode === 2">
          <div class="ms-row-text">
            <span class="ms-field-requied"></span>
          </div>
          <div class="ms-checkbox-status">
            <div
              :class="
                store.status === 0
                  ? 'ms-checkbox-icon-checked'
                  : 'ms-checkbox-icon-unchecked'
              "
              @click="selectStoreStatus"
            ></div>
            <div class="ms-checkbox-title">Ngưng hoạt động</div>
          </div>
        </div>
      </div>

      <!-- dialog-footer -->
      <div class="ms-dialog-footer">
        <div class="ms-footer-left">
          <div class="ms-help">
            <div class="ms-help-icon"></div>
            <div class="ms-help-text">Trợ giúp</div>
          </div>
        </div>
        <div class="ms-footer-right">
          <div class="ms-btn-save ms-footer-btn-common" @click="saveData(1)">
            <div class="ms-icon-common ms-btn-save-icon"></div>
            <div class="ms-btn-save-text">Lưu</div>
          </div>
          <div class="ms-btn-build ms-footer-btn-common" @click="saveData(2)">
            <div class="ms-btn-build-icon ms-icon-common"></div>
            <div class="ms-btn-build-text">Lưu và thêm mới</div>
          </div>
          <div class="ms-btn-cancel ms-footer-btn-common" @click="exitDialog">
            <div class="ms-btn-cancel-icon ms-icon-common"></div>
            <div class="ms-btn-cancel-text">Hủy bỏ</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Msg } from '../../constant/types'
export default {
  name: 'msDialog',
  data () {
    return {
      store: {
        storeId: '00000000-0000-0000-0000-000000000000',
        storeCode: '',
        storeName: '',
        address: '',
        phoneNumber: '',
        storeTaxCode: '',
        provinceId: '',
        districtId: '',
        wardId: '',
        countryId: '',
        street: '',
        status: 1,
        createdDate: '2017-08-15T13:32:46',
        createdBy: '',
        modifiedDate: '1970-01-01T01:45:10',
        modifiedBy: '',
        editMode: 0
      },
      storeDefault: {
        storeId: '00000000-0000-0000-0000-000000000000',
        storeCode: '',
        storeName: '',
        address: '',
        phoneNumber: '',
        storeTaxCode: '',
        provinceId: '',
        districtId: '',
        wardId: '',
        street: '',
        status: 1,
        createdDate: '2017-08-15T13:32:46',
        createdBy: '',
        modifiedDate: '1970-01-01T01:45:10',
        modifiedBy: '',
        editMode: 0
      },
      listCountry: [],
      listDistrict: [],
      listProvince: [],
      listWard: [],
      isWarningCode: false,
      isWarningAddress: false,
      isWarningName: false,
      error: false,
      errorNull: Msg.errorNull,
      errorStoreCode: Msg.errorNull
    }
  },
  methods: {
    /**
     * Đóng dialog
     * Check sự thay đổi của giá trị
     * CreatedBy: LVDat (19/06/2021)
     */
    closeDialog () {
      if (this.editMode === 1) {
        this.store = this.storeDefault
        this.exitDialog()
      } else {
        this.$emit('displayPopupSave', this.store)
      }
    },

    /**
     * Hàm lưu dữ liệu
     * CreatedBy: LVDat (19/06/2021)
     */
    saveData (key) {
      // Validate 1 dữ liệu
      this.validateStoreCode()
      this.validateStoreName()
      this.validateStoreAddress()
      // Focus vào ô input lỗi
      if (this.isWarningCode) {
        this.focusInput()
      } else if (this.isWarningName) {
        this.$refs.inputStoreName.focus()
      } else if (this.isWarningAddress) {
        this.$refs.inputStoreAddress.focus()
      } else {
        this.store.editMode = this.editMode
        var listStore = []
        listStore.push(this.store)
        // Gửi request lên server
        this.axios.post('Stores', listStore).then((response) => {
          if (response.data.success === true) {
            this.$vToastify.success(response.data.message)
            this.$emit('loadStore')
            this.checkStatusDialog(key)
          } else {
            this.errorStoreCode = Msg.errorDuplicate
            this.$emit('displayPopupError')
          }
        })
      }
    },
    /**
     * Hàm load thông tin: Quốc gia, tỉnh/thành phố, quận/huyện, xã/phường
     * CreatedBy: LVDat (19/06/2021)
     */
    editStore (store) {
      this.store = store
      var tmpCountryId = store.countryId
      var tmpProvinceId = store.provinceId
      var tmpDistrictId = store.districtId
      var tmpWardId = store.wardId

      if (tmpCountryId !== null) {
        this.getCountry()
        this.getProvince(tmpCountryId)
        if (tmpProvinceId !== null) {
          this.getDistrict(tmpProvinceId)
          if (tmpDistrictId !== null) {
            this.getWard(tmpDistrictId)
            this.confirmPosition(tmpWardId)
          }
        }
      }

      setTimeout(() => {
        this.getProvinceById(tmpProvinceId)
        this.getDistrictById(tmpDistrictId)
        this.getWardById(tmpWardId)
      }, 300)
    },
    /**
     * Hàm lấy thông tin tỉnh/thành phố theo mã tỉnh/thành phố
     * CreatedBy: LVDat (19/06/2021)
     */
    getProvinceById (provinceId) {
      if (provinceId) {
        this.store.provinceId = provinceId
        this.axios.get('Provinces/' + provinceId).then((response) => {
          this.$refs.cbbProvince.keyFilter = response.data.data[0].provinceName
          this.$refs.cbbProvince.itemSelected.text =
        response.data.data[0].provinceName
          this.$refs.cbbProvince.itemSelected.value =
        response.data.data[0].provinceId
        })
      }
    },
    /**
     * Lấy thông tin quận huyện theo mã quận/huyện
     * CreatedBy: LVDat (19/06/2021)
     */
    getDistrictById (districtId) {
      if (districtId) {
        this.store.districtId = districtId
        this.axios.get('Districts/' + districtId).then((response) => {
          this.$refs.cbbDistrict.keyFilter = response.data.data[0].districtName
          this.$refs.cbbDistrict.itemSelected.text =
            response.data.data[0].districtName
          this.$refs.cbbDistrict.itemSelected.value =
            response.data.data[0].districtId
        })
      }
    },
    /**
     * Lấy thông tin xã/phường theo mã quận/huyện
     * CreatedBy: LVDat (19/06/2021)
     */
    getWardById (wardId) {
      if (wardId) {
        this.store.wardId = wardId
        this.axios.get('Wards/' + wardId).then((response) => {
          this.$refs.cbbWard.keyFilter = response.data.data[0].wardName
          this.$refs.cbbWard.itemSelected.text = response.data.data[0].wardName
          this.$refs.cbbWard.itemSelected.value = response.data.data[0].wardId
        })
      }
    },
    /**
     * Hàm kiểm tra trạng thái của dialog
     * CreatedBy: LVDat (19/06/2021)
     */
    checkStatusDialog (status) {
      if (status === 1) {
        this.exitDialog()
      } else {
        this.$emit('saveAndAddNew')
      }
    },
    /**
     * Đóng các cbb khác
     * CreatedBy: LVDat(19/06/2-21)
     */
    closeWithoutCountry () {
      this.$refs.cbbWard.isActived = false
      this.$refs.cbbProvince.isActived = false
      this.$refs.cbbDistrict.isActived = false
    },
    closeWithoutProvince () {
      this.$refs.cbbWard.isActived = false
      this.$refs.cbbDistrict.isActived = false
    },
    closeWithoutDistrict () {
      this.$refs.cbbWard.isActived = false
    },
    /**
     * Hàm chọn trạng thái cửa hàng
     * CreatedBy: LVDat(19/06/2021)
     */
    selectStoreStatus () {
      if (this.store.status === 0) { this.store.status = 1 } else { this.store.status = 0 }
    },
    /**
     * Đóng dialog khi click button "Hủy bỏ"
     * CreatedBy: LVDat(19/06/2021)
     */
    exitDialog () {
      this.setToDefault()
      this.$emit('closeDialog')
    },
    /**
     * Hàm đưa các giá trị về giá trị ban đầu
     * CreatedBy: LVDat(19/06/2021)
     */
    setToDefault () {
      this.store = this.storeDefault
      this.listCountry = []
      this.listDistrict = []
      this.listProvince = []
      this.listWard = []
      this.isWarningCode = false
      this.isWarningAddress = false
      this.isWarningName = false
    },
    /**
     * Hàm lấy toàn bộ danh sách quốc gia
     * CreatedBy: LVDat (16/06/2021)
     */
    getCountry () {
      this.listProvince = []
      this.axios.get('Country?pageIndex=1&pageSize=100').then((response) => {
        response.data.data.forEach((element) => {
          this.listCountry.push({
            value: element.countryId,
            text: element.countryName
          })
        })
        this.store.provinceId = null
        this.store.districtId = null
        this.store.wardId = null
        this.$refs.cbbCountry.keyFilter = this.listCountry[0].text
        this.$refs.cbbCountry.itemSelected = this.listCountry[0]
        this.store.countryId = this.listCountry[0].value
      })
    },

    /**
     * Hàm lấy thông tin tỉnh/thành phố sau khi chọn quốc gia
     * CeatedBy: LVDat (16/06/2021)
     */
    getProvince (countryId) {
      this.listProvince = []
      this.axios.get('Provinces?pageIndex=1&pageSize=100').then((response) => {
        for (let index = 0; index < response.data.data.length; index++) {
          var element = response.data.data[index]
          this.listProvince.push({
            value: element.provinceId,
            text: element.provinceName
          })
          this.store.districtId = null
          this.store.wardId = null
          this.$refs.cbbProvince.keyFilter = ''
          this.$refs.cbbDistrict.keyFilter = ''
          this.$refs.cbbWard.keyFilter = ''
        }
      })
    },
    /**
     * Hàm lấy thông tin quận/huyện sau khi chọn tỉnh/thành phố
     * CeatedBy: LVDat (16/06/2021)
     */
    getDistrict (provinceId) {
      this.listDistrict = []
      this.store.provinceId = provinceId
      this.axios
        .get('Districts/get/byProvince?provinceId=' + provinceId)
        .then((response) => {
          for (let index = 0; index < response.data.data.length; index++) {
            var element = response.data.data[index]
            this.listDistrict.push({
              value: element.districtId,
              text: element.districtName
            })
          }
          this.store.wardId = null
          this.$refs.cbbDistrict.keyFilter = ''
          this.$refs.cbbWard.keyFilter = ''
        })
    },
    /**
     * Hàm lấy thông tin xã/phường sau khi chọn quận/huyện
     * CeatedBy: LVDat (16/06/2021)
     */
    getWard (districtId) {
      this.listWard = []
      this.store.districtId = districtId
      this.axios
        .get('Wards/get/byDistrict?districtId=' + districtId)
        .then((response) => {
          for (let index = 0; index < response.data.data.length; index++) {
            var element = response.data.data[index]
            this.listWard.push({
              value: element.wardId,
              text: element.wardName
            })
          }
          this.$refs.cbbWard.itemSelected = {}
          this.$refs.cbbWard.keyFilter = ''
        })
    },
    confirmPosition (wardId) {
      this.store.wardId = wardId
    },
    /**
     * Hàm mặc định focus vào ô input đầu tiên
     * CreatedBy: LVDat (15/06/2021)
     */
    focusInput () {
      setTimeout(() => {
        this.$refs.autofocus.focus()
      }, 10)
    },
    /**
     * Hàm validate giá trị storeCode
     * CreatedBy: LVDat (15/06/2021)
     */
    validateStoreCode () {
      if (this.validateData(this.store.storeCode)) {
        this.errorStoreCode = Msg.errorNull
        this.isWarningCode = true
      } else if (this.validateLength(this.store.storeCode)) {
        this.errorStoreCode = Msg.errorLength
        this.isWarningCode = true
      } else {
        this.isWarningCode = false
      }
    },
    /**
     * Hàm validate giá trị storeName
     * CreatedBy: LVDat (15/06/2021)
     */
    validateStoreName () {
      if (this.validateData(this.store.storeName)) {
        this.isWarningName = true
      } else {
        this.isWarningName = false
      }
    },
    /**
     * Hàm validate giá trị storeAddress
     * CreatedBy: LVDat (15/06/2021)
     */
    validateStoreAddress () {
      if (this.validateData(this.store.address)) {
        this.isWarningAddress = true
      } else {
        this.isWarningAddress = false
      }
    },
    /**
     * Hàm validate độ dài
     * CreatedBy: LVDat (15/06/2021)
     */
    validateLength (val) {
      if (val.length > 25) { return true }
      return false
    },
    /**
     * Hàm validate chung
     * CreatedBy: LVDat (15/06/2021)
     */
    validateData (val) {
      if (typeof val === 'undefined' || val === null || val === '') {
        return true
      }
      return false
    }
  },
  computed: {
    /**
     * Kiểm tra trạng thái của đối tượng
     * 1: Thêm
     * 2: Sửa
     * CreatedBy: LVDat (15/06/2021)
     */
    editModeTitle () {
      if (this.editMode === 1) {
        return 'Thêm mới cửa hàng'
      } else return 'Sửa cửa hàng'
    }
  },
  props: {
    editMode: {
      type: Number,
      default: 1
    }
  },
  watch: {
    // storeMain: function () {
    //   console.log('Main da thay doi', this.storeMain.storeCode)
    // },
    // store: function () {
    //   console.log('Regular da thay doi', this.store.storeCode)
    // }
  }
}
</script>
<style lang="scss" scoped>
@import "../../scss/common.scss";
@import "../../scss/msDialog.scss";
</style>
