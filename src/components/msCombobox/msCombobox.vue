<template>
  <div
    :class="
      isWarning ? 'combobox-container border-warning' : 'combobox-container'
    "
    v-on:keyup.40="arrowDown()"
    v-on:keyup.38="arrowUp()"
    class="ms-combobox"
    v-on:keyup.13="enter"
  >
  {{testValue}}
    <input
      type="text"
      v-model="keyFilter"
      v-on:keyup="checkValue()"
      ref="inputcombobox"
      class="ms-input-cbb"
      :placeholder="placeholder"
    />
    <div class="select" v-if="isActived">
      <div
        class="option"
        v-for="(item, index) in listItemInFilter"
        :key="index"
        :class="item.value == itemSelected.value ? 'isselected' : ''"
        @click="enter(index, item.value, item.text)"
      >
        {{ item.text }}
      </div>
    </div>
    <div
      :class="isFocus ? 'dropdow-button border-forcus ' : 'dropdow-button'"
      @click="onclickComboboxButton()"
    >
      <span class="dropdown-icon"></span>
    </div>
  </div>
</template>
<script>
export default {

  name: 'msCombobox',
  data () {
    return {
      itemSelected: { value: 0, text: 'demo' },
      isActived: false,
      keySelected: '',
      indexHover: 0,
      keyFilter: '',
      isFocus: false,
      indexSelected: 0,
      isWarning: false,
      listItemInFilter: [],
      itemId: '',
      demo: []
    }
  },
  methods: {
    onclickComboboxButton () {
      this.listItemInFilter = []
      this.keyFilter = ''
      this.isActived = !this.isActived
      this.listItemInFilter = this.items
    },
    checkValue () {
      this.listItemInFilter = []
      this.keyFilter =
        this.keyFilter.charAt(0).toUpperCase() + this.keyFilter.slice(1)
      this.items.forEach(element => {
        if (element.text.indexOf(this.keyFilter) !== -1) {
          // console.log('vao roi ne')
          this.listItemInFilter.push({
            value: element.value,
            text: element.text
          })
        }
      })
      if (this.listItemInFilter.length > 0) {
        this.isActived = true
        this.isWarning = false
      } else {
        this.isWarning = true
      }
    },
    arrowDown () {
      if (this.indexHover < this.listItemInFilter.length - 1) {
        this.indexHover++
      }
    },
    arrowUp () {
      if (this.indexHover > 0) {
        this.indexHover--
      }
    },
    loop () {
      this.items.forEach(e => {
        if (e.value === this.itemId) { this.keyFilter = e.text }
      })
    },
    setValue (val) {
      console.log(this.demo)
      this.itemId = val
      this.loop()
      this.items.forEach(e => {
        if (e.value === this.itemId) { this.keyFilter = e.text }
      })
    },
    enter (index, val, text) {
      if (index != null) {
        this.itemSelected = this.listItemInFilter[index]
        this.indexHover = index
        this.isActived = false
        this.setIndexSelected()
      } else {
        if (this.itemsInFilter[this.indexHover] != null) {
          this.itemSelected = this.listItemInFilter[this.indexHover]
          this.isActived = false
          this.setIndexSelected()
        }
      }
      this.itemSelected.value = val
      this.itemSelected.text = text
      this.keyFilter = this.itemSelected.text
      this.$emit('changeValue', this.itemSelected.value)
    },
    setIndexSelected () {
      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i] === this.itemSelected) {
          this.indexSelected = i
          return
        }
      }
    }
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: ''
    },
    testValue: {
      type: String
    }
  },

  watch: {
    keySelected: function () {
      this.keyFilter = this.keySelected
      if (this.itemsInFilter.length === 0) this.isActived = false
      if (this.keySelected === '') this.isActived = false
      if (this.keySelected !== this.itemSelected.text) {
        this.itemSelected = { value: -1, text: '' }
        this.indexSelected = 0
        this.indexHover = 0
      }
    },
    indexHover: function () {
      this.indexSelected = this.indexHover
    }
  }
}
</script>
<style lang="sass" scoped>
@import '../../scss/msCombobox.scss'
</style>
