<template>
  <transition name="ease">
    <div class="view-page container"
         :style="style"
         v-show="value">

      <div class="panel">
        <div class="panel-header">
          <div class="panel-header-tools">
            <Icon type="close"
                  class="panel-close"
                  @click.native="close"
                  v-if="showClose"></Icon>
          </div>
          {{title}}
        </div>
        <div class="panel-body">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import popupManager from '../popupManager'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '标题'
    },
    showClose: {
      type: Boolean,
      default: true
    },
    fixedScrollDom: {
      default: '.frame-main'
    }
  },
  data() {
    return {
      style: {
        zIndex: 1,
        top: 0,
        left: 0
      },
      domScroll: '',
      initial: false
    }
  },
  mounted() {
    let scrollDom = this.getScrollDom()
    if (scrollDom) {
      scrollDom.appendChild(this.$el)
    }
  },
  destroyed() {
    let scrollDom = this.getScrollDom()
    if (scrollDom) {
      scrollDom.removeChild(this.$el)
      if (this.value) {
        scrollDom.style.overflow = this.domScroll
      }
    }
  },
  watch: {
    'value': {
      immediate: true,
      handler(val) {
        let scrollDom = this.getScrollDom()
        if (val) {
          this.style.zIndex = popupManager.next()
          if (scrollDom) {
            this.domScroll = scrollDom.style.overflow
            scrollDom.style.overflow = 'hidden'
            this.style.left = scrollDom.scrollLeft + 'px'
            this.style.top = scrollDom.scrollTop + 'px'
          }
          this.initial = true
        } else if (this.initial) {
          if (scrollDom) {
            scrollDom.style.overflow = this.domScroll
            this.domScroll = ''
          }
        }
      }
    }
  },
  methods: {
    close() {
      this.$emit('change', false)
    },
    getScrollDom() {
      if (this.fixedScrollDom) {
        return document.querySelector(this.fixedScrollDom)
      }
      return null
    }
  }
}
</script>
