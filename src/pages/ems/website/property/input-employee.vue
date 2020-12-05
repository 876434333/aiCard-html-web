<template>
  <div>
    <el-form-item label="部门">
      <!--<el-select-->
        <!--v-model="selectDepartmentId"-->
        <!--placeholder="请选择">-->
        <!--<el-option-->
          <!--v-for="(item,index) in departments"-->
          <!--:key="item.id"-->

          <!--:label="item.name"-->
          <!--:value="item.id"></el-option>-->
        <!---->
      <!--</el-select>-->
      <el-cascader
        @change="handleDepartmentChange"
        :props="props"
        change-on-select
        :options="departments">
      </el-cascader>
    </el-form-item>
    <el-form-item label="联系人">
      <el-select
        :loading="loadingEmployee"
        :change="selectEmployeeChange()"
        v-model="selectEmployeeId"
        placeholder="请选择">
        <el-option
          v-for="(item,index) in employees"
          :key="item.id"
          :label="item.name"
          :value="item.id" ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="已选择">
      <el-tag
        v-for="(item,index) in data.value"
        :key="item.id"
        @close="handleClose(item)"
        closable>
        {{item.name}}
      </el-tag>
    </el-form-item>




  </div>
</template>
<script>

  function deleteEmptyChildren(item) {
    if (item.children != null){
      if(item.children.length==0){
        delete item.children;
      }else{
        for(let i=0;i<item.children.length;i++){
          deleteEmptyChildren(item.children[i]);
        }
      }
    }
  }

  import common from './common'
  import props from '../constants/props'
  import api from '../api/api'
  import ElOption from "../../../../../node_modules/element-ui/packages/select/src/option";
  import ElFormItem from "../../../../../node_modules/element-ui/packages/form/src/form-item";
  export default {
    components: {
      ElFormItem,
      ElOption},
    mixins: [common],
    computed:{
    },
    mounted(){
      api.getDepartments().then((data)=>{
        console.log(data)
        for(let i=0;i<data.length;i++){
          deleteEmptyChildren(data[i]);
        }
        this.departments = data
      })
    },
    data(){
        return {
            selectedOptions:{},
            selectEmployeeId:"",
            loadingEmployee:false,
            props: {
              label:'title',
              value:"id"
            },
            departments:[
            ],
            employees:[
            ]
        };
    },
    watch:{

    },
    methods:{
      handleDepartmentChange(value) {
        let selectDepartmentId = value[value.length-1];
        api.getEmployeesByDepartment(selectDepartmentId).then(res=>{
          this.employees = res;
        })
      },
      handleClose(item){
          let index = this.data.value.indexOf(item);
          //this.data.value.splice(index,1);
          this.$delete(this.data.value,index);
          if (item.id == this.selectEmployeeId){
              this.selectEmployeeId = "";
          }

      },
      selectEmployeeChange(){
          if(this.selectEmployeeId=="")return;
          if (this.isExist()){
              this.$set(this.data.value,this.data.value.length,this.getEmployee());
          }

      },
      isExist(){
        for (var i=0;i<this.data.value.length;i++){
          let item = this.data.value[i];
          if (item.id==this.selectEmployeeId){
            return false;
          }
        }
        return true;
      },
      getEmployee(){
          for (var i=0;i<this.employees.length;i++){
              let item = this.employees[i];
              if (this.selectEmployeeId == item.id){
                  return item;
              }
          }
          return {};
      }
    }
  }
</script>
<style lang="less" scoped>
  .el-select{
    width: 100%;
    .el-select__tags{
      width: 100%;
    }
  }
  .el-cascader{
    width: 100%;

  }
</style>
