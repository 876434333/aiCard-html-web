<template>
  <div class="divide"
        :class="{full: fullScreen}">
    <div class="divide-item">
      <div class="panel">
        <div class="panel-body">
          <Form class="panel-form"
                inline>
            <div class="fr">
              <slot name="topTools"></slot>
            </div>
            <slot name="topContain"></slot>
          </Form>
        </div>
      </div>
    </div>
    <div class="task">
      <div class="task-l divide-item">
        <div class="panel">
          <div class="panel-header">
            <div class="panel-header-tools" v-if="$slots.sideTools">
              <slot name="sideTools"></slot>
            </div>
            <slot name="sideTitle"></slot>
          </div>
          <div class="panel-body">
            <slot name="sideContain"></slot>
          </div>
        </div>
      </div>

      <div class="task-r divide-main">
        <div class="panel">
          <div class="panel-header">
            <i class="icon icon-enlarge panel-header-icon"
                 :class="fullScreen ? 'icon-narrow' : 'icon-enlarge'"
                 @click="() => fullScreen = !fullScreen"></i>
            <div class="panel-header-tools" v-if="$slots.mainTools">
              <slot name="mainTools"></slot>
            </div>
            <slot name="mainTitle" tag="span"></slot>
          </div>
          <div class="panel-body">
            <slot name="mainContain"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullScreen: false
    }
  },
  components: {
  },
  computed: {
  },
  watch: {
  },
  methods: {
  },
  create () {
  }
}
</script>

<style>
</style>
