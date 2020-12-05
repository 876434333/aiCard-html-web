<style>
  .ivu-form .ivu-form-item-label {
    font-size: 12px;
  }
  .foot {
    margin:20px auto 0;
    width: 188px;
  }
  .sure {
    margin-right: 70px;
  }
  .wrap {
    position: fixed;
    top: 100px;
    left: 10px;
    z-index: 1000;
    width: 100%;
  }
  .main {
    margin: 0 auto;
    padding: 22px;
    width: 70%;
    height: 600px;
    border-radius: 6px;
    overflow-y: auto;
    background: #fff;
  }
  .table-wrap {
    height: 430px;
    overflow-y: auto;
  }
</style>
<template>
  <Modal v-model="visible">
    <div class="ivu-modal-mask" @click="cancel"></div>
    <div class="wrap">
      <div class="main">
        <Form class="panel-form mb-20"
              inline>
          <FormItem label="手机号：" :label-width="60">
            <i-input type="text"
                    v-model="params.phone"
                    placeholder="请输入手机号"></i-input>
          </FormItem>
          <FormItem label="组织：" :label-width="60">
            <i-input type="text"
                    v-model="params.enterpriseName"
                    placeholder="请输入组织"></i-input>
          </FormItem>
          <div class="fr">
            <FormItem>
              <Button type="primary"
                      @click="search">查询</Button>
            </FormItem>
          </div>
        </Form>
        <div class="table-wrap">
          <Table  class="table"
              stripe
              :columns="columns"
              :data="tableData"
              @on-selection-change="selectRowAll"
              @on-select-all="selectRowAll"/>
          <!-- 分页 -->
          <!-- <vma-pagination :pageNum="params.pageNum"
                    :pageSize="params.pageSize"
                    :total="page.totalNum"
                    @change="list" /> -->
        </div>
        <div class="foot">
          <Button type="primary" class="sure" @click="sure">确定</Button>
          <Button type="default" @click="cancel">取消</Button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import { recommendCardApi } from '@/api/sms'
import { tableMixin } from '@/mixins'

export default {
  props: {
    value: false
  },
  data() {
    return {
      // visible: true,
      params: {
        phone: '',
        enterpriseName: ''
      },
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        }, {
          title: '头像',
          key: 'headIcon',
          width: 100,
          render: (h, { row, column, index }) => {
            return (<div class='img-space-del-table'><img src={row.headIcon} width="40px" height="40px" /></div>)
          }
        },
        { key: 'name', title: '名片名' },
        { key: 'enterpriseName', title: '所属组织' },
        { key: 'phone', title: '手机号' },
        { key: 'createTime', title: '注册日期' }
      ],
      staffIdList: {
        staffIdList: []
      }
    }
  },
  mixins: [tableMixin],
  mounted() {
    this.getStaff(this.params)
    console.log('visible', this.visible)
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
  methods: {
    // 获取需要推荐的名片
    getStaff(params) {
      this.staffIdList.staffIdList = []
      recommendCardApi.getStaff(params).then((data) => {
        this.tableData = data
      })
    },
    // 查询
    search() {
      this.getStaff(this.params)
    },
    // 选择
    selectRowAll(selection) {
      this.staffIdList.staffIdList = []
      for (var i = 0; i < selection.length; i++) {
        this.staffIdList.staffIdList.push(selection[i].staffId)
      }
    },
    // 点击确定
    async sure() {
      this.visible = false
      recommendCardApi.addRecommendCard(this.staffIdList).then((res) => {
        this.success('操作成功')
        this.$emit('listenModalIsClose', 'true')
        this.getStaff(this.params)
      })
    },
    // 点击取消
    cancel() {
      this.visible = false
      this.$emit('listenModalIsClose', 'false')
    }
  }
}
</script>
