<template>
  <div>
    <vma-panel v-model="visible"
           :title="title"
           :showClose="false">
      <Form class="panel-form"
            ref="form"
            :model="detail"
            :rules="rules"
            :label-width="120"
      >
        <FormItem label="广告名称：" prop="title" class="mt-25">
          <i-input v-model.trim="detail.title" placeholder="请输入广告名称" type="text" style="width:200px"></i-input>
        </FormItem>
        <FormItem label="排序：" prop="aOrder" class="mt-25">
          <i-input v-model.trim="detail.aOrder" placeholder="请输入排序" type="text" style="width:200px"></i-input>
        </FormItem>
        <FormItem label="开始时间" prop="beginTime" class="mt-25">
          <DatePicker v-model="beginDate"
                      type="date"
                      format="yyyy-MM-dd"
          ></DatePicker>
        </FormItem>
        <FormItem label="到期时间" prop="finishTime" class="mt-25">
          <DatePicker v-model="expireDate"
                      type="date"
                      format="yyyy-MM-dd"
          ></DatePicker>
        </FormItem>
        <FormItem label="LOGO" prop="imgUrl" class="mt-25">
          <Button type="primary"
                  @click="clickSelectLogo">选择广告图片</Button> 建议尺寸：750*696
          <br/>
          <img v-if="detail.imgUrl" :src="detail.imgUrl" width="60px" height="60px" alt=" " style="margin-top: 10px">
        </FormItem>
        <FormItem label="上线/下线" prop="status" class="mt-25">
          <i-switch v-model="status" @on-change="change" />
        </FormItem>
      </Form>
      <div class="handle-edit-btn">
        <Button @click="handlerCancel">取消</Button>
        <Button type="primary" @click="handlerSave">确定</Button>
      </div>
    </vma-panel>
    <CropperImg v-model="isShowCropper"
                ref='cropperImg'
                @on-success='uploadSuccess'></CropperImg>
  </div>
</template>

<script>
import { advApi } from '@/api/ems'
import { INIT_DETAIL } from '../src/const.js'
import { msToDate } from '@/utils'
import { integerValidator } from '@/assets/js/asyncValidator/validators'
import CropperImg from './cropperImg'
export default {
  props: {
    value: false,
    id: '',
    total_num: ''
  },
  data() {
    return {
      detail: {
        ...INIT_DETAIL
      },
      status: false,
      rules: {
        aOrder: [
          { required: true, message: '请输入排序' },
          { validator: integerValidator }
        ]
      },
      expireDate: '',
      beginDate: '',
      isShowCropper: false
    }
  },
  components: {
    CropperImg
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
      return this.id ? '编辑广告信息' : '添加广告'
    }
  },
  watch: {
    value(n) {
      if (n) {
        if (this.id) {
          this.loadDetail()
        } else {
          // 默认一年后
          let timestampNow = new Date()
          let end = timestampNow.getTime() + 3600 * 24 * 2 * 1000
          let begin = timestampNow.getTime() + 3600 * 24 * 1 * 1000
          this.expireDate = msToDate(end, 'yyyy-MM-dd')
          this.beginDate = msToDate(begin, 'yyyy-MM-dd')
          this.detail.aOrder = this.total_num + 1
        }
      }

      // 默认排序
      // this.detail.aOrder = '1'
    }
  },
  methods: {
    loadDetail () {
      if (!this.id) {
        return
      }
      advApi.getAdvDetail(this.id).then(data => {
        this.detail = data
        this.beginDate = this.fmt.date(data.beginTime)
        this.expireDate = this.fmt.date(data.finishTime)
        this.logoUrl = data.imgUrl
        if (data.status === 1) {
          this.status = true
        }
      })
    },
    async handlerSave () {
      let _valid = false
      this.$refs.form.validate(valid => { _valid = valid })
      if (!_valid) {
        return
      }
      let { id, title, aOrder, beginTime, finishTime, imgUrl, status } = this.detail
      let data = { id, title, aOrder, beginTime, finishTime, imgUrl, status }
      data.beginTime = msToDate(this.beginDate, 'yyyy-MM-dd')
      data.finishTime = msToDate(this.expireDate, 'yyyy-MM-dd')
      if (this.id) {
        data.id = this.id
        await advApi.updateAdv(data)
      } else {
        await advApi.addAdv(data)
      }
      this.$emit('after-save')
      this.success('操作成功')
      this.$refs.form.resetFields()
      this.logoUrl = null
      this.status = false
      this.handlerCancel()
    },
    handlerCancel () {
      this.$refs.form.resetFields()
      this.logoUrl = null
      this.status = false
      this.visible = false
    },
    // 更改logo
    // changeLogo() {
    //   this.detail.imgUrl = this.logoUrl
    // },
    change() {
      if (this.status) {
        this.detail.status = 1
      } else {
        this.detail.status = 0
      }
    },
    clickSelectLogo() {
      this.isShowCropper = true
    },
    uploadSuccess(url) {
      this.detail.imgUrl = url
    }
  },
  create () {
  }
}
</script>

<style>
</style>
