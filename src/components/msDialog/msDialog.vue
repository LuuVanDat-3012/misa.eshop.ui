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
            class="ms-form-text text-required"
            :class="{ warning: isWarning }"
          >
            <input
              type="text"
              class="ms-field-input"
              v-model="store.storeCode"
              ref="autofocus"
              @keydown.tab="validateData(store.storeCode)"
              @keyup="validateData(store.storeCode)"
            />
          </div>
        </div>

        <div class="ms-row">
          <div class="ms-row-text">
            Tên cửa hàng <span class="ms-field-requied">*</span>
          </div>
          <div class="ms-form-text" :class="{ warning: isWarning }">
            <input
              type="text"
              class="ms-field-input"
              v-model="store.storeName"
              @keydown.tab="validateData(store.storeCode)"
              @keyup="validateData(store.storeCode)"
            />
          </div>
        </div>

        <div class="ms-row-large">
          <div class="ms-row-text">
            Địa chỉ<span class="ms-field-requied">*</span>
          </div>
          <div class="ms-form-textarea" :class="{ warning: isWarning }">
            <input
              type="textarea"
              class="ms-field-textarea"
              v-model="store.address"
              @keydown.tab="validateData(store.storeCode)"
              @keyup="validateData(store.storeCode)"
            />
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
            <ms-combobox class="custom-combobox" ref="cbbCountry" />
          </div>
        </div>

        <div class="ms-row ms-row-2-col">
          <div class="ms-col">
            <div class="ms-row-text">Tỉnh/Thành phố</div>
            <div class="ms-form-select">
              <ms-combobox class="custom-combobox" ref="cbbProvince" />
            </div>
          </div>
          <div class="ms-col">
            <div class="ms-row-text text-padding-10px">Quận/Huyện</div>
            <div class="ms-form-select">
              <ms-combobox class="custom-combobox" ref="cbbPistrict" />
            </div>
          </div>
        </div>

        <div class="ms-row ms-row-2-col">
          <div class="ms-col">
            <div class="ms-row-text">Phường/Xã</div>
            <div class="ms-form-select">
              <ms-combobox class="custom-combobox" ref="cbbWard" />
            </div>
          </div>
          <div class="ms-col">
            <div class="ms-row-text text-padding-10px">Đường phố</div>
            <div class="ms-form-text"></div>
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
          <div class="ms-btn-save ms-footer-btn-common">
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
      listCounry: [],
      listDistrict: [],
      listProvince: [],
      listWard: [],
      items: [],
      isWarning: false
    }
  },
  methods: {
    closeDialog () {
      this.store = this.storeFake
      this.$emit('closeDialog')
      this.items = []
    },
    // Hàm load thông tin quốc gia
    // CeatedBy: LVDat (15/06/2021)
    getCountry () {
      this.axios.get('Country?pageIndex=1&pageSize=300').then((response) => {
        this.listCounry = response.data.data
        for (let index = 0; index < this.listCounry.length; index++) {
          var element = this.listCounry[index]
          this.items.push({
            value: element.countryId,
            text: element.countryName
          })
        }
        this.$refs.cbbCountry.items = this.items
      })
    },
    // Hàm lấy thông tin tỉnh/thành phố sau khi chọn quốc gia
    // CeatedBy: LVDat (15/06/2021)
    getProvince (countryId) {
      this.items = []
      this.store.countryId = countryId
      this.axios
        .get('Provinces/get/byCountry?countryId=' + countryId)
        .then((response) => {
          this.listProvince = response.data.data
          for (let index = 0; index < this.listProvince.length; index++) {
            var element = this.listProvince[index]
            this.items.push({
              value: element.provinceId,
              text: element.provinceName
            })
          }
          this.$refs.cbbProvince.items = this.items
        })
    },
    /**
     * Hàm mặc định focus vào ô input đầu tiên
     * CreatedBy: LVDat (30/12/2021)
     */
    focusInput () {
      setTimeout(() => {
        this.$refs.autofocus.focus()
      }, 10)
    },
    validateData (val) {
      if (val === null || val === '' || typeof val === 'undefined') {
        this.isWarning = true
      } else {
        this.isWarning = false
      }
    }
  },
  mounted () {}
}
</script>
<style lang="scss" scoped>
@import "../../scss/common.scss";
@import "../../scss/msDialog.scss";
</style>
