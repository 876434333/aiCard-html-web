<template>
  <div class="app-main">
    <transition mode="out-in"
                enter-active-class="bounceInDown"
                leave-active-class="bounceOutUp">
      <router-view class="animated" />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.app-main {
  height: 100%;
}
</style>
