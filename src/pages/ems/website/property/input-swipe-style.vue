<template>

  <div>

  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    created: function () {
      this.changeImageShowMode("swipe");
    },
    methods: {
      ...mapActions([
        'changeImageShowMode'
      ])
    }
  }
</script>
