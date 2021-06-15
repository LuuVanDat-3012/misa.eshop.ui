<template>
  <div class="ms-grid-container">
    <table class="ms-grid-content" v-columns-resizable :style="{height : sizeGrid  + 'px'}">
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
            <div class="ms-filter">

            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in listStore" :key="index" :class="item.storeId == storeSelected.storeId ? 'isSelected' : ''" @click="selectStore(item)">
          <td>{{item.storeCode}}</td>
          <td>{{item.storeName}}</td>
          <td>{{item.address}}</td>
          <td>{{item.phoneNumber}}</td>
          <td>{{item.status | formatStatus}}</td>
        </tr>
      </tbody>
    </table>

    <div class="ms-navigate">
      <div class="ms-paging-toolbar">
      </div>
      <div class="ms-paging-detail"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'msGrid',
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
      }
    }
  },
  methods: {
    selectStore (store) {
      this.storeSelected = store
    }
  },
  mounted () {
    this.axios.get('Stores?pageIndex=1&pageSize=10').then(response => {
      this.listStore = response.data.data
      this.sizeGrid = response.data.data * 31.4 + 64
      if (response.data.data.length > 0) { this.storeSelected = response.data.data[0] }
    })
  }
}
</script>
<style lang="scss">
@import "../../scss/common.scss";
@import "../../scss/msGrid.scss";
</style>
