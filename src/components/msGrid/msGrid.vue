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
              <ms-filter-option ref="optionCode"/>
              <div class="ms-filter-input">
                <input type="text" class="ms-input" v-model="filterCode" @keyup.enter="searchWithFilter"/>
              </div>
            </div>
          </th>
          <!-- Tên cửa hàng -->
          <th class="ms-th ms-th-store-name">
            <div class="ms-grid-title">
              <span>Tên cửa hàng</span>
            </div>
            <div class="ms-filter">
              <ms-filter-option ref="optionName" />
              <div class="ms-filter-input">
                <input type="text" class="ms-input" v-model="filterName"  @keyup.enter="searchWithFilter"/>
              </div>
            </div>
          </th>
          <!-- Địa chỉ -->
          <th class="ms-th ms-th-store-address">
            <div class="ms-grid-title">
              <span>Địa chỉ</span>
            </div>
            <div class="ms-filter">
              <ms-filter-option ref="optionAddress"/>
              <div class="ms-filter-input">
                <input type="text" class="ms-input" v-model="filterAddress"  @keyup.enter="searchWithFilter"/>
              </div>
            </div>
          </th>
          <!-- Số điện thoại -->
          <th class="ms-th ms-th-store-phone">
            <div class="ms-grid-title">
              <span>Số điện thoại</span>
            </div>
            <div class="ms-filter">
              <ms-filter-option ref="optionPhone"/>
              <div class="ms-filter-input">
                <input type="text" class="ms-input" v-model="filterPhone"  @keyup.enter="searchWithFilter"/>
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
        <div class="ms-page-text"> Trang {{pageIndex}} </div>
        <div class="ms-input-page">
          <input type="text"  v-model="pageIndex"/>
        </div>
        <div class="ms-page-text"> trên {{totalPage}} </div>
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
          <select name="" id="" v-model="pageSize">
            <option :value="15" :selected="true">15</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
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
      sizeGrid: 0, // Biến xác định kích thước của bảng
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
      isLoading: false,
      filterCode: '',
      filterName: '',
      filterAddress: '',
      filterPhone: '',
      filterStatus: 1,
      filterModeCode: 1,
      filterModeName: 1,
      filterModePhone: 1,
      filterModeAddress: 1,
      pageSize: 15,
      pageIndex: 1,
      totalPage: 1
    }
  },
  methods: {
    /**
     * Hàm lưu lại thông tin store đã chọn
     * CreatedBy: LVDat (16/06/2021)
     */
    selectStore (store) {
      this.storeSelected = store
    },
    /**
     * Hàm load lại toàn bộ dữ liệu
     * CreatedBy: LVDat (15/06/2021)
     */
    loadStore () {
      this.isLoading = true
      this.axios.get('Stores?pageIndex=1&pageSize=' + this.pageSize).then((response) => {
        this.listStore = response.data.data
        this.sizeGrid = response.data.data * 31.4 + 64
        this.isLoading = false
        if (response.data.data.length > 0) {
          this.storeSelected = response.data.data[0]
        }
      })
    },
    searchWithFilter () {
      this.isLoading = true
      this.axios.get('Stores/filter?storeCode=' + this.filterCode + '&storeName=' + this.filterName + '&address=' + this.filterAddress + '&phoneNumber=' + this.filterPhone + '&status=' +
      this.filterStatus + '&pageIndex=' + this.pageIndex + '&pageSize=' + this.pageSize).then(response => {
        this.listStore = response.data.data
        this.sizeGrid = response.data.data.length * 31.4 + 64
        this.isLoading = false
        this.totalPage = response.data.totalPage
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
    this.axios.get('Stores/filter?&pageIndex=' + 1 + '&pageSize=' + 15).then((response) => {
      this.listStore = response.data.data
      this.sizeGrid = response.data.data * 31.4 + 64
      this.isLoading = false
      this.totalPage = response.data.totalPage
      if (response.data.data.length > 0) {
        this.storeSelected = response.data.data[0]
      }
    })
  },
  watch: {
    pageSize: function () {
      this.searchWithFilter()
    }
  }
}
</script>
<style lang="scss">
@import "../../scss/common.scss";
@import "../../scss/msGrid.scss";
</style>
