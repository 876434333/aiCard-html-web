<template>
  <Form :label-width="120"
        :model="entity"
        :rules="rules"
        ref="form">
    <FormItem label="原密码"
              prop="oldPwd">
      <Input placeholder="请输入原密码"
             type="password"
             v-model="entity.oldPwd"
             :maxlength="16" />
    </FormItem>
    <FormItem label="新密码"
              prop="newPwd">
      <Input placeholder="请输入新密码"
             type="password"
             v-model="entity.newPwd"
             :maxlength="16" />
    </FormItem>
    <FormItem label="确认新密码"
              prop="reNewPwd">
      <Input placeholder="请再次输入新密码"
             type="password"
             v-model="entity.reNewPwd"
             :maxlength="16" />
    </FormItem>

    <FormItem>
      <Button type="ghost"
              style="margin-right: 8px"
              @click="cancel">取消</Button>
      <Button type="primary"
              @click="submit">确定</Button>
    </FormItem>
  </Form>
</template>

<script>
import { accountApi } from '@/api/common'
import { passwordValidator } from '@/assets/js/asyncValidator/validators'

export default {
  data() {
    const rePassWordValidator = (rule, value, callback) => {
      let errors = []
      if (value && value !== this.entity.newPwd) {
        errors.push('两次密码不一致')
      }
      callback(errors)
    }
    return {
      entity: {
        oldPwd: '',
        newPwd: '',
        reNewPwd: ''
      },
      rules: {
        oldPwd: [
          { required: true, message: '请输入原密码' }
        ],
        newPwd: [
          { required: true, message: '请输入新密码' },
          { validator: passwordValidator }
        ],
        reNewPwd: [
          { required: true, message: '请再次输入新密码' },
          { validator: rePassWordValidator }
        ]
      }
    }
  },
  methods: {
    cancel() {
      this.$emit('on-cancel')
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          accountApi.modifyPWD(this.entity).then(() => {
            this.success('修改密码成功')
            this.$emit('after-submit')
          })
        }
      })
    }
  }
}
</script>
