<template>
  <div>
    <Form class="panel-form"
          ref="form"
          :model="detail"
          :rules="rules"
          :label-width="120">
      <FormItem label="商品名称"
                prop="name"
                class="mt-25 red-symbol">
        <i-input v-model="detail.name"
                 placeholder="请输入商品名称"
                 type="text"
                 style="width:280px"></i-input>
      </FormItem>
      <FormItem label="产品图片"
                class="mt-25 red-symbol">
        <!--<vma-image-upload v-model="surfacePlot"-->
        <!--:limit="5"></vma-image-upload>-->
        <Button type="primary"
                @click="clickSelectSurfacePlot" style="margin-bottom: 5px">选择产品图片
        </Button>
        建议尺寸：690*690
        <br/>
        <img v-for="(img,i) in surfacePlot"
             :key="i" :src="img"
             alt=" " width="60px" height="60px" style="margin-right: 5px" v-on:click="delSurfacePlot(i)">
      </FormItem>
      <FormItem label="产品详情图片"
                class="mt-25 red-symbol">
        <vma-image-upload v-model="detailPlot"
                          :limit="25"></vma-image-upload>
        <!--<Button type="primary"-->
                <!--@click="clickSelectDetailPlot" style="margin-bottom: 5px">选择产品详情图片-->
        <!--</Button>-->
        <!--建议尺寸：690*690-->
        <!--<br/>-->
        <!--<img v-for="(img,i) in detailPlot"-->
             <!--:key="i" :src="img"-->
             <!--alt=" " width="60px" height="60px" style="margin-right: 5px" v-on:click="delDetailPlot(i)">-->
      </FormItem>
      <FormItem label="线上交易"
                prop="isPayOnline"
                class="mt-25 red-symbol">
        <Checkbox v-model="status">支持在商城内完成支付</Checkbox>
      </FormItem>
      <div v-if="status">
        <FormItem label="商品提成"
                  class="mt-25 red-symbol">
          <RadioGroup v-model="detail.extractType">
            <Radio :label="1">
              <span>每件商品固定提成</span>
            </Radio>
            <Radio :label="0">
              <span>成交价</span>
            </Radio>
          </RadioGroup>
          <br/>
          <FormItem prop="extractValue"
                    class="mt-15 red-symbol"
                    v-if="this.detail.extractType === 1">
            <i-input type="text"
                     v-model="detail.extractValue"
                     style="width:120px"></i-input>
            元
          </FormItem>
          <FormItem prop="extractPer"
                    class="mt-15 red-symbol"
                    v-if="this.detail.extractType === 0">
            <i-input type="text"
                     v-model="detail.extractPer"
                     style="width:120px"></i-input>
            %
          </FormItem>
        </FormItem>
      </div>
      <FormItem label="商品规格"
                class="mt-25 red-symbol"
                v-if=" id !== ''">
        <RadioGroup v-model="detail.type">
          <Radio :label="0"
                 disabled>
            <span>单规格</span>
          </Radio>
          <Radio :label="1"
                 disabled>
            <span>多规格</span>
          </Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="商品规格"
                class="mt-25 red-symbol"
                v-if=" id === ''">
        <RadioGroup v-model="detail.type">
          <Radio :label="0">
            <span>单规格</span>
          </Radio>
          <Radio :label="1">
            <span>多规格</span>
          </Radio>
        </RadioGroup>
      </FormItem>
      <div v-if="detail.type === 0 || detail.type === ''">
        <FormItem label="规格名称  " class="mt-25 red-symbol">
          <i-input v-model="singleNorms.name" type="text" style="width:120px"></i-input>
        </FormItem>
        <FormItem label="售价  " prop="price" class="mt-25 red-symbol">
          <i-input v-model="singleNorms.price" style="width:120px" type="text"></i-input>
          元
        </FormItem>
        <FormItem label="库存  " prop="num" class="mt-25 red-symbol">
          <i-input v-model="singleNorms.num" style="width:120px" type="text"></i-input>
          件
        </FormItem>
        <FormItem label="规格图片  " prop="url" class="mt-25 red-symbol">
          <Button type="primary"
                  @click="clickSelectNormsPic" style="margin-bottom: 5px">选择规格图片
          </Button>
          建议尺寸：690*690
          <br/>
          <img v-if="singleNorms.url" :src="singleNorms.url" alt=" " width="60px" height="60px" style="margin-right: 5px">
        </FormItem>
        <CropperImg v-model="isShowNormsCropper"
                    ref='cropperImg1'
                    @on-success='singleNormImgUploadSuccess'></CropperImg>
      </div>
      <div class="more-norms"
           v-if="detail.type === 1">
        <Button type="primary"
                @click="addOneNorms">添加
        </Button>
        <Table :columns="table.columns"
               :data="moreNorms"
               ref="table"/>
        <upload-img v-model="uploadVisible"
                    :urlDetaill="urlDetaill"></upload-img>
      </div>
      <FormItem label=""
                class="mt-25">
        <RadioGroup v-model="detail.status">
          <Radio :label="0">
            <span>暂不上架（添加至未上架）</span>
          </Radio>
          <Radio :label="1">
            <span>即时上架（添加至已上架）</span>
          </Radio>
        </RadioGroup>
      </FormItem>
      <div class="handle-edit-btn">
        <Button @click="handlerCancel">取消</Button>
        <Button type="primary"
                @click="handlerSave">确定
        </Button>
      </div>
    </Form>
    <CropperImg v-model="isShowCropper"
                ref='cropperImg1'
                @on-success='uploadSuccess'></CropperImg>
    <!--<CropperImg v-model="isShowDetailCropper"-->
                <!--ref='cropperImg2'-->
                <!--@on-success='uploadDetailSuccess'></CropperImg>-->
  </div>
</template>

<script>
import {storeOfferApi} from '@/api/ems'
import {INIT_DETAIL} from '../src/const.js'
import {doubleValidator} from '@/assets/js/asyncValidator/validators'
import CropperImg from './cropperImg'
import UploadImg from './uploadImg'

export default {
  props: {
    value: false,
    editId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      detail: {
        ...INIT_DETAIL
      },
      status: true,
      rules: {
        name: [
          {required: true, message: '请输入正确的商品名'},
          {type: 'string', max: 50, message: '商品名称不能超过50个字', trigger: 'blur'}
        ],
        extractValue: [
          {required: true, message: '请输入正确的数值'},
          {validator: doubleValidator}
        ],
        extractPer: [
          {required: true, message: '请输入正确的数值'},
          {validator: doubleValidator}
        ]
      },
      moreNorms: [],
      singleNorms: {
        type: 0,
        isDefault: 1,
        name: '',
        price: 0,
        num: 0,
        url: ''
      },
      id: '',
      surfacePlot: [],
      detailPlot: [],
      isShowCropper: false,
      isShowDetailCropper: false,
      table: {
        columns: [{
          title: '规格图片',
          key: 'url',
          render: (h, params) => {
            return (<img src = {params.row.url}width = "60px"height = "60px" on-click = {() => { this.uploadImg(params) }}/>)
          }
        }, {
          title: '规格名称',
          key: 'name',
          render: (h, {row, column, index}) => {
            let me = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  value: row.name
                },
                on: {
                  'on-blur': (event) => {
                    me.moreNorms[index].name = event.target.value
                  }
                }
              })
            ])
          }
        }, {
          title: '商品单价',
          key: 'price',
          render: (h, {row, column, index}) => {
            let me = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  value: row.price
                },
                on: {
                  'on-blur': (event) => {
                    me.moreNorms[index].price = event.target.value
                  }
                }
              })
            ])
          }
        }, {
          title: '库存',
          key: 'num',
          render: (h, {row, column, index}) => {
            let me = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  value: row.num
                },
                on: {
                  'on-blur': (event) => {
                    me.moreNorms[index].num = event.target.value
                  }
                }
              })
            ])
          }
        }, {
          title: '默认/非默认',
          render: (h, {row, column, index}) => {
            return h('i-switch', {
              props: {
                type: 'primary',
                value: row.isDefault === 1
              },
              style: {
                marginRight: '5px'
              },
              on: {
                'on-change': (value) => {
                  if (value) {
                    for (let i = 0; i < this.moreNorms.length; i++) {
                      this.moreNorms[i].isDefault = 0
                    }
                    this.moreNorms[index].isDefault = 1
                  } else {
                    this.moreNorms[0].isDefault = 1
                    this.moreNorms[index].isDefault = 0
                  }
                }
              }
            })
          }
        }, {
          title: '操作',
          render: (h, {row, column, index}) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    let status = false
                    if (row.isDefault === 1) {
                      status = true
                    }
                    this.moreNorms.splice(index, 1)
                    if (status) {
                      this.moreNorms[0].isDefault = 1
                    }
                  }
                }
              }, '删除')
            ])
          }
        }]
      }, // 上传图片
      uploadVisible: false,
      urlDetaill: {
        index: 0,
        url: ''
      },
      isShowNormsCropper: false,
      normsData: []
    }
  },
  components: {
    CropperImg,
    UploadImg
  },
  computed: {
    visible: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    value(n) {
      if (n) {
        if (this.editId) {
          this.id = this.editId
          this.loadDetail()
        } else {
          this.moreNorms = []
          this.singleNorms = {
            type: 0,
            isDefault: 1,
            name: '',
            price: 0,
            num: 0,
            url: ''
          }
        }
      }
    }
  },
  methods: {
    loadDetail() {
      if (!this.id) {
        return
      }
      storeOfferApi.getStoreDetail(this.id).then(data => {
        this.detail = data
        this.surfacePlot = []
        this.detailPlot = []
        this.extractPer = this.detail.extractPer
        this.extractValue = this.detail.extractValue
        for (let i = 0; i < data.imgs.length; i++) {
          if (data.imgs[i].type === 1) {
            this.surfacePlot.push(data.imgs[i].url)
          } else {
            this.detailPlot.push(data.imgs[i].url)
          }
        }
        if (this.detail.isPayOnline === 1) {
          this.status = true
        } else {
          this.status = false
        }
        if (this.detail.type === 1) {
          this.moreNorms = this.detail.norms
        } else {
          this.singleNorms = this.detail.norms[0]
        }
      })
    },
    async handlerSave() {
      if (this.detail.name === null || this.detail.name === undefined || this.detail.name === '') {
        this.$Message.error({
          content: '请输入商品名称',
          duration: 10,
          closable: true
        })
        return
      }

      // console.log('图片数量', this.surfacePlot.length)
      if (this.surfacePlot.length === 0) {
        this.$Message.error({
          content: '请选择产品图片',
          duration: 10,
          closable: true
        })
        return
      }

      if (this.detail.type === 0) {
        this.detail.norms[0] = this.singleNorms
      } else {
        this.detail.norms = this.moreNorms
      }
      if (this.detail.type === 0 && (this.detail.norms[0].name === '' || this.detail.norms[0].price === '' || this.detail.norms[0].num === '' || this.detail.norms[0].name === null || this.detail.norms[0].price === null || this.detail.norms[0].num === null || this.detail.norms[0].name === undefined || this.detail.norms[0].price === undefined || this.detail.norms[0].num === undefined || this.detail.norms[0].url === '')) {
        this.$Message.error({
          content: '请添加并完善规格',
          duration: 10,
          closable: true
        })
        return
      } else if (this.detail.type === 1 && (this.detail.norms[0].name === '' || this.detail.norms[0].price === '' || this.detail.norms[0].num === '' || this.detail.norms[0].name === null || this.detail.norms[0].price === null || this.detail.norms[0].num === null || this.detail.norms[0].name === undefined || this.detail.norms[0].price === undefined || this.detail.norms[0].num === undefined || this.detail.norms[0].url === '')) {
        this.$Message.error({
          content: '请添加并完善至少一个规格',
          duration: 10,
          closable: true
        })
        return
      }
      let tempArray = []
      for (let i = 0; i < this.surfacePlot.length; i++) {
        let tempObj = {}
        tempObj.sort = i + 1
        tempObj.type = 1
        tempObj.url = this.surfacePlot[i]
        tempArray.push(tempObj)
      }
      for (let i = 0; i < this.detailPlot.length; i++) {
        let tempObj = {}
        tempObj.sort = i + 1
        tempObj.type = 2
        tempObj.url = this.detailPlot[i]
        tempArray.push(tempObj)
      }
      this.detail.imgs = tempArray
      if (this.status) {
        this.detail.isPayOnline = 1
      } else {
        this.detail.isPayOnline = 0
        this.detail.extractType = 0
        this.detail.extractValue = 0
        this.detail.extractPer = 0
      }
      let numCount = 0
      for (let i = 0; i < this.detail.norms.length; i++) {
        numCount += this.detail.norms[i].num
      }
      if (numCount <= 0) {
        this.detail.status = 2
      }
      if (this.id) {
        this.detail.id = this.id
        await storeOfferApi.updateStore(this.detail)
      } else {
        await storeOfferApi.addStore(this.detail)
      }
      this.surfacePlot = []
      this.detailPlot = []
      if (this.detail.status === 1) {
        this.$emitBus('offerUpListChange', 'offerUpListChange')
      } else if (this.detail.status === 0) {
        this.$emitBus('offerDownedListChange', 'offerDownedListChange')
      } else if (this.detail.status === 2) {
        this.$emitBus('offerSoldOutListChange', 'offerSoldOutListChange')
      }
      this.$emit('after-save')
      this.handlerCancel()
    },
    handlerCancel() {
      this.$refs.form.resetFields()
      this.id = ''
      this.detail = {
        ...INIT_DETAIL
      }
      this.surfacePlot = []
      this.detailPlot = []
      this.singleNorms = null
      this.moreNorms = []
      this.$emit('after-cancel')
      this.visible = false
    },
    clickSelectSurfacePlot() {
      if (this.surfacePlot.length < 5) {
        this.isShowCropper = true
      } else {
        this.$Message.error('产品图已达上限，请删除现有图片！')
      }
    },
    // clickSelectDetailPlot() {
    //   if (this.surfacePlot.length < 25) {
    //     this.isShowDetailCropper = true
    //   } else {
    //     this.$Message.error('产品详情图已达上限，请删除现有图片！')
    //   }
    // },
    uploadSuccess(url) {
      this.surfacePlot.push(url)
    },
    // uploadDetailSuccess(url) {
    //   this.detailPlot.push(url)
    // },
    delSurfacePlot(i) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>确认删除该产品图片？</p>',
        onOk: () => {
          this.surfacePlot.splice(i, 1)
        },
        onCancel: () => {
        }
      })
    },
    // delDetailPlot(i) {
    //   this.$Modal.confirm({
    //     title: '提示',
    //     content: '<p>确认删除该产品详情图片？</p>',
    //     onOk: () => {
    //       this.detailPlot.splice(i, 1)
    //     },
    //     onCancel: () => {
    //     }
    //   })
    // },
    addOneNorms() {
      if (this.moreNorms.length === 0) {
        this.moreNorms.push({
          url: 'https://keji-res.h5h5h5.cn/FrGcegrf5e8h34atPtfSCjnCf_id',
          name: '',
          price: '',
          num: '',
          type: 1,
          isDefault: 1
        })
      } else {
        this.moreNorms.push({
          url: 'https://keji-res.h5h5h5.cn/FrGcegrf5e8h34atPtfSCjnCf_id',
          name: '',
          price: '',
          num: '',
          type: 1,
          isDefault: 0
        })
      }
    },
    uploadImg(params) {
      this.urlDetaill.index = params.index
      if (params.row.url !== 'https://keji-res.h5h5h5.cn/FrGcegrf5e8h34atPtfSCjnCf_id') {
        this.urlDetaill.url = params.row.url
      }
      this.uploadVisible = true
    },
    clickSelectNormsPic() {
      this.isShowNormsCropper = true
    },
    singleNormImgUploadSuccess(url) {
      this.singleNorms.url = url
    }
  },
  created() {
    this.$onBus('moreNormsUrlChange', target => {
      let index = target.index
      this.moreNorms[index].url = target.url
    })
  }
}
</script>

<style scoped lang='scss'>
  .more-norms {
    margin-top: 20px;
    position: relative;
    .ivu-btn {
      position: absolute;
      top: -50px;
      right: 0;
      z-index: 200;
    }
  }
</style>
