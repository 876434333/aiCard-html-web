<template>
  <div>
    <Modal title="重置密码"
           v-model="show"
           @on-visible-change="cancel">
      <Form :model="entity"
            :rules="rules"
            ref="form"
            :label-width="100">
        <FormItem label="新密码" prop="password">
          <Input v-model="entity.password" type="password" />
        </FormItem>
        <FormItem label="再次输入" prop="rePassword">
          <Input v-model="entity.rePassword" type="password" />
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
import { passwordValidator } from '@/assets/js/asyncValidator/validators/'

export default {
  mixins: [formMixin],
  data() {
    let validatePassword = passwordValidator
    let validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请再次输入密码'))
      } else if (value !== this.$refs.form.model.password) {
        return callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    return {
      show: true,
      entity: {
        password: null,
        id: '',
        rePassword: null
      },
      rules: {
        password: [
          {required: true, message: '请输入新密码', trigger: 'blur'},
          {validator: validatePassword}
        ],
        rePassword: [
          {required: true, message: '请输入新密码', trigger: 'blur'},
          {validator: validatePassCheck}
        ]
      }
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate().then(valid => {
        if (valid) {
          let entity = {
            password: this.entity.password,
            id: this.entity.id
          }
          if (this.beforeSubmit(entity) !== false) {
            enterpriseApi.updatePassword(entity).then(() => {
              this.success('修改成功')
              this.$emit('after-submit')
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
