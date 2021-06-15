<template>
  <div class="ms-grid-container">
    <table
      class="ms-grid-content"
      :style="{ height: sizeGrid + 'px' }"
       v-columns-resizable
    >
      <div class="loading" v-if="isLoading">
      <PulseLoader class="loading-icon" :color="'#bcbcbf'"></PulseLoader>
    </div>
      <!-- Mã cửa hàng -->
      <thead>
        <tr>
          <th class="ms-th ms-th-store-code">
            <div class="ms-grid-title">
              <span>Mã cửa hàng</span>
            </div>
            <div class="ms-filter">
              <ms-filter-option />
              <div class="ms-filter-input">
                <input type="text" class="ms-input" />
              </div>
            </div>
          </th>
          <!-- Tên cửa hàng -->
          <th class="ms-th ms-th-store-name">
            <div class="ms-grid-title">
              <span>Tên cửa hàng</span>
            </div>
            <div class="ms-filter">
              <ms-filter-option />
              <div class="ms-filter-input">
                <input type="text" class="ms-input" />
              </div>
            </div>
          </th>
          <!-- Địa chỉ -->
          <th class="ms-th ms-th-store-address">
            <div class="ms-grid-title">
              <span>Địa chỉ</span>
            </div>
            <div class="ms-filter">
              <ms-filter-option />
              <div class="ms-filter-input">
                <input type="text" class="ms-input" />
              </div>
            </div>
          </th>
          <!-- Số điện thoại -->
          <th class="ms-th ms-th-store-phone">
            <div class="ms-grid-title">
              <span>Số điện thoại</span>
            </div>
            <div class="ms-filter">
              <ms-filter-option />
              <div class="ms-filter-input">
                <input type="text" class="ms-input" />
              </div>
            </div>
          </th>
          <!-- Trạng thái -->
          <th class="ms-th ms-th-store-status">
            <div class="ms-grid-title">
              <span>Trạng thái</span>
            </div>
            <div class="ms-filter"></div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in listStore"
          :key="index"
          :class="item.storeId == storeSelected.storeId ? 'isSelected' : ''"
          @click="selectStore(item)"
        >
          <td>{{ item.storeCode }}</td>
          <td>{{ item.storeName }}</td>
          <td>{{ item.address }}</td>
          <td>{{ item.phoneNumber }}</td>
          <td>{{ item.status | formatStatus }}</td>
        </tr>
      </tbody>
    </table>

    <div class="ms-navigate">
        <div class="ms-btn-page-common">
            <div class="ms-first-page-icon ms-icon-common"></div>
        </div>
         <div class="ms-btn-page-common">
            <div class="ms-pre-page-icon ms-icon-common"></div>
        </div>
        <div class="ms-page-text"> Trang 1 </div>
        <div class="ms-input-page">
          <input type="text"  />
        </div>
        <div class="ms-page-text"> trên 20 </div>
       <div class="ms-btn-page-common">
            <div class="ms-next-page-icon ms-icon-common"></div>
        </div>
        <div class="ms-btn-page-common">
            <div class="ms-last-page-icon ms-icon-common"></div>
        </div>
         <div class="ms-btn-page-common boder-blue">
            <div class="ms-reload-icon ms-icon-common "></div>
        </div>
        <div class="ms-select-pagesize">
          <select name="" id="">
            <option value="15">15</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

      <div class="ms-paging-detail"></div>
    </div>

  </div>
</template>
<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
  name: 'msGrid',
  components: {
    PulseLoader
  },
  data () {
    return {
      listStore: [], // Biến lưu danh sách các cửa hàng
      sizeGrid: 0, // Biến xác định kichsd thước của bảng
      storeSelected: {
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
      isLoading: false
    }
  },
  methods: {
    selectStore (store) {
      this.storeSelected = store
    },
    /**
     * Hàm load lại toàn bộ dữ liệu
     * CreatedBy: LVDat (15/06/2021)
     */
    loadData () {
      this.isLoading = true
      this.axios.get('Stores?pageIndex=1&pageSize=50').then((response) => {
        this.listStore = response.data.data
        this.sizeGrid = response.data.data * 31.4 + 64
        this.isLoading = false
        if (response.data.data.length > 0) {
          this.storeSelected = response.data.data[0]
        }
      })
    }
  },
  /**
  * Tải dữ liệu ngay sai mounted
  * CreatedBy: LVDat (15/06/2021)
  */
  mounted () {
    this.isLoading = true
    this.axios.get('Stores?pageIndex=1&pageSize=50').then((response) => {
      this.listStore = response.data.data
      this.sizeGrid = response.data.data * 31.4 + 64
      this.isLoading = false
      if (response.data.data.length > 0) {
        this.storeSelected = response.data.data[0]
      }
    })
  }
}
</script>
<style lang="scss">
@import "../../scss/common.scss";
@import "../../scss/msGrid.scss";
</style>
