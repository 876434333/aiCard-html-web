<template>
  <div class="cropper-img">
    <Modal v-model="computedValue"
           title="图片剪裁"
           @on-ok="ok"
           :width='800'>
      <div class="cropper-container cf-all">
        <div class="cf-all">
          <section>
            <p>裁剪操作框</p>
            <vueCropper ref="cropper"
                        :img="option.img"
                        :outputSize="option.size"
                        :outputType="option.outputType"
                        :info="option.info"
                        :canScale="option.canScale"
                        :autoCrop="option.autoCrop"
                        :autoCropWidth="option.autoCropWidth"
                        :autoCropHeight="option.autoCropHeight" />
          </section>
        </div>

      </div>
      <div class="img-upload">
        <Upload action="//jsonplaceholder.typicode.com/posts/"
                :before-upload="handleUpload">
          <Button type="primary">选择图片</Button>
        </Upload>
      </div>

    </Modal>
  </div>
</template>

<script>
import {
  base64Api
} from '@/api/common'
import VueCropper from 'vue-cropper'

export default {
  model: {
    prop: 'value',
    event: 'model'
  },
  components: {
    VueCropper
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    computedValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('model', val)
      }
    }
  },
  data() {
    return {
      previews: {},
      option: {
        img: '',
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: true,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 250,
        autoCropHeight: 250
        // 开启宽度和高度比例
      }
    }
  },
  methods: {
    ok() {
      this.$refs.cropper.getCropData((data) => {
        let base64data = data.substring(data.indexOf(',') + 1, data.length)
        base64Api.uploadImageBase64({ imgdata: base64data }).then((res) => {
          this.$emit('on-success', res.url)
          this.$Message.success({
            content: '上传成功'
          })
        })
      })
    },
    handleUpload(file) {
      let reader = new FileReader()
      reader.readAsDataURL(file)
      let that = this
      reader.onload = function (e) {
        that.option.img = this.result
      }
      return false
    }
  }
}
</script>
