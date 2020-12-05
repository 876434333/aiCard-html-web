<template>
  <div>

    <h2>权限折扣</h2>
    <!--公司员工基础权限折扣为：<input v-model="message">折 <span @click="alertModel">修改</span>-->
    <p class="discount-base">公司员工基础权限折扣为:
      <Input v-model="message"
             readonly
             placeholder="large size" /> 折
      <span class="editDis"
            @click="alertModel">修改</span>
    </p>
    <p class="default-use">
      员工的商城默认使用基础折扣特权，你也可以设置指定人员的个人特权折扣
    </p>
    <div class="search-content">
      <div class="s_title_b">
        <span>{{enterpriseName}}({{page.totalNum}}人) </span>
        <span class="test">
          <input type="checkbox"
                 v-model="discountType"
                 @click="test2"> 只显示个人特权折扣 </span>

        <!--<span class="test"> <Checkbox v-model="single" @click="search">只显示个人特权折扣</Checkbox> </span>-->
        <span class="search-name">
          <!-- <input type="text"
                 class="el-input__inner"
                 placeholder="输入姓名搜索"
                 autocomplete="off"
                 v-model="params.staff_name"> -->
          <Input v-model="params.staff_name"
                 placeholder="输入姓名搜索"
                 style="width: 160px !important" />
          <!-- <button type="button" class="el-button search el-button--primary el-button--small" @click="search" value="搜索"></button> -->
          <Button type="primary"
                  icon="ios-search"
                  @click="search"></Button>
        </span>
      </div>
    </div>
    <div class="panel">
      <div class="panel-body">
        <Table :columns="table.columns"
               :data="table.list"
               ref="table" />
        <vma-pagination :pageNum="params.pageNum"
                        :pageSize="params.pageSize"
                        :total="page.totalNum"
                        @change="list" />
      </div>

      <Modal v-model="modal"
             title="设置基础折扣权限"
             @on-ok="oks">
        设定公司员工的基础特权折扣：
        <InputNumber :max="10"
                     :min="1"
                     v-model="message"></InputNumber>

        <!-- 设定公司员工的基础特权折扣：<input v-model="message">折 -->
      </Modal>

      <Modal v-model="moos"
             title="设置基础折扣权限"
             @on-ok="ok">
        <p style="width: 100%;height: 45px;display: block;line-height: 45px;text-align: center;">为&nbsp;&nbsp;{{this.staffDepartment}}&nbsp;&nbsp;{{this.staffName}}&nbsp;&nbsp;设定特权折扣：</p>
        <RadioGroup v-model="disabledGroup"
                    style="width: 100%;height: 45px;display: block;line-height: 45px;text-align: center;">
          <span @click="chooseone">
            <Radio label="应用公司折扣"></Radio>
          </span>
          <span @click="choose">
            <Radio label="设置个人特权折扣"></Radio>
          </span>
        </RadioGroup>
        <p v-if="seenaa"
           style="width: 100%;height: 45px;display: block;line-height: 45px;text-align: center;"><InputNumber v-model="mesa"
                                     :max="10"
                                     :min="1">折</InputNumber></p>

        <p v-if="seen"
           style="width: 100%;height: 45px;display: block;line-height: 45px;text-align: center;">{{message}}折</p>

      </Modal>

    </div>
  </div>
</template>

<script>
import { indexMixin } from '@/mixins'
import Digit from '../home/components/digit'
import { storeDiscountApi } from '@/api/ems'

export default {
  mixins: [indexMixin],
  components: {
    // indexMixin,
    Digit
    // storeDiscountApi
  },
  data() {
    return {
      discountType: false,
      params: {
        staffName: '',
        pageNum: 1,
        pageSize: 10,
        discount_type: '',
        staff_name: '',
        count: ''
      },
      date: {
        type: '',
        id: '',
        discount: ''
      },
      modal: false,
      moos: false,
      message: 0,
      enterpriseName: '',
      mesa: '',
      single: false,
      staffId: '',
      staffName: '',
      staffDepartment: '',
      disabledGroup: '',
      seenaa: false,
      seen: false,
      // message: '4',
      // params: {
      //   status: '',
      //   createTimeBegin: '',
      //   createTimeEnd: '',
      //   finishedTimeBegin: '',
      //   finishedTimeEnd: '',
      //   linkMan: '',
      //   linkPhone: '',
      //   offerName: '',
      //   orderNbr: '',
      //   staffName: ''
      // }
      table: {
        columns: [{
          title: '头像',
          align: 'center',
          render: (h, { row, column, index }) => {
            return (<div class='img-space-del-table'><img src={row.headIcon} width="60px" height="60px" /></div>)
          }
        }, {
          title: '姓名',
          align: 'center',
          render: (h, { row, column, index }) => {
            // return h('span', (row.totalPrice ? ' ￥ ' + row.totalPrice : ' ￥ ' + 0))
            return h('span', (row.name))
          }
        }, {
          title: '职务',
          align: 'center',
          render: (h, { row, column, index }) => {
            return h('span', (row.station))
          }
        }, {
          title: '部门',
          align: 'center',
          render: (h, { row, column, index }) => {
            return h('span', (row.departmentName))
          }
        }, {
          title: '手机',
          align: 'center',
          render: (h, { row, column, index }) => {
            return h('span', (row.phone))
          }
        }, {
          title: '特权折扣',
          align: 'center',
          render: (h, params) => {
            let dom = null
            if (params.row.discountType === 0) {
              dom = (<div><span class="text-link mr10" on-click={() => { this.editone(params.row.id, params.row.departmentName, params.row.name) }}>{this.message}折</span></div>)
            } else {
              dom = (<div><span class="text-link mr10" on-click={() => { this.editoneBy(params.row.id, params.row.departmentName, params.row.name, params.row.discount) }}>{params.row.discount}折 <br />（个人特权折扣）</span></div>)
            }
            return dom
          }

          //   render: (h, params) => {
          //     let dom = null
          //     if (params.row.role === '1') {
          //       dom = (<div>
          //         <span class="text-link mr10" on-click={ () => { this.handlerDetail(params.row.id) } }>查看</span>
          //       </div>)
          //     } else {
          //       dom = (<div>
          //         <span class="text-link mr10" on-click={ () => { this.handlerAddGrant(params.row.id) } }>权限设置</span>
          //         <span class="text-link mr10" on-click={ () => { this.handlerDetail(params.row.id) } }>查看</span>
          //         <span class="text-link mr10" on-click={ () => { this.handlerEdit(params.row.id) } }>编辑</span>
          //         <span class="text-link mr10" on-click={ () => { this.handlerDelete(params.row.id) } }>删除</span>
          //       </div>)
          //     }
          //     return dom
          //   }
          // }
        }]
      }
    }
  },
  methods: {
    getApi() {
      return storeDiscountApi
    },
    alertModel() {
      this.modal = true
    },
    setPagination(page) {
      this.page.totalNum = page.totalNum
      this.message = page.discount
      this.enterpriseName = page.enterpriseName
    },
    test2() {
      if (this.discountType) {
        this.params.discount_type = ''
      } else {
        this.params.discount_type = 1
      }
      this.search()
    },
    oks() {
      console.log(this.message)
      storeDiscountApi.updateDiscount(this.message).then(() => {
        this.success('操作成功')
        this.search()
      })
    },
    ok() {
      if (this.seen) {
        this.date.type = 0
        this.date.id = this.staffId
        this.date.discount = this.message
        storeDiscountApi.discountStaff(this.date).then(() => {
          this.success('操作成功')
          this.search()
        })
      } else {
        this.date.type = 1
        this.date.id = this.staffId
        this.date.discount = this.mesa
        storeDiscountApi.discountStaff(this.date).then(() => {
          this.success('操作成功')
          this.search()
        })
      }
    },
    editone(id, depart, name) {
      this.moos = true
      this.mesa = this.message
      this.staffId = id
      this.staffName = name
      this.staffDepartment = depart
      this.disabledGroup = '应用公司折扣'
      this.seen = true
      this.seenaa = false
    },
    editoneBy(id, depart, name, discount) {
      this.moos = true
      this.mesa = discount
      this.staffId = id
      this.staffName = name
      this.staffDepartment = depart
      this.disabledGroup = '设置个人特权折扣'
      this.seenaa = true
      this.seen = false
    },
    choose() {
      this.seenaa = true
      this.seen = false
    },
    chooseone() {
      this.seen = true
      this.seenaa = false
    }

  }
}

</script>

<style scoped>
.ivu-input-wrapper {
  width: 50px !important;
  readonly: false;
}
.editDis {
  color: #1aad19;
  cursor: pointer;
}
.discount-base {
  font-size: 16px;
  color: #484848;
}
.default-use {
  margin-top: 20px;
  font-size: 14px;
  color: #7b7b7b;
}
.search-content {
  margin-top: 20px;
  margin-bottom: 20px;
}
.s_title_b {
  font-size: 16px;
  color: #2e2e2e;
}
.test {
  margin-left: 60px;
}
.search-name {
  margin-left: 40px;
}
.el-button--primary {
  color: #fff;
  background-color: #1aad19;
  border-color: #1aad19;
}
.el-button--small {
  font-size: 12px;
  border-radius: 3px;
}
.el-button--small,
.el-button--small.is-round {
  padding: 9px 15px;
  height: 30px;
}
.el-button--small {
  font-size: 12px;
  border-radius: 3px;
}
.abc {
  color: #7dd07d;
}
</style>
