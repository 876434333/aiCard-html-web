<template>
  <div>
    <div>
      <mp-info-tab-pane :data="entity"
                       :edit="true"
                       ref="mpConfig"
                       :ruleFlag="true" />
    </div>
    <div class="block-body">
      <Form :label-width="120">
        <FormItem>
          <Button type="ghost"
                  style="margin-right: 8px"
                  @click="cancel">取消</Button>
          <Button type="primary"
                  @click="submit">确定</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import { formMixin } from '@/mixins'
import MpInfoTabPane from '@/components/packages/enterpriseConfigForm/miniProgramForm.vue'
import enterpriseApi from '@/api/pms/enterprise'

export default {
  mixins: [formMixin],
  components: {
    mpInfoTabPane: MpInfoTabPane
  },
  methods: {
    getApi() {
      return enterpriseApi
    },
    submit() {
      this.$refs.mpConfig.$emit('checkMpForm', (entity) => {
        let params = Object.assign({}, this.entity, entity)
        if (this.beforeSubmit(params) !== false) {
          this.getApi().updateConfig(params).then(data => {
            this.success('修改成功')
            this.$emit('after-submit', data, entity)
          })
        }
      })
    },
    cancel() {
      if (this.beforeCancel() !== false) {
        this.$emit('on-cancel')
      }
    }
  }
}
</script>
