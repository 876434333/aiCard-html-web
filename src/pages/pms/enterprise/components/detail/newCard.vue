<template>
  <div>
    <Modal title="增加名片"
           v-model="show"
           @on-visible-change="cancel">
      <Form :model="entity"
            :rules="rules"
            ref="form"
            :label-width="100">
        <FormItem label="增加名片" prop="carNum">
          <InputNumber v-model="entity.carNum"
                 :min="1"
                 :step="1"
                 :precision="0" />
          <span>张</span>
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
import enterpriseApi from '@/api/pms/enterprise'

export default {
  mixins: [formMixin],
  data() {
    return {
      show: true,
      entity: {
        carNum: null,
        id: ''
      },
      rules: {
        carNum: [
          { required: true, type: 'number', message: '请输入名片数量', trigger: 'blur' }
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
            enterpriseApi.addCard(entity).then(data => {
              this.success('添加成功')
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
