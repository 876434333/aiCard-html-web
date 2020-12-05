<template>
  <div class="block">
    <div class="block-header">
      账号信息
    </div>
    <div class="block-body">
      <Form :model="entity"
            :rules="rules"
            ref="formAccount"
            :label-width="120">
        <FormItem label="账号" prop="login">
          <Input placeholder="请输入至少16位字符或数字"
                 v-model.trim="entity.login"
                 v-if="!entity.id" />
          <Input v-model.trim="entity.login"
                 v-if="entity.id"
                 :disabled="true"
                 readonly />
        </FormItem>
        <FormItem label="初始密码" prop="password" v-if="!entity.id">
          <Input placeholder="至少6位字符或数字"
                 type="password"
                 v-model.trim="entity.password" />
        </FormItem>
      </Form>
    </div>
    <div class="block-header">
      基本信息
    </div>
    <div class="block-body">
      <Form :model="entity"
            :rules="rules"
            ref="formBase"
            :label-width="120">
        <FormItem label="编号" v-if="entity.id">
          <span>{{entity.id}}</span>
        </FormItem>
        <FormItem label="企业名称" prop="name">
          <Input v-model.trim="entity.name"
                 :maxlength="32" />
        </FormItem>
        <FormItem label="LOGO" prop="headIcon">
          <vma-image-upload v-model="logoUrl"
                            @model="changeLogo" />
        </FormItem>
        <FormItem label="联系电话" prop="phone">
          <Input v-model.trim="entity.phone" />
        </FormItem>
        <FormItem label="选择模板" prop="templateId">
          <enterprise-select v-model="entity.templateId"
                             @input="changeTemplateId"
                             ref="templateSlelect" />
        </FormItem>
        <FormItem label="名片" prop="moneyInit" v-if="!entity.id">
          <InputNumber v-model.trim="entity.moneyInit"
                      :min="0"
                      :step="1"
                      :precision="0" />
          <span>张</span>
        </FormItem>
        <FormItem label="到期时间" prop="expireTime">
          <DatePicker v-model="expireDate"
                      type="date"
                      format="yyyy-MM-dd"
                      :disabled="true"
                      readonly ></DatePicker>
        </FormItem>
        <FormItem label="地址">
          <region-cascader v-model="region"
                            @on-change="changeAddress" />
        </FormItem>
        <FormItem label="详细地址">
          <Input v-model.trim="entity.address"
                 :maxlength="128" />
        </FormItem>
        <FormItem label="备注">
          <Input v-model.trim="entity.remark"
                 type="textarea"
                 :autosize="{minRows: 8,maxRows: 8}"
                 :maxlength="200" />
        </FormItem>
      </Form>
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
import EnterpriseSelect from './components/form/enterpriseSelect.vue'
import {RegionCascader} from '@/components/packages/cascader'
import enterpriseApi from '@/api/pms/enterprise'
import { watchDateToTimestamp, msToDate } from '@/utils'
import { accountValidator, passwordValidator, mobileOrTelphoneValidator } from '@/assets/js/asyncValidator/validators/'

export default {
  mixins: [formMixin],
  components: {
    EnterpriseSelect,
    RegionCascader
  },
  data() {
    // 验证手机号码
    let validateMobile = mobileOrTelphoneValidator
    let validateAccount = accountValidator
    let validatePassword = passwordValidator
    return {
      region: [
        '',
        '',
        ''
      ],
      logoUrl: null,
      expireDate: '',
      entity: {
        address: null,
        headIcon: null,
        id: null,
        id2: null,
        login: null,
        name: null,
        password: null,
        moneyInit: null,
        phone: null,
        templateId: null,
        provinceCode: null,
        cityCode: null,
        areaCode: null,
        remark: null,
        expireTime: null
      },
      rules: {
        login: [
          {required: true, message: '请输入账户', trigger: 'blur'},
          {validator: validateAccount}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {validator: validatePassword}
        ],
        name: [
          {required: true, message: '请输入企业名称', trigger: 'blur'}
        ],
        headIcon: [
          {required: true, message: '请选择图片', trigger: 'change'}
        ],
        phone: [
          {required: true, message: '请输入手机号码', trigger: 'blur'},
          {validator: validateMobile, trigger: 'blur'}
        ],
        templateId: [
          {required: true, message: '请选择模板', trigger: 'change', type: 'number'}
        ],
        moneyInit: [
          { required: true, type: 'number', message: '请输入名片数量', trigger: 'change' },
          {type: 'number', message: '请输入数字', trigger: 'blur'}
        ],
        expireTime: [
          { required: true, type: 'number', message: '请选择时间', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    // 监听时间更改
    this.$watch('expireDate', (n) => {
      if (typeof n === 'object') {
        let watchD = watchDateToTimestamp(() => this.entity, 'expireTime')
        watchD(n)
      }
    })
  },
  methods: {
    // 获取企业详情
    getApi() {
      return enterpriseApi
    },
    afterEntity(entity) {
      if (entity.id) {
        this.getApi().getEnterpriseDetail(entity.id).then(data => {
          this.entity = Object.assign({}, this.entity, data)
          let provinceCode, cityCode, areaCode
          if (typeof data.provinceCode === 'number') {
            provinceCode = data.provinceCode.toString()
          } else {
            provinceCode = data.provinceCode
          }
          if (typeof data.cityCode === 'number') {
            cityCode = data.cityCode.toString()
          } else {
            cityCode = data.cityCode
          }
          if (typeof data.areaCode === 'number') {
            areaCode = data.areaCode.toString()
          } else {
            areaCode = data.areaCode
          }
          this.region = [
            provinceCode,
            cityCode,
            areaCode
          ]
          this.logoUrl = data.headIcon
          this.expireDate = data.expireTime ? msToDate(data.expireTime, 'yyyy-MM-dd') : ''
        })
      } else {
        // 默认一年后
        let timestampNow = new Date()
        let end = timestampNow.getTime() + 3600 * 24 * 365 * 1000
        this.expireDate = msToDate(end, 'yyyy-MM-dd')
      }
    },
    submit() {
      // 表单验证
      this.$refs.formAccount.validate().then(validAccount => {
        this.$refs.formBase.validate().then(validBase => {
          if (validAccount && validBase && this.beforeSubmit(this.entity) !== false) {
            let entity = this.entity
            let params = {
              address: entity.address,
              headIcon: entity.headIcon,
              id: entity.id,
              id2: entity.id2,
              login: entity.login,
              name: entity.name,
              password: entity.password,
              moneyInit: entity.moneyInit,
              phone: entity.phone,
              templateId: entity.templateId,
              provinceCode: entity.provinceCode,
              cityCode: entity.cityCode,
              areaCode: entity.areaCode,
              remark: entity.remark,
              expireTime: entity.expireTime
            }
            if (this.entity.id) {
              // 编辑
              this.getApi().updateEnterprise(params).then(data => {
                this.success('修改成功')
                this.$emit('after-submit', data, this.entity)
              })
            } else {
              // 新增
              this.getApi().newEnterprise(params).then(data => {
                this.success('添加成功')
                this.$emit('after-submit', data, this.entity)
              })
            }
          }
        })
      })
    },
    cancel() {
      if (this.beforeCancel() !== false) {
        this.$emit('cancel')
      }
    },
    // 更改模板类型
    changeTemplateId(templateId) {
      this.entity.templateId = parseInt(templateId)
    },
    changeAddress(value, sData) {
      this.entity.provinceCode = value[0]
      this.entity.cityCode = value[1]
      this.entity.areaCode = value[2]
    },
    // 更改logo
    changeLogo() {
      this.entity.headIcon = this.logoUrl
    }
  }
}
</script>
