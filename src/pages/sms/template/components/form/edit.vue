<template>
  <div>
    <Modal title="编辑"
           v-model="show"
           @on-visible-change="cancel">
      <Form :model="entity"
            :rules="rules"
            ref="form"
            :label-width="120">
        <FormItem label="模板名称" prop="templateName">
          <Input v-model.trim="entity.templateName" />
        </FormItem>
        <FormItem label="小程序费用" prop="smallCost">
          <InputNumber v-model="entity.smallCost"
                      :min="0.01"
                      :step="1" />
          <span>迹点</span>
        </FormItem>
        <FormItem label="名片费用" prop="cardCost">
          <InputNumber v-model="entity.cardCost"
                 :min="0.01"
                 :step="1" />
          <span>迹点 / 张</span>
        </FormItem>
      </Form>
      <div slot="footer">
          <i-button @click="cancel">取消</i-button>
          <i-button type="primary"
                    @click.native="submit">确定</i-button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { formMixin } from '@/mixins'
import templateApi from '@/api/sms/template'

export default {
  mixins: [formMixin],
  data() {
    return {
      show: true,
      entity: {
        templateName: null,
        smallCost: null,
        cardCost: null
      },
      rules: {
        templateName: [
          {required: true, type: 'string', message: '请输入名称', trigger: 'blur'}
        ],
        smallCost: [
          {required: true, type: 'number', message: '请输入费用', trigger: 'blur'}
        ],
        cardCost: [
          {required: true, type: 'number', message: '请输入费用', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate().then(valid => {
        if (valid) {
          let entity = Object.assign({}, this.entity)
          if (this.beforeSubmit(entity) !== false) {
            let params = {
              cardCost: entity.cardCost,
              id: entity.id,
              smallCost: entity.smallCost,
              templateName: entity.templateName
            }
            templateApi.updateTemplate(params).then(data => {
              this.success('保存成功')
              this.$emit('after-submit', data, entity)
            })
          }
        }
      })
    },
    cancel() {
      this.$emit('on-cancel')
    }
  }
}
</script>
