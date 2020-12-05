<template>
  <div class="panel" style="height: 100%;">
    <Row type="flex"
         justify="center"
         style="margin-top: 100px;">
      <i-col>
        <Form :model="price"
              ref="form"
              :rules="rules"
              :label-width="120">
          <FormItem label="贴牌商" prop="oemRate">
            <span>1迹点=</span>
            <InputNumber v-model="price.oemRate"
                         :min="0.001" />
            <span>元</span>
          </FormItem>
          <FormItem label="地区总代理" prop="regionalRate">
            <span>1迹点=</span>
            <InputNumber v-model="price.regionalRate"
                         :min="0.001" />
            <span>元</span>
          </FormItem>
          <FormItem label="代理商" prop="agentRate">
            <span>1迹点=</span>
            <InputNumber v-model="price.agentRate"
                         :min="0.001" />
            <span>元</span>
          </FormItem>
          <FormItem>
            <Button type="primary"
                    @click="submitPrice">确定</Button>
          </FormItem>
        </Form>
      </i-col>
    </Row>
  </div>
</template>

<script>
import priceApi from '@/api/sms/priceSetting'

export default {
  data() {
    return {
      price: {
        id: null,
        oemRate: null,
        regionalRate: null,
        agentRate: null
      },
      rules: {
        oemRate: [
          {required: true, type: 'number', message: '请输入金额', trigger: 'blur'}
        ],
        regionalRate: [
          {required: true, type: 'number', message: '请输入金额', trigger: 'blur'}
        ],
        agentRate: [
          {required: true, type: 'number', message: '请输入金额', trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    this.getConfig()
  },
  methods: {
    getConfig() {
      priceApi.getPriceConfig().then(data => {
        this.price = data
      })
    },
    submitPrice() {
      this.checkInput(() => {
        // 提交服务器
        priceApi.updatePriceConfig(this.price).then(data => {
          this.success('修改成功')
        })
      })
    },
    checkInput(cb) {
      this.$refs.form.validate().then((valid) => {
        if (valid) {
          let content = '确认要保存当前价格设置？'
          this.$Modal.confirm({
            title: '确认保存',
            content,
            onOk: (action, instance) => {
              cb && cb()
            }
          })
        }
      })
    }
  }
}
</script>

<style></style>
