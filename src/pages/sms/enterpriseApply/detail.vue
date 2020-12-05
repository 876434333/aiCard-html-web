<template>
  <div class="panel">
    <div class="panel-header">
      <i class="icon icon-enlarge panel-header-icon"
         :class="fullScreen ? 'icon-narrow' : 'icon-enlarge'"
         @click="toggleFullScreen"></i>
      企业详情
      <div class="panel-header-tools">
        <Button type="primary"
                @click="saveConfig">保存配置</Button>
        <Button v-if="entity.id && entity.isDeploy === 0"
                type="primary"
                @click="deploy(1)">部署</Button>
        <Button v-if="entity.id && entity.isDeploy === 1"
                type="error"
                @click="deploy(0)">停止部署</Button>
      </div>
    </div>
    <div class="panel-body">
      <p class="nodata"
         v-show="!data">暂无数据</p>
      <Tabs v-model="tabName"
            v-if="data">
        <TabPane label="基础信息"
                 name="info">
          <info-tab-panel :data="entity"
                          v-if="tabName === 'info'"
                          @change="changeMpInfo"
                          ref="infoTab" />
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
import { detailMixin } from '@/mixins'
import InfoTabPanel from './components/detail/infoTabPane.vue'
import enterpriseApi from '@/api/sms/enterprise'
import enterpriseEventBus from './src/enterpriseEventBus'

export default {
  mixins: [detailMixin],
  components: {
    InfoTabPanel
  },
  data() {
    return {
      tabName: 'info',
      baseInfo: ''
    }
  },
  props: {
    fullScreen: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getApi() {
      return enterpriseApi
    },
    toggleFullScreen() {
      this.$emit('toggleFullScreen', !this.fullScreen)
    },
    // 部署
    deploy(isDeploy) {
      let content
      if (isDeploy === 1) {
        content = '确定要部署？'
      } else {
        content = '确定要停止部署？'
      }
      this.$Modal.confirm({
        title: '提示',
        content,
        onOk: (action, instance) => {
          let params = {
            enterpriseId: this.entity.id,
            isDeploy: isDeploy
          }
          enterpriseApi.updateDeploy(params).then(() => {
            this.success('修改成功')
            enterpriseEventBus.$emit('list.update')
          })
        }
      })
    },
    // 保存配置
    saveConfig() {
      let data = Object.assign({}, this.entity, this.baseInfo)
      let content = '确定要保存修改？'
      console.log(data)
      let params = {
        id: data.id,
        aiAgentId: data.aiAgentId,
        aiSecret: data.aiSecret,
        appId: data.appId,
        bossAgentId: data.bossAgentId,
        bossSecret: data.bossSecret,
        contactsSecret: data.contactsSecret,
        corpId: data.corpId,
        mchId: data.mchId,
        payKey: data.payKey,
        secret: data.secret,
        messageTemplate: data.messageTemplate,
        payTemplate: data.payTemplate
      }
      this.$refs.infoTab.$emit('checkMpForm', () => {
        this.$Modal.confirm({
          title: '修改配置',
          content,
          onOk: (action, instance) => {
            // 检查小程序配合表单
            enterpriseApi.updateListInfo(params).then(() => {
              this.success('保存成功')
              enterpriseEventBus.$emit('list.update')
            })
          }
        })
      })
    },
    // 更改小程序资料时触发更新
    changeMpInfo(data) {
      this.baseInfo = Object.assign({}, this.baseInfo, data)
    }
  }
}
</script>
