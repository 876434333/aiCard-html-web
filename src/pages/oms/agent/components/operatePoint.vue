<template>
  <div>
    <Modal v-model="visible"
           :title="title">
      <Form class="panel-form"
            ref="form"
            :model="detail"
            :rules="rules"
            :label-width="120"
            >
        <FormItem label="分配迹点" prop="operationPoint">
          <InputNumber :min="0" v-model="detail.operationPoint"></InputNumber>
        </FormItem>
        <FormItem label="原因" prop="content" v-if="type === 2 " :key="2">
          <i-input v-model="detail.content" type="textarea" placeholder="请输入原因"></i-input>
        </FormItem>
        <FormItem label="原因" v-else :key="1">
          <i-input v-model="detail.content" type="textarea" placeholder="请输入原因"></i-input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="handlerCancel">取消</Button>
        <Button type="primary" @click="handlerSave">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { pointApi } from '@/api/oms'
const DETAIL = {
  content: '',
  operationPoint: 0
}
export default {
  props: {
    value: false,
    id: '',
    type: {
      type: Number,
      require: true,
      default: 1
    }
  },
  data() {
    return {
      detail: {...DETAIL},
      rules: {
        content: [
          { required: true, message: '请输入原因' }
        ]
      }
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
    title () {
      return this.type === 1 ? '分配迹点' : '扣迹点'
    }
  },
  watch: {
    visible (n) {
      if (!n) {
        this.detail = {...DETAIL}
        this.$refs.form.resetFields()
      }
    }
  },
  methods: {
    handlerSave () {
      let data = {}
      let _valid = false

      if (!this.id) {
        return
      }

      this.$refs.form.validate(valid => { _valid = valid })
      if (!_valid) {
        return
      }

      let { content, operationPoint } = this.detail
      data = {operationPoint, content, customId: this.id, operation: this.type}

      // if (this.type === 2) {
      //   data.content = content
      // }
      pointApi.operate(data).then(() => {
        this.success('操作成功')
        this.$emit('after-save')
        this.handlerCancel()
      })
    },
    handlerCancel () {
      this.visible = false
    }
  },
  create () {
  }
}
</script>

<style>
</style>
