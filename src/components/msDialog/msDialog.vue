<template>
  <div class="ms-dialog">
    <div class="ms-dialog-model"></div>
    <div class="ms-dialog-main">
      <div class="ms-dialog-header">
        <div class="ms-header-title">Thêm mới cửa hàng</div>
        <div class="ms-icon-close" @click="closeDialog"></div>
      </div>

      <div class="ms-dialog-body">
        <div class="ms-row">
          <div class="ms-row-text">
            Mã cửa hàng <span class="ms-field-requied">*</span>
          </div>
          <div
            class="ms-form-text "
            :class="{ error: isWarningCode, zoomOut: isWarningCode }"
          >
            <input
              type="text"
              class="ms-field-input"
              v-model="store.storeCode"
              ref="autofocus"
              @keyup="validateStoreCode()"
              @keydown.tab="validateStoreCode()"
            />
          </div>
          <div class="ms-icon-error" v-if="isWarningCode"></div>
        </div>

        <div class="ms-row">
          <div class="ms-row-text ">
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
              @keydown.tab="validateStoreName()"
            />
             <div class="ms-icon-error icon-error-special" v-if="isWarningName"></div>
          </div>
        </div>

        <div class="ms-row-large">
          <div class="ms-row-text">
            Địa chỉ <span class="ms-field-requied">*</span>
          </div>
          <div class="ms-form-textarea" :class="{ error: isWarningAddress, zoomOut: isWarningAddress }">
            <input
              type="textarea"
              class="ms-field-textarea"
              v-model="store.address"
              @keyup="validateStoreAddress()"
              @keydown.tab="validateStoreAddress()"
            />
          </div>
          <div class="ms-icon-error" v-if="isWarningAddress"></div>
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
              :items="this.listCountry"
              :itemId="this.countryId"
              :placeholder="this.placeholderCountry"
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
                :itemId="this.provinceId"
                 :placeholder="this.placeholderProvince"
              />
            </div>
          </div>
          <div class="ms-col">
            <div class="ms-row-text text-padding-10px">Quận/Huyện</div>
            <div class="ms-form-select">
              <ms-combobox
                class="custom-combobox"
                ref="cbbDistrict"
                @changeValue="getWard"
                :items="this.listDistrict"
                :itemId="this.districtId"
                 :placeholder="this.placeholderDistrict"
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
                :itemId="this.wardId"
                 :placeholder="this.placeholderWard"
                 :testValue="this.store.countryId"
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
          <div class="ms-btn-save ms-footer-btn-common" @click="saveData">
            <div class="ms-icon-common ms-btn-save-icon"></div>
            <div class="ms-btn-save-text">Lưu</div>
          </div>
          <div class="ms-btn-build ms-footer-btn-common">
            <div class="ms-btn-build-icon ms-icon-common"></div>
            <div class="ms-btn-build-text">Lưu và thêm mới</div>
          </div>
          <div class="ms-btn-cancel ms-footer-btn-common" @click="closeDialog">
            <div class="ms-btn-cancel-icon ms-icon-common"></div>
            <div class="ms-btn-cancel-text">Hủy bỏ</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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
        provinceId: '00000000-0000-0000-0000-000000000000',
        districtId: '00000000-0000-0000-0000-000000000000',
        wardId: '00000000-0000-0000-0000-000000000000',
        street: '',
        status: 0,
        createdDate: '2017-08-15T13:32:46',
        createdBy: '',
        modifiedDate: '1970-01-01T01:45:10',
        modifiedBy: '',
        editMode: 0
      },
      storeFake: {
        storeId: '00000000-0000-0000-0000-000000000000',
        storeCode: '',
        storeName: '',
        address: '',
        phoneNumber: '',
        storeTaxCode: '',
        provinceId: '00000000-0000-0000-0000-000000000000',
        districtId: '00000000-0000-0000-0000-000000000000',
        wardId: '00000000-0000-0000-0000-000000000000',
        street: '',
        status: 0,
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
      items: [],
      isWarningCode: false,
      isWarningAddress: false,
      isWarningName: false,
      editMode: 0,
      countryId: '',
      provinceId: '',
      districtId: '',
      wardId: '',
      error: false,
      placeholderCountry: 'Nhập quốc gia',
      placeholderProvince: 'Nhập tỉnh/thành phố',
      placeholderDistrict: 'Nhập quận/huyện',
      placeholderWard: 'Nhập xã phường'
    }
  },
  methods: {
    closeDialog () {
      this.store = this.storeFake
      this.listCountry = []
      this.listDistrict = []
      this.listProvince = []
      this.listWard = []
      this.isWarningCode = false
      this.isWarningAddress = false
      this.isWarningName = false
      this.$emit('closeDialog')
    },
    /**
     * Hàm lấy toàn bộ danh sách quốc gia
     * CreatedBy: LVDat (16/06/2021)
     */
    async loadCountry () {
      const res = await this.axios.get('Country?pageIndex=1&pageSize=300')
      const list = Object.assign(res.data.data)
      // console.table(this.listCountry)
      // console.table(JSON.parse(JSON.stringify(this.listCountry)))
      list.forEach(element => {
        this.listCountry.push({
          value: element.countryId,
          text: element.countryName
        })
      })
      this.listCountry = JSON.parse(JSON.stringify(this.listCountry))
      this.$refs.cbbCountry.keyFilter = ''
      this.$refs.cbbProvince.keyFilter = ''
      this.$refs.cbbDistrict.keyFilter = ''
      this.$refs.cbbWard.keyFilter = ''
    },

    /**
     * Hàm lấy thông tin tỉnh/thành phố sau khi chọn quốc gia
     * CeatedBy: LVDat (16/06/2021)
     */
    getProvince (countryId) {
      this.store.countryId = countryId
      this.axios
        .get('Provinces/get/byCountry?countryId=' + countryId)
        .then(response => {
          for (let index = 0; index < response.data.data.length; index++) {
            var element = response.data.data[index]
            this.listProvince.push({
              value: element.provinceId,
              text: element.provinceName
            })
          }
          // this.$refs.cbbProvince.itemSelected = {}
          // this.$refs.cbbProvince.keyFilter = ''
          // this.$refs.cbbDistrict.keyFilter = ''
          // this.$refs.cbbWard.keyFilter = ''
        })
    },
    /**
     * Hàm lấy thông tin quận/huyện sau khi chọn tỉnh/thành phố
     * CeatedBy: LVDat (16/06/2021)
     */
    getDistrict (provinceId) {
      this.store.provinceId = provinceId
      this.axios
        .get('Districts/get/byProvince?provinceId=' + provinceId)
        .then(response => {
          for (let index = 0; index < response.data.data.length; index++) {
            var element = response.data.data[index]
            this.listDistrict.push({
              value: element.districtId,
              text: element.districtName
            })
          }
          // this.$refs.cbbDistrict.itemSelected = {}
          // this.$refs.cbbDistrict.keyFilter = ''
          // this.$refs.cbbWard.keyFilter = ''
        })
    },
    /**
     * Hàm lấy thông tin xã/phường sau khi chọn quận/huyện
     * CeatedBy: LVDat (16/06/2021)
     */
    getWard (districtId) {
      this.store.districtId = districtId
      this.axios
        .get('Wards/get/byDistrict?districtId=' + districtId)
        .then(response => {
          for (let index = 0; index < response.data.data.length; index++) {
            var element = response.data.data[index]
            this.$refs.cbbWard.items.push({
              value: element.wardId,
              text: element.wardName
            })
          }
          // this.$refs.cbbWard.itemSelected = {}
          // this.$refs.cbbWard.keyFilter = ''
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

    validateStoreCode () {
      if (this.validateData(this.store.storeCode)) {
        this.isWarningCode = false
      } else {
        this.isWarningCode = true
      }
    },
    validateStoreName () {
      if (!this.validateData(this.store.storeName)) {
        this.isWarningName = true
      } else {
        this.isWarningname = false
      }
    },
    validateStoreAddress () {
      if (!this.validateData(this.store.storeAddress)) {
        this.isWarningAddress = true
      } else {
        this.isWarningAddress = false
      }
    },
    validateData (val) {
      if (typeof val === 'undefined' || val === null || val === '') {
        return false
      }
      return true
    },
    /**
     * Hàm lưu dữ liệu
     */
    saveData () {
      this.store.editMode = 1
      this.store.status = 1
      var listStore = []
      listStore.push(this.store)
      this.axios.post('Stores', listStore).then(response => {
        if (response.data.success === true) {
          this.$vToastify.success(response.data.message)
          this.closeDialog()
          this.$emit('loadStore')
        } else {
          this.$vToastify.error(response.data.message)
          const listFieldNotValid = response.data.fieldNotValids
          listFieldNotValid.forEach(element => {
            this.$vToastify.error(element.msg)
          })
        }
      })
    },
    editStore (store) {
      this.store = store
      this.countryId = store.countryId
      this.provinceId = store.provinceId
      this.districtId = store.districtId
      this.wardId = store.wardId
      setTimeout(() => {
        this.loadCountry()
      }, 300)
      this.getProvince(store.countryId)
      this.getDistrict(store.provinceId)
      this.getWard(store.districtId)
      this.getCoutryById()
      this.getProvinceById()
      // this.listCountry.forEach(e => {
      //   if (e.value === this.store.countryId) {
      //     this.$refs.cbbCountry.keyFilter = e.text
      //   }
      // })
    },
    /**
     * Hàm lấy thông tin quốc gia theo mã
     */
    getCoutryById () {
      this.axios.get('Country/' + this.store.countryId).then(response => {
        this.$refs.cbbCountry.keyFilter = response.data.data[0].countryName
        this.$refs.cbbCountry.itemSelected.text = response.data.data[0].countryName
        this.$refs.cbbCountry.itemSelected.value = response.data.data[0].countryId
      })
    },
    getProvinceById () {
      this.axios.get('Provinces/' + this.store.provinceId).then(response => {
        this.$refs.cbbProvince.keyFilter = response.data.data[0].provinceName
        this.$refs.cbbProvince.itemSelected.text = response.data.data[0].provinceName
        this.$refs.cbbProvince.itemSelected.value = response.data.data[0].provinceId
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../scss/common.scss";
@import "../../scss/msDialog.scss";
</style>
