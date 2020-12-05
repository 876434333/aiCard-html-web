<template>
  <Modal v-model="computedValue"
         :title="title"
         @on-ok="ok"
         :width='500'
         class-name="handover-staffs-modal">
    <Row>
      <i-col span="20">
        <Input v-model="params.staffName"
               placeholder="请输入姓名搜索" />
      </i-col>
      <i-col span="4"
             style="text-align: right;">
        <Button type="primary"
                icon="ios-search"
                @click.native="list"></Button>
      </i-col>
    </Row>
    <Row>
      <i-col span="24">
        <div class="staffs">
          <ul>
            <li v-for="(item) in staffsList"
                :key="item.id"
                @click="selectStaff(item)">
              {{item.name}}
              <i v-if="currId==item.id"
                 class="icontont icon-wancheng-copy"></i>
              <span>{{item.departmentName}}</span>
            </li>
          </ul>
        </div>
      </i-col>
    </Row>
  </Modal>
</template>

<script>
import {
  handoverApi
} from '@/api/ems'
export default {
  model: {
    prop: 'value',
    event: 'model'
  },
  components: {

  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
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
      params: {
        pageNum: 1,
        pageSize: 300,
        staffName: ''
      },
      staffsList: [],
      currId: '',
      currStaff: {}
    }
  },
  mounted() {
    this.list()
  },
  methods: {
    ok() {
      this.$emit('on-select', this.currStaff)
    },
    async list() {
      const data = await handoverApi.list(this.params)
      this.staffsList = data.dataList
    },
    selectStaff(item) {
      this.currStaff = item
      this.currId = item.id
    }

  }
}
</script>
