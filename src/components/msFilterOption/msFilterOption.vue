<template>
  <div class="ms-option-filter">
    <div class="btn-option">
      *
    </div>
    <div class="list-option">
      <div class="item-option" v-for="(item, index) in listOption" :key="index">
        <div class="key-option">{{ item.key }} :</div>
        <div class="text-option">{{ item.text }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'msFilterOption',
  data () {
    return {
      listOption: [
        { key: '*', text: 'Chứa', value: 1 },
        { key: '=', text: 'Bằng', value: 2 },
        { key: '+', text: 'Bắt đầu bằng', value: 3 },
        { key: '-', text: 'Kết thúc bằng', value: 4 },
        { key: '!', text: 'Không chứa', value: 5 }
      ],
      optionSelected:
    }
  }
}
</script>
<style lang="scss">
@import "../../scss/msFilterOption.scss";
</style>
