<template>
  <Cascader v-model="computedValue"
            v-bind="options"
            :data="data"
            :load-data="loadData"
            @on-visible-change="onVisibleChange"
            @on-change="onChange" />
</template>

<script>
import {
  areaApi
} from '@/api/common'
import mixin from './mixin'

export default {
  mixins: [mixin],
  methods: {
    getData() {
      areaApi.getProvinceList().then(page => {
        this.data = page.map(v => {
          v.value = v.code
          v.label = v.name
          v.loading = false
          v.type = 'province'
          v.children = []
          return v
        })
        this.initial = true
      })
    },
    loadData(item, callback) {
      item.loading = true
      switch (item.type) {
        case 'province':
          areaApi.getCityList(item.value).then(page => {
            item.children = page.map(v => {
              v.value = v.code
              v.label = v.name
              v.loading = false
              v.type = 'city'
              v.children = []
              return v
            })
          }).finally(() => {
            item.loading = false
            callback()
          })
          break
        case 'city':
          areaApi.getAreaList(item.value).then(page => {
            item.children = page.map(v => {
              v.value = v.code
              v.label = v.name
              v.type = 'area'
              return v
            })
          }).finally(() => {
            item.loading = false
            callback()
          })
          break
      }
    }
  }
}
</script>
