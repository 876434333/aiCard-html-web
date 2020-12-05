<template>
  <div>
    <div class="panel">
      <div class="panel-body">
        <digit />
      </div>
    </div>

    <div class="panel">
      <div class="panel-body">
        <Tabs type="card"
              v-model="tab">
          <TabPane label="地区总代理"
                   name="regionalAgent">
            <list :role="3"
                  v-if="tab === 'regionalAgent'" />
          </TabPane>
          <TabPane label="代理商"
                   name="agent">
            <list :role="2"
                  v-if="tab === 'agent'" />
          </TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Digit from '../home/components/digit'
import List from './components/list'

export default {
  components: {
    Digit,
    List
  },
  data() {
    return {
      tab: 'regionalAgent'
    }
  }
}
</script>
