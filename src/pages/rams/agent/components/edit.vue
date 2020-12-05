<template>
  <div>
    <Modal v-model="visible"
           :mask-closable="false"
           :title="title">
      <Form class="panel-form"
            ref="form"
            :model="detail"
            :rules="rules"
            :label-width="120"
            >
        <FormItem label="账号：" prop="login"><i-input v-model.trim="detail.login" placeholder="请输入账号" type="text" :disabled="!!id"></i-input></FormItem>
        <FormItem label="初始密码：" prop="password" v-if="!id" key="password"><i-input v-model.trim="detail.password" placeholder="请输入登录密码" type="password"></i-input></FormItem>
        <FormItem label="编号：" v-if="id" key="enterpriseNo">{{detail.enterpriseNo}}</FormItem>
        <FormItem label="代理商名称：" prop="name"><i-input v-model.trim="detail.name" placeholder="请输入贴牌商名称" type="text"></i-input></FormItem>
        <FormItem label="LOGO：" prop="headIcon">
          <vma-image-upload v-model="detail.headIcon"></vma-image-upload>
        </FormItem>
        <FormItem label="联系电话：" prop="phone"><i-input v-model.trim="detail.phone" placeholder="请输入联系电话" type="text"></i-input></FormItem>
        <FormItem label="迹点：" prop="moneyInit"><InputNumber v-model="detail.moneyInit" :disabled="!!id" :min="0" class="wp100"></InputNumber></FormItem>
        <FormItem label="地址：">
           <Row
              class="">
              <i-col span="8">
                <FormItem :label-width="0">
                  <Select v-model="detail.provinceCode" style="100%" >
                    <Option v-for="(item,i) in provinceList" :value="item.code" :key="i">{{ item.name }}</Option>
                  </Select>
                </FormItem>
              </i-col>
              <i-col span="8">
                <FormItem :label-width="0">
                  <Select v-model="detail.cityCode" style="100%" :disabled="!cityList.length">
                    <Option v-for="item in cityList" :value="item.code" :key="item.code">{{ item.name }}</Option>
                  </Select>
                </FormItem>
              </i-col>
              <i-col span="8">
                <FormItem :label-width="0">
                  <Select v-model="detail.areaCode" style="100%" :disabled="!areaList.length">
                    <Option v-for="item in areaList" :value="item.code" :key="item.code">{{ item.name }}</Option>
                  </Select>
                </FormItem>
              </i-col>
           </Row>
        </FormItem>
        <FormItem label="详细地址：" prop="address"><i-input v-model.trim="detail.address" placeholder="请输入详细地址" type="text"></i-input></FormItem>
        <FormItem label="备注信息：" prop="remark"><i-input v-model.trim="detail.remark" placeholder="请输入备注信息" type="textarea"></i-input></FormItem>
      </Form>
      <div slot="footer">
        <Button @click="handlerCancel">取消</Button>
        <Button type="primary" @click="handlerSave">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { areaApi } from '@/api/common'
import { agentApi } from '@/api/rams'
import { INIT_DETAIL } from '../src/const.js'
import { accountValidator, passwordValidator, mobileOrTelphoneValidator } from '@/assets/js/asyncValidator/validators'
export default {
  props: {
    value: false,
    id: ''
  },
  data() {
    return {
      detail: {
        ...INIT_DETAIL
      },
      rules: {
        headIcon: [
          { required: true, message: '请添加logo', trigger: 'none' }
        ],
        login: [
          { required: true, message: '请输入账号' },
          { validator: accountValidator }
        ],
        moneyInit: [
          { required: true, message: '请输入迹点' }
        ],
        name: [
          { required: true, message: '请输入名称' },
          { max: 32, message: '不能超过32位字符' }
        ],
        password: [
          { required: true, message: '请输入初始密码' },
          { validator: passwordValidator }
        ],
        phone: [
          { required: true, message: '请输入联系号码' },
          { validator: mobileOrTelphoneValidator }
        ],
        provinceCode: [
          { required: true, message: '请选择省份' }
        ],
        address: [
          { max: 128, message: '不能超过128位字符' }
        ],
        remark: [
          { max: 200, message: '不能超过200位字符' }
        ]
      },
      provinceList: [],
      cityList: [],
      areaList: [],
      isLoadSet: false
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
      return this.id ? '编辑' : '添加'
    }
  },
  watch: {
    value(n) {
      if (n) {
        if (this.id) {
          this.loadDetail()
        }
      } else {
        this.detail = {...INIT_DETAIL}
        this.$refs.form.resetFields()
      }
    },
    'detail.provinceCode': {
      handler (n) {
        if (n) {
          this.getCityList(n)
        } else {
          this.cityList = []
        }
        if (this.isLoadSet) {
          this.$nextTick(() => { this.isLoadSet = false })
        } else {
          this.detail.cityCode = ''
        }
      },
      immediate: true
    },
    'detail.cityCode': {
      handler (n) {
        if (n) {
          this.getAreaList(n)
        } else {
          this.areaList = []
        }
        if (this.isLoadSet) {
          this.$nextTick(() => { this.isLoadSet = false })
        } else {
          this.detail.areaCode = ''
        }
      },
      immediate: true
    }
  },
  methods: {
    loadDetail () {
      if (!this.id) {
        return
      }
      agentApi.getAgentDetail(this.id).then(data => {
        this.isLoadSet = true
        this.detail = {...data}
      })
    },
    async handlerSave () {
      let _valid = false
      this.$refs.form.validate(valid => { _valid = valid })
      if (!_valid) {
        return
      }
      let {
        address,
        areaCode,
        cityCode,
        headIcon,
        login,
        moneyInit,
        name,
        phone,
        provinceCode,
        remark,

        password,
        id,
        id2
      } = this.detail
      let data = {
        address,
        areaCode,
        cityCode,
        headIcon,
        login,
        moneyInit,
        name,
        phone,
        provinceCode,
        remark
      }

      if (id) {
        data.id = id
        data.id2 = id2
        await agentApi.updateAgent(data)
      } else {
        data.password = password
        await agentApi.addAgent(data)
      }
      this.$emit('after-save')
      this.success('操作成功')
      this.handlerCancel()
    },
    handlerCancel () {
      this.visible = false
    },
    getProvinceList () {
      areaApi.getProvinceList().then(list => {
        this.provinceList = list
      })
    },
    getCityList (provinceCode) {
      areaApi.getCityList(provinceCode).then(list => {
        this.cityList = list
      })
    },
    getAreaList (cityCode) {
      areaApi.getAreaList(cityCode).then(list => {
        this.areaList = list
      })
    }
  },
  created () {
    this.getProvinceList()
  }
}
</script>

<style>
</style>
