<template>
    <div>
      <el-form-item :label="label" :prop="prop">
        <el-input v-model="data.value" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <vma-upload v-model="videoUrl" :limit="1" accept="audio/mp4,video/mp4"  uploadType="qiniu" />
      </el-form-item>
    </div>

</template>
<script>
import common from './common'
import ElFormItem from "../../../../../node_modules/element-ui/packages/form/src/form-item";
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {ElFormItem},
  mixins: [common],

  data() {
    return {
        videoUrl:""
    }
  },
  methods:{
    ...mapActions([
      'changeImageShowMode'
    ]),
  },
  mounted () {
    this.changeImageShowMode("video");
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    videoUrl: function (newVal, oldVal) {
      this.data.value = newVal;
    }
  },
}
</script>
