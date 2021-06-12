import Vue from 'vue'

import msMenu from '@/layout/msMenu/msMenu.vue'
import msHeader from '@/layout/msHeader/msHeader.vue'
import msContent from '@/layout/msContent/msContent.vue'
import msCombobox from '@/components/msCombobox/msCombobox.vue'
import msToolBar from '@/components/msToolBar/msToolBar.vue'
import msGrid from '@/components/msGrid/msGrid.vue'
import msFilterOption from '@/components/msFilterOption/msFilterOption.vue'
Vue.component(msMenu.name, msMenu)
Vue.component(msHeader.name, msHeader)
Vue.component(msContent.name, msContent)
Vue.component(msCombobox.name, msCombobox)
Vue.component(msToolBar.name, msToolBar)
Vue.component(msGrid.name, msGrid)
Vue.component(msFilterOption.name, msFilterOption)
