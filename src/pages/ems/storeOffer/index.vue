<template>
  <div>
    <div class="panel">
      <div class="panel-body">
            <Tabs v-model="tabName">
              <TabPane label="已上架" name="one">
                <offer-up-list v-if="tabName === 'one'" />
              </TabPane>
              <TabPane label="未上架" name="two">
                <offer-downed-list v-if="tabName === 'two'" />
              </TabPane>
              <TabPane label="已售罄" name="three">
                <offer-sold-out-list v-if="tabName === 'three'" />
              </TabPane>
            </Tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { indexMixin } from '@/mixins'
import Digit from '../home/components/digit'
import offerUpList from './components/offerUpList'
import { storeOfferApi } from '@/api/ems'
import offerSoldOutList from './components/offerSoldOutList'
import offerDownedList from './components/offerDownedList'

export default {
  mixins: [indexMixin],
  components: {
    offerSoldOutList,
    indexMixin,
    Digit,
    offerUpList,
    storeOfferApi,
    offerDownedList
  },
  data() {
    return {
      tabName: 'one',
      // 查看详情
      detailVisible: false,
      id: ''
    }
  },
  methods: {
    getApi () {
      return storeOfferApi
    }
  }
}
</script>
