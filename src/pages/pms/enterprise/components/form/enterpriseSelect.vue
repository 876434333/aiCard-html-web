<template>
  <span>
    <Select v-model="computedValue"
            v-bind="options"
            :placeholder="placeholder"
            :clearable="clearable"
            :filterable="filterable"
            @on-change="change"
            v-show="list.length">
      <Option v-for="v in list"
              :value="v.id"
              :key="v.id">{{ v.label }}</Option>
    </Select>
    <p class="nodata"
       v-show="list.length === 0">{{nodataText}}</p>
  </span>
</template>
<script>
import selectMixin from './selectMixin'
import enterpriseApi from '@/api/pms/enterprise'

export default {
  mixins: [selectMixin],
  methods: {
    getData() {
      return enterpriseApi.getTemplateList().then(data => {
        return data.map(v => {
          return {
            id: v.code,
            label: `${v.templateName}`,
            data
          }
        })
      })
    }
  }
}
</script>
