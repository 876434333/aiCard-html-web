<template>
  <div>
    <Modal title="重置密码" :value="value" @on-cancel="doCancel">
      <div class="plr30 pt15">
      <i-form :model="data" ref="form" :rules="rules" :label-width="80">
        <FormItem label="重置密码" prop="password">
          <i-input v-model="data.password" placeholder="请输入新密码"></i-input>
        </FormItem>
      </i-form>
      </div>
      <div slot="footer">
        <i-button type="primary" size="large" @click="confirmOk">确认</i-button>
        <i-button type="default" size="large" @click="doCancel">取消</i-button>
      </div>
    </Modal>
  </div>
</template>

<script>
import enterpriseApi from '@/api/common/enterpriseApi'
export default {
  data() {
    return {
      data: {
        password: '123456'
      },
      rules: {
        password: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          },
          {
            min: 6,
            message: '最小6位',
            trigger: 'blur'
          },
          {
            max: 20,
            message: '最大20位',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  },
  watch: {
    value(val) {
      if (!val) {
        this.$refs.form.resetFields()
      }
    }
  },
  methods: {
    doCancel() {
      this.$emit('input', false)
    },
    async confirmOk() {
      let _valid = false
      this.$refs.form.validate(valid => {
        _valid = valid
      })
      if (!_valid) {
        return
      }

      await enterpriseApi.updatePassword({
        id: this.id,
        password: this.data.password
      })
      this.success('重置成功')
      this.$emit('after-save')
      this.doCancel()
    }
  }
}
</script>
