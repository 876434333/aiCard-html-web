<template>
  <div>
    <Modal v-model="visible"
           title="权限设置">
      <p class="text-c">已选择 {{selectedCount}} 个权限</p>
      <div class="tree">
        <Tree :data="treeData"
              ref="tree"
              children-key="child"
              expanded
              show-checkbox></Tree>
      </div>
      <div slot="footer">
        <i-button @click="handlerCancel">取消</i-button>
        <i-button type="primary" @click="handlerSave">确定</i-button>
      </div>

    </Modal>
  </div>
</template>

<script>
import { staffApi } from '@/api/common'
import { getSelectedCount, initFormatData } from '../src/func'
export default {
  props: {
    value: false,
    id: ''
  },
  data() {
    return {
      treeData: []
    }
  },
  components: {
  },
  computed: {
    visible: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    selectedCount () {
      return getSelectedCount(this.treeData)
    }
  },
  watch: {
    value (n) {
      if (n) {
        this.loadList()
      }
    }
  },
  methods: {
    loadList () {
      if (!this.id) {
        return
      }
      staffApi.getStaffGrant(this.id).then(data => {
        this.treeData = initFormatData(data)
      })
    },
    handlerCancel() {
      this.visible = false
      this.treeData = []
    },
    handlerSave() {
      let data = initFormatData(this.treeData, 2)
      staffApi.updateStaffGrant(this.id, data).then(() => {
        this.$emit('after-save')
        this.success('操作成功')
        this.handlerCancel()
      })
    }
  },
  create () {
  }
}

</script>

<style>
</style>
