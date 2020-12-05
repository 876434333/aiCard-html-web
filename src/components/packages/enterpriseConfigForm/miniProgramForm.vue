<template>
  <div>
    <Form :model="entity"
          ref="formMp"
          :rules="rules"
          :label-width="120">
      <FormItem label="CropID" prop="corpId">
        <Input v-if="edit" v-model.trim="entity.corpId" @on-change="inputForm" />
        <Input v-else v-model.trim="entity.corpId" readonly />
      </FormItem>
      <FormItem label="通讯录秘钥" prop="contactsSecret">
        <Input v-if="edit" v-model.trim="entity.contactsSecret" @on-change="inputForm" />
        <Input v-else v-model.trim="entity.contactsSecret" readonly />
      </FormItem>
      <FormItem label="Boss雷达秘钥" prop="bossSecret">
        <Input v-if="edit" v-model.trim="entity.bossSecret" @on-change="inputForm" />
        <Input v-else v-model.trim="entity.bossSecret" readonly />
      </FormItem>
      <FormItem label="ai雷达秘钥" prop="aiSecret">
        <Input v-if="edit" v-model.trim="entity.aiSecret" @on-change="inputForm" />
        <Input v-else v-model.trim="entity.aiSecret" readonly />
      </FormItem>
      <FormItem label="boss雷达应用id" prop="bossAgentId">
        <Input v-if="edit" v-model.trim="entity.bossAgentId" @on-change="inputForm" />
        <Input v-else v-model.trim="entity.bossAgentId" readonly />
      </FormItem>
      <FormItem label="ai雷达应用id" prop="aiAgentId">
        <Input v-if="edit" v-model.trim="entity.aiAgentId" @on-change="inputForm" />
        <Input v-else v-model.trim="entity.aiAgentId" readonly />
      </FormItem>
      <FormItem label="小程序id" prop="appId">
        <Input v-if="edit" v-model.trim="entity.appId" @on-change="inputForm" />
        <Input v-else v-model.trim="entity.appId" readonly />
      </FormItem>
      <FormItem label="小程序秘钥" prop="secret">
        <Input v-if="edit" v-model.trim="entity.secret" @on-change="inputForm" />
        <Input v-else v-model.trim="entity.secret" readonly />
      </FormItem>
      <FormItem label="用户商id" prop="mchId">
        <Input v-if="edit" v-model.trim="entity.mchId" @on-change="inputForm" />
        <Input v-else v-model.trim="entity.mchId" readonly />
      </FormItem>
      <FormItem label="支付秘钥" prop="payKey">
        <Input v-if="edit" v-model.trim="entity.payKey" @on-change="inputForm" />
        <Input v-else v-model.trim="entity.payKey" readonly />
      </FormItem>
      <FormItem label="留言回复通知" prop="messageTemplate">
        <Input v-if="edit" v-model.trim="entity.messageTemplate" @on-change="inputForm" />
        <Input v-else v-model.trim="entity.messageTemplate" readonly />
      </FormItem>
      <FormItem label="支付成功通知" prop="payTemplate">
        <Input v-if="edit" v-model.trim="entity.payTemplate" @on-change="inputForm" />
        <Input v-else v-model.trim="entity.payTemplate" readonly />
      </FormItem>
    </Form>
  </div>
</template>

<script>
import {SMS, OMS, RAMS, PMS} from '@/constants'
import smsApi from '@/api/sms/enterprise'
import pmsApi from '@/api/pms/enterprise'
import ramsApi from '@/api/rams/enterprise'
import omsApi from '@/api/oms/enterprise'
import { formMixin } from '@/mixins'

export default {
  mixins: [formMixin],
  props: {
    edit: {
      type: Boolean,
      default () {
        return false
      }
    },
    getAndShow: {
      type: Boolean,
      default () {
        return false
      }
    },
    ruleFlag: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data() {
    return {
      entity: {
        id: ''
      },
      rules: {
        corpId: [
          {required: true, message: '输入不能为空', trigger: 'blur'}
        ],
        contactsSecret: [
          {required: true, message: '输入不能为空', trigger: 'blur'}
        ],
        bossSecret: [
          {required: true, message: '输入不能为空', trigger: 'blur'}
        ],
        aiSecret: [
          {required: true, message: '输入不能为空', trigger: 'blur'}
        ],
        bossAgentId: [
          {required: true, message: '输入不能为空', trigger: 'blur'}
        ],
        aiAgentId: [
          {required: true, message: '输入不能为空', trigger: 'blur'}
        ],
        appId: [
          {required: true, message: '输入不能为空', trigger: 'blur'}
        ],
        secret: [
          {required: true, message: '输入不能为空', trigger: 'blur'}
        ],
        mchId: [
          {required: true, message: '输入不能为空', trigger: 'blur'}
        ],
        payKey: [
          {required: true, message: '输入不能为空', trigger: 'blur'}
        ],
        messageTemplate: [
          {required: true, message: '输入不能为空', trigger: 'blur'}
        ],
        payTemplate: [
          {required: true, message: '输入不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  watch: {
    'data' () {
      this.setRule()
    }
  },
  created() {
    this.setRule()
  },
  destroyed() {
    this.$off('checkMpForm')
  },
  methods: {
    setRule() {
      if (this.$refs['formMp']) {
        this.$refs['formMp'].resetFields()
      }
      if (this.edit) {
        this.$off('checkMpForm')
        this.$on('checkMpForm', cb => {
          this.checkForm(cb)
        })
      } else {
        this.rules = {}
      }
      this.get()
    },
    get() {
      if (this.getAndShow) {
        // 只显示详情
        this.getAndShowDetail(this.data.id, this.data.type).then(() => {
          this.inputForm()
        })
      } else {
        // 复制传进来的数据
        this.entity = Object.assign({}, this.entity, this.data)
      }
    },
    inputForm() {
      this.$emit('change', this.entity)
    },
    getAndShowDetail(id, type) {
      return this.getDetail(id, type).then(data => {
        this.entity = data || {}
        return this.entity
      })
    },
    getDetail(id, type) {
      switch (type) {
        case SMS:
          return smsApi.getEnterpriseApplyDetail(id)
        case OMS:
          return omsApi.getEnterpriseDetail(id)
        case RAMS:
          return ramsApi.getEnterpriseDetail(id)
        case PMS:
          return pmsApi.getEnterpriseMp(id)
      }
    },
    checkForm(cb) {
      this.$refs['formMp'].validate().then(validMp => {
        if (validMp && cb) {
          cb(this.entity)
        }
      })
    }
  }
}
</script>
