<template>
  <div class="panel">
    <div class="panel-header">
      <i class="icon icon-enlarge panel-header-icon"
         :class="fullScreen ? 'icon-narrow' : 'icon-enlarge'"
         @click="toggleFullScreen"></i>
      企业详情
      <div class="panel-header-tools"
           v-if="data">
        <Button type="primary"
                v-if="entity.isDeploy === 1"
                @click="showNewCard">增加名片</Button>
        <Button type="primary"
                v-if="entity.isDeploy === 1"
                @click="showResetPwd">重置密码</Button>
        <Button type="error"
                v-if="entity.status === 1 && entity.isDeploy === 1"
                @click="updateStatus(0)">禁用</Button>
        <Button type="primary"
                @click="updateStatus(1)"
                v-else-if="entity.status === 0 &&  entity.isDeploy === 1">恢复</Button>
        <Button type="error"
                v-if="entity.isDeploy === 1"
                @click="updateDeploy(0)">停止部署</Button>
        <Button type="primary"
                @click="updateDeploy(1)"
                v-else-if="entity.isDeploy === 0">部署</Button>
        <Button type="primary"
                @click="openEdit">编辑</Button>
        <Button type="primary"
                @click="openConfigForm">修改配置</Button>
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
                          v-if="tabName === 'info'" />
        </TabPane>
        <TabPane label="小程序资料"
                 name="mpInfo">
          <mp-info-tab-pane :data="entity"
                            v-if="tabName === 'mpInfo'"
                            :edit="false"
                            :getAndShow="true" />
        </TabPane>
      </Tabs>
    </div>
    <!-- 新增名片 -->
    <card v-if="card.show"
          :data="card.entity"
          @after-submit="afterSubmitCard"
          @on-cancel="cancelCard"/>
    <!-- 重置密码 -->
    <password v-if="password.show"
          :data="password.entity"
          @after-submit="afterSubmitPwd"
          @on-cancel="cancelPwd"/>
    <!-- 修改配置 -->
    <vma-panel v-model="configForm.show"
              :title="'修改配置'">
      <template v-if="configForm.show">
        <config-form :data="configForm.entity"
                      @on-cancel="closeConfigForm"
                      @after-submit="closeConfigForm" />
      </template>
    </vma-panel>
  </div>
</template>
<script>
import { detailMixin } from '@/mixins'
import enterpriseEventBus from './src/enterpriseEventBus'
import InfoTabPanel from '@/components/packages/enterpriseDetail/components/infoTabPane.vue'
import ConfigForm from './components/form/configForm.vue'
import MpInfo from '@/components/packages/enterpriseConfigForm/miniProgramForm.vue'
import Card from './components/detail/newCard.vue'
import Password from './components/detail/resetPassword.vue'
import enterpriseApi from '@/api/pms/enterprise'

export default {
  mixins: [detailMixin],
  components: {
    InfoTabPanel,
    mpInfoTabPane: MpInfo,
    Card,
    Password,
    configForm: ConfigForm
  },
  data() {
    return {
      tabName: 'info',
      card: {
        show: false,
        entity: {
          id: ''
        }
      },
      password: {
        show: false,
        entity: {
          id: ''
        }
      },
      configForm: {
        show: false,
        entity: {
          id: ''
        }
      }
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
    showNewCard() {
      this.card.entity = {
        id: this.entity.id
      }
      this.card.show = true
    },
    showResetPwd() {
      this.password.entity = {
        id: this.entity.id
      }
      this.password.show = true
    },
    updateStatus(status) {
      let content, success
      let title = '提示'
      if (status === 1) {
        content = '确认要恢复该企业？'
        success = '恢复成功'
      } else {
        content = '确认要禁用该企业？'
        success = '禁用成功'
      }
      this.$Modal.confirm({
        title: title,
        content,
        onOk: (action, instance) => {
          let params = {
            id: this.entity.id,
            status: status
          }
          this.getApi().updateStatus(params).then(() => {
            this.success(success)
            enterpriseEventBus.$emit('list.update')
          })
        }
      })
    },
    updateDeploy(isDeploy) {
      let content, success
      let title = '提示'
      if (isDeploy === 1) {
        content = '确认要部署该企业？'
        success = '部署成功'
      } else {
        content = '确认要更改该企业为待部署状态？'
        success = '停止部署成功'
      }
      this.$Modal.confirm({
        title: title,
        content,
        onOk: (action, instance) => {
          let params = {
            enterpriseId: this.entity.id,
            isDeploy: isDeploy
          }
          this.getApi().updateDeploy(params).then(() => {
            this.success(success)
            enterpriseEventBus.$emit('list.update')
          })
        }
      })
    },
    // 打开编辑详情
    openEdit() {
      this.$emit('showForm', this.entity)
    },
    // 打开编辑小程序
    openConfigForm() {
      // 获取
      this.getApi().getEnterpriseMp(this.entity.id).then((data) => {
        this.configForm.show = true
        this.configForm.entity = data || {}
        this.configForm.entity.id = this.entity.id
      })
    },
    closeConfigForm() {
      this.configForm.id = ''
      this.configForm.show = false
    },
    // 添加名片数量
    afterSubmitCard() {
      this.cancelCard()
      this.entity = Object.assign({}, this.entity)
    },
    cancelCard() {
      this.card.entity.id = ''
      this.card.show = false
    },
    afterSubmitPwd() {
      this.cancelPwd()
    },
    cancelPwd() {
      this.password.entity.id = ''
      this.password.show = false
    }
  }
}
</script>
