<template>
  <div>
    <Modal v-model="visible"
           :mask-closable="false">
      <Form class="panel-form"
            ref="form"
            :label-width="120"
      >
        <FormItem label="规格图片  " prop="normPhoto" class="mt-25">
          <!--<vma-image-upload @model="changePhoto" v-model="url" />-->
          <Button type="primary"
                  @click="clickSelectNormsPic" style="margin-bottom: 5px">选择规格图片</Button> 建议尺寸：690*690
          <br/>
          <img v-if="url" :src="url" alt=" " width="60px" height="60px" style="margin-right: 5px">
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="handlerCancel">取消</Button>
        <Button type="primary" @click="handlerSave">确定</Button>
      </div>
    </Modal>
    <CropperImg v-model="isShowCropper"
                ref='cropperImg1'
                @on-success='uploadSuccess'></CropperImg>
  </div>
</template>

<script>
import CropperImg from './cropperImg'
export default {
  props: {
    value: false,
    urlDetaill: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      url: '',
      detail: {
        index: 0,
        url: ''
      },
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
    }
  },
  watch: {
    value(n) {
      if (n) {
        this.url = this.urlDetaill.url
        this.detail.index = this.urlDetaill.index
      }
    }
  },
  methods: {
    handlerSave() {
      this.$emitBus('moreNormsUrlChange', this.detail)
      this.handlerCancel()
    },
    handlerCancel() {
      this.visible = false
    },
    clickSelectNormsPic() {
      this.isShowCropper = true
    },
    uploadSuccess(url) {
      this.detail.url = url
      this.url = url
    }
  },
  create () {
  }
}
</script>

<style scoped>

</style>
