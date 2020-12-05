<template>
  <el-form-item :label="label" :prop="data.value"  :rules="data.rules">
    <el-input v-model="data.value"  clearable></el-input>
  </el-form-item>

</template>
<script>
import common from './common'
import ElForm from "../../../../../node_modules/element-ui/packages/form/src/form";

export default {
  components: {ElForm},
  mixins: [common],

  data() {


    return {

    }
  }
}
</script>
