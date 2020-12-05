<template>
  <Tabs v-model="tabName">
    <TabPane label="基础信息"
             name="info">
      <info-tab-panel :data="entity"
                      v-if="tabName === 'info'" />
    </TabPane>
  </Tabs>
</template>
<script>
import InfoTabPanel from './components/infoTabPane.vue'

export default {
  props: {
    id: ''
  },
  components: {
    InfoTabPanel
  },
  watch: {
    'id' () {
      this.get()
    }
  },
  created() {
    this.get()
  },
  data() {
    return {
      tabName: 'info',
      entity: {
        id: ''
      }
    }
  },
  methods: {
    get() {
      let id = this.id
      this.entity = Object.assign({}, this.entity, {'id': id})
    }
  }
}
</script>
