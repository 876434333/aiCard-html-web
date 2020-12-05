<template>
  <div class="add-circle">
    <vma-panel v-model="computedValue"
               title="发布新动态">
      <Form ref="formValidate"
            :model="params">
        <FormItem prop="title"
                  label="标题"
                  v-if="this.params.type !== 0"
                  :required=true>
          <Input type="text"
                 v-model="params.title"
                 placeholder="请输入标题"/>
        </FormItem>
        <FormItem prop="type"
                  label="朋友圈模式">
          <RadioGroup v-model="params.type">
            <Radio :label="0">普通朋友圈</Radio>
            <Radio :label="1">小图模式</Radio>
            <Radio :label="2">大图模式</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem class="circle-smeditor" v-if="this.params.type !== 0">
          <!--<SMEditor ref='SMEditor'></SMEditor>-->
          <!--<div class="img">-->
            <!--<vma-upload :limit="1"-->
                        <!--accept="images/*"-->
                        <!--:exts="['jpg', 'gif', 'png']"-->
                        <!--uploadType="qiniu"-->
                        <!--title='选择图片'-->
                        <!--:options='options'-->
                        <!--@on-success='editorUploadSuccess' />-->
          <!--</div>-->
          <vma-editor ref="editor" />
        </FormItem>
        <FormItem label="朋友圈内容" v-if="this.params.type === 0">
          <i-input v-model="params.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></i-input>
        </FormItem>
        <FormItem label="朋友圈图片"
                  class="mt-25"
                  v-if="this.params.type === 0">
          <vma-image-upload v-model="imgUrls"
                            :limit="9"></vma-image-upload>
        </FormItem>
        <FormItem class="circle-cover-img" v-if="this.params.type !== 0">
          <img :src="params.cover"
               alt="">
        </FormItem>
        <FormItem v-if="this.params.type !== 0">
          <Button type="primary"
                  @click="clickSelectCover">选择封面</Button>
        </FormItem>
        <FormItem class="circle-add-submit">
          <Button @click="previewAddCircle" v-if="this.params.type !== 0">预览</Button>
          <Button type="primary"
                  @click="submitAddCircle('formValidate')">发布</Button>
        </FormItem>
      </Form>
    </vma-panel>
    <CropperImg v-model="isShowCropper"
                ref='cropperImg'
                @on-success='uploadSuccess'></CropperImg>
    <Modal v-model="isPreview"
           :title="params.title">
      <p class="circle-add-preview"
         v-html="params.content"></p>
    </Modal>
  </div>
</template>

<script>
import { circleApi } from '@/api/ems'
// import $ from 'jquery'
import CropperImg from './cropperImg'
import SMEditor from 'smeditor'

export default {
  model: {
    prop: 'value',
    event: 'model'
  },
  components: {
    CropperImg,
    SMEditor
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
      options: {
        showUploadList: false
      },
      params: {
        content: '',
        cover: '',
        imgUrls: [],
        title: '',
        type: 1
      },
      isShowCropper: false,
      isPreview: false,
      ruleValidate: {
        // title: [
        //   { required: true, message: '标题不能为空', trigger: 'blur' },
        //   { max: 50, message: '标题不能超过50位字符' }
        // ]
      },
      imgUrls: []
    }
  },
  mounted() {
  },
  methods: {
    clickSelectCover() {
      this.isShowCropper = true
    },
    uploadSuccess(url) {
      this.params.cover = url
    },
    // editorUploadSuccess(response, file) {
    //   $('#input-area').append(`<img src="${file.url}" />`)
    //   this.params.imgUrls.push(file.url)
    // },
    previewAddCircle() {
      this.params.content = this.$refs.editor.getData()
      this.isPreview = true
    },
    async addCircle() {
      await circleApi.addCircle(this.params)
      this.computedValue = false
      this.$emit('on-addsuccess', true)
    },
    submitAddCircle(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.params.type !== 0 && this.params.cover && this.params.title) {
            this.params.content = this.$refs.editor.getData()
            this.addCircle()
          } else if (this.params.type === 0) {
            this.params.content = this.params.content.replace(/\n/g, '<br/>')
            this.params.imgUrls = this.imgUrls
            this.params.title = ''
            this.params.cover = ''
            this.addCircle()
          } else if (this.params.cover && !this.params.title && this.params.type !== 0) {
            this.$Message.error('请填写标题')
          } else if (!this.params.cover && this.params.title && this.params.type !== 0) {
            this.$Message.error('请上传封面')
          } else if (!this.params.cover && !this.params.title && this.params.type !== 0) {
            this.$Message.error('请填写标题并上传封面')
          }
        } else {
          this.$Message.error('请输入正确信息')
        }
      })
    }
    // , changeCircleType() {
    //   console.log(this.params.type)
    //   if (this.params.type === 0) {
    //     this.ruleValidate.title[0].required = false
    //     console.log(this.ruleValidate.title[0].required)
    //   } else {
    //     this.ruleValidate.title[0].required = true
    //   }
    // }
  }
}
</script>
