<template>
  <transition mode="out-in"
              enter-active-class="fadeInUp"
              leave-active-class="fadeOutDown">
    <router-view class="animated" />
  </transition>
</template>

<script>
export default {

}
</script>
