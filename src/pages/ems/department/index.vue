<template>
  <div class="panel department-tree">
    <div class="panel-body">
      <Tree :data="deptTree"
            ref="tree"
            :render="renderContent"></Tree>
    </div>
    <Modal v-model="delModal"
           title="删除"
           @on-ok="delDept">
      确定删除部门 【{{checkDept.name}}】？
    </Modal>
    <Modal v-model="addModal"
           title="新增"
           @on-ok="addDept">
      <Form :label-width="100">
        <FormItem label="上级部门">
          <i-input type="text"
                   v-model="checkDept.name"
                   placeholder="上级部门"
                   readonly="readonly"></i-input>
        </FormItem>
        <FormItem label="部门名称">
          <i-input type="text"
                   v-model="addDeptParam.name"
                   placeholder="部门名称"></i-input>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="editModal"
           title="编辑"
           @on-ok="editDept">
      <Form :label-width="100">
        <FormItem label="所属部门">
          <h3 type="text">{{editDeptParam.parent_name}}</h3>
          <Button type="primary"
                  @click="showdepttree">选择部门</Button>
        </FormItem>
        <FormItem label="部门名称">
          <i-input type="text"
                   v-model="editDeptParam.name"
                   placeholder="部门名称"></i-input>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="treeModal"
           title="选择上级部门">
      <Tree :data="deptTree"
            ref="tree"
            v-on:on-select-change="checkNode"></Tree>
    </Modal>
  </div>
</template>

<script>
import { orgApi } from '@/api/ems'
export default {
  name: 'index',
  data() {
    return {
      deptTree: [], // 树的数据
      checkDept: {}, // 选中的上级部门节点
      delModal: false,
      addModal: false,
      editModal: false,
      treeModal: false,
      addDeptParam: {}, // 添加部门参数
      editDeptParam: {} // 修改部门参数
    }
  },
  created() {
    orgApi.tree().then(data => { // 获取树的数据
      this.deptTree = data
    })
  },
  methods: {
    /**
     * 渲染
     * @param h
     * @param root
     * @param node
     * @param data
     * @returns {*}
     */
    renderContent(h, { root, node, data }) {
      return h('span', {
        style: {
          display: 'inline-block',
          width: '100%',
          color: '#2C393F',
          fontSize: '16px'
        }
      }, [h('span', [
        h('Icon', {
          props: {
            type: 'ios-paper-outline'
          },
          style: {
            marginRight: '10px'
          }
        }),
        h('span', data.title)
      ]),
      h('span', {
        style: {
          display: 'inline-block',
          float: 'right',
          marginRight: '32px'
        }
      }, [h('Button', {
        props: Object.assign({}, this.buttonProps, {
          icon: 'plus'
        }),
        style: {
          marginRight: '10px'
        },
        on: {
          click: () => { this.show_add_modal(data) }
        }
      }),
      h('Button', {
        props: Object.assign({}, this.buttonProps, {
          icon: 'close'
        }),
        on: {
          click: () => { this.show_del_modal(data) }
        }
      }),
      h('Button', {
        props: Object.assign({}, this.buttonProps, {
          icon: 'edit'
        }),
        on: {
          click: () => { this.show_edit_modal(data) }
        }
      })])])
    },
    /**
     * 打开增加部门弹窗
     * @param root
     * @param node
     * @param data
     */
    show_add_modal(root, node, data) {
      this.checkDept = {
        id: root.id,
        name: root.title
      }
      this.addModal = true
      this.addDeptParam.name = ''
    },
    /**
     * 打开删除部门弹窗
     * @param root
     * @param node
     * @param data
     */
    show_del_modal(root, node, data) {
      this.checkDept = {
        id: root.id,
        name: root.title
      }
      this.delModal = true
    },
    /**
     * 打开编辑部门弹窗
     * @param root
     * @param node
     * @param data
     */
    show_edit_modal(root, node, data) {
      if (root.id === '1') {
        alert('根节点无法修改')
        return
      }
      orgApi.deptName(root.parentId).then(data => {
        debugger
        this.editDeptParam = {
          id: root.id,
          name: root.title,
          parent_id: root.parentId,
          parent_name: data
        }
        this.editModal = true
      })
    },
    /*
    打开部门树弹窗
     */
    showdepttree() {
      this.treeModal = true
    },
    /**
     * 删除部门
     */
    delDept() {
      orgApi.delDept(this.checkDept.id).then(data => {
        orgApi.tree().then(data => { // 获取树的数据
          this.deptTree = data
        })
      })
    },
    /**
     * 添加部门
     */
    addDept() {
      this.addDeptParam.parentId = this.checkDept.id
      orgApi.addDept(this.addDeptParam).then(data => {
        orgApi.tree().then(data => { // 获取树的数据
          this.deptTree = data
        })
      })
    },
    /**
     * 编辑部门
     */
    editDept() {
      orgApi.editDept(this.editDeptParam).then(data => {
        orgApi.tree().then(data => { // 获取树的数据
          this.deptTree = data
        })
      })
    },
    /**
     * 选择上级部门
     * @param root
     */
    checkNode(root) {
      this.editDeptParam.parent_id = root[0].id
      this.editDeptParam.parent_name = root[0].title
    }

  }
}
</script>

<style scoped lang='scss'>
.department-tree {
  margin: 20px;
  width: 50%;
}
</style>
