<template>
  <div class="store-order-detail">
    <h3>订单编号：{{orderDetail.orderNbr}} 订单状态：{{statusName[orderDetail.status]}} 下单时间：{{this.fmt.date(orderDetail.createTime)}}</h3>
    <Table :columns="table.columns"
           :data="orderDetail.details"
           ref="table" />
    <div class="cf-all">
      <h3 class="fr">订单总价：{{orderDetail.totalPrice}} 运费：{{orderDetail.expressFee}} 实付：{{orderDetail.totalPriceDiscount}}</h3>
    </div>
    <Card dis-hover>
      <p slot="title">购买信息</p>
      <h5>配送方式：{{orderDetail.expressName}}</h5>
      <h5>收货人：{{orderDetail.linkMan}}</h5>
      <h5>收货电话：{{orderDetail.linkPhone}}</h5>
      <h5>收货地址：{{orderDetail.address}}</h5>
      <h5>买家昵称：{{orderDetail.nickName}}</h5>
      <h5>业务员：{{orderDetail.staffName}}</h5>
    </Card>
    <Card dis-hover>
      <p slot="title">销售信息</p>
      <h5>员工：{{orderDetail.staffName}}( ￥{{orderDetail.extractValue === null ? 0 : orderDetail.extractValue}} )</h5>
    </Card>
    <!--<div class="mb10">联系电话：{{detail.phone}}</div>-->
    <!--<div class="mb10">上级贴牌商：{{detail.parentName }}</div>-->
    <!--<div class="mb10">代理商状态：{{detail.status | statusFilter}}</div>-->
    <!--<div class="mb10">地址：{{detail.provinceName}} {{detail.cityName}}</div>-->
    <!--<div class="mb10">创建时间：{{detail.createTime | date}}</div>-->
    <!--<div class="mb10">创建人：{{detail.createStaffName}}</div>-->
    <!--<div class="mb10">备注：{{detail.remark}}</div>-->
  </div>
</template>

<script>
export default {
  props: {
    value: false,
    orderDetail: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data() {
    return {
      table: {
        columns: [{
          title: '规格图片',
          render: (h, { row, column, index }) => {
            return (<img src={row.normsPic} width="60px" height="60px" />)
          }
        }, {
          title: '商品名称',
          render: (h, { row, column, index }) => {
            return h('span', row.offerName)
          }
        }, {
          title: '单价',
          key: 'offerPrice',
          render: (h, { row, column, index }) => {
            return h('span', (row.offerPrice ? ' ￥ ' + row.offerPrice : ' ￥ ' + 0))
          }
        }, {
          title: '数量',
          key: 'num',
          render: (h, { row, column, index }) => {
            return h('span', (row.num ? row.num : 0))
          }
        }]
      },
      title: '订单详情',
      statusName: {
        '0': '未支付',
        '1': '已支付',
        '2': '已关闭',
        '3': '超时取消',
        '4': '未发货',
        '5': '已发货',
        '6': '完成'
      }
    }
  },
  components: {
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
  },
  methods: {
  }
}
</script>

<style>
</style>
