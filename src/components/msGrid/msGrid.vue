<template>
  <div class="ms-grid-container">
    <table class="ms-grid-content" v-columns-resizable>
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
        <tr v-for="(item, index) in listStore" :key="index">
          <td>{{item.storeCode}}</td>
          <td>{{item.storeName}}</td>
          <td>{{item.address}}</td>
          <td>{{item.phoneNumber}}</td>
          <td>{{item.status | formatStatus}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'msGrid',
  data () {
    return {
      listStore: [] // biến lưu danh sách các cửa hàng
    }
  },
  mounted () {
    this.axios.get('Stores?pageIndex=1&pageSize=30').then(response => {
      this.listStore = response.data.data
    })
  }
}
</script>
<style lang="scss" scope>
@import "../../scss/common.scss";
@import "../../scss/msGrid.scss";
</style>
