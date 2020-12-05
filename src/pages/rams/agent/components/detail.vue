<template>
  <detail :id="id"
          :getDetail="getDetail"
          :getEnterpriseList="getEnterpriseList"
          ></detail>
</template>

<script>
import { agentApi } from '@/api/rams'
import detail from '@/components/packages/agentDetail'
export default {
  name: 'smsAgentDetail',
  props: {
    id: ''
  },
  data () {
    return {}
  },
  components: {
    detail
  },
  methods: {
    getDetail: agentApi.getAgentDetail,
    getEnterpriseList: agentApi.getEnterpriseList
  }
}
</script>
