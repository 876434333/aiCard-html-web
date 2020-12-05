<style>
  .w-35 {
    width: 35%;
  }
  .w-65 {
    width: 65%;
  }
  .delete-btn {
    border: none;
    background: red;
  }
  .doc {
    padding-left:15px;
  }
  .page {
    padding:15px 0 15px 0;
    text-align: right;
    background: #ffffff;
  }
  .clear{
    clear: both;
  }
</style>
<template>
  <div>
    <Form class="panel-form" inline>
      <FormItem>
        <Button type="primary" @click="addFile">新建文件夹</Button>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="renameFile">文件夹重命名</Button>
      </FormItem>
      <FormItem>
        <Upload multiple :action="uploadUrl" :data="docParams" :before-upload="beforeUpload" :on-success="uploadSuccess" :on-error="uploadError">
          <Button icon="ios-cloud-upload-outline">上传</Button>
        </Upload>
      </FormItem>
      <FormItem>
        <Button type="primary" class="delete-btn" @click="deleteFile">删除</Button>
      </FormItem>
    </Form>
    <div class="main">
      <div class="fl w-35">
        <Table :highlight-row="true"
          :columns="fileTable"
          :data="fileList"
          @on-current-change="chooseFile"/>
      </div>
      <div class="fr w-65 doc">
        <Table :columns="docTable"
          :data="docList"
          :stripe="true"
          @on-selection-change="selectDoc"
          @on-select-all="selectDoc"/>
        <page :pageNum="docListParams.pageNum"
          :pageSize="docListParams.pageSize"
          :total="docListTotalNum"
          :show-sizer="true"
          @on-change="onPageChange"
          @on-page-size-change="onPageSizeChange" class="page"/>
      </div>
      <div class="clear"></div>
    </div>
    <Modal v-model="inputShow">
      <Form class="panel-form mb-20" inline>
        <FormItem label="文件夹名称" :label-width="100" class="mt-25">
          <i-input v-model.trim="dirName" placeholder="请输入文件夹名称" type="text" style="width:200px"></i-input>
        </FormItem>
        <FormItem label="文件夹口令" :label-width="100">
          <i-input v-model.trim="dirPassword" :maxlength="maxLength" placeholder="请输入文件夹口令" type="text" style="width:200px"></i-input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancel">取消</Button>
        <Button type="primary" @click="sure">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { tableMixin } from '@/mixins'
import { fileApi } from '@/api/ems'
import userAvtor from '@/assets/images/file.png'
export default {
  mixins: [tableMixin],
  data() {
    return {
      userAvtor,
      inputShow: false,
      operateName: '新建',
      maxLength: 6,
      dirName: '',
      dirPassword: '',
      fileList: [],
      selectDocList: [],
      docList: [],
      docListParams: {
        pageNum: 1,
        pageSize: 10
      },
      docListTotalNum: 1,
      selectFileId: '',
      docParams: {
        dirId: ''
      },
      uploadUrl: '',
      fileTable: [
        { title: ' ',
          key: 'userAvtor',
          width: 50,
          render: (h, { row, column, index }) => {
            return (<div class='img-space-del-table'><img src={userAvtor} width="28px" height="28px" /></div>)
          }
        },
        { key: 'dirName', minWidth: 80, title: '文件夹目录' },
        { key: 'dirPassword', width: 100, title: '文件夹口令' },
        { title: '操作',
          width: 100,
          render: (h, params) => {
            let dom = null
            dom = (<div>
              <span class="text-link mr10" on-click={ () => { this.moveFile(1, params.row.id) } }>上移</span>
              <span class="text-link" on-click={ () => { this.moveFile(0, params.row.id) } }>下移</span>
            </div>)
            return dom
          }
        }
      ],
      docTable: [
        { key: 'fileName', title: '文件名' },
        { key: 'fileSize', width: 100, title: '大小 / kb' },
        { key: 'createTime', width: 150, title: '时间' },
        { title: '操作',
          width: 70,
          render: (h, params) => {
            let dom = null
            dom = (<div>
              <span class="text-link mr10" style="color:red;" on-click={ () => { this.deleteFileDoc(params.row.id) } }>删除</span>
            </div>)
            return dom
          }
        }
      ],
      // 添加编辑
      editVisible: false,
      id: '',
      selectFileList: []
    }
  },
  computed: {
  },
  mounted() {
  },
  watch: {
  },
  created() {
    this.getFileDirList()
    var config = require('../../../../config')
    if (!process.env.api) {
      process.env.api = config.dev.env.api
    }
    this.uploadUrl = process.env.api + '/' + fileApi.upload()
  },
  methods: {
    // 获取文件夹目录列表
    getFileDirList() {
      fileApi.getFileDirList().then((data) => {
        this.fileList = data
      })
    },
    // 获取文件列表
    getFileList() {
      fileApi.getFileList(this.selectFileId, this.docListParams).then((data) => {
        this.docList = data.dataList
        this.docListTotalNum = data.totalNum
        for (let key in this.docList) {
          let date = new Date(this.docList[key].createTime)
          let Y = date.getFullYear() + '-'
          let M = date.getMonth() + 1 + '-'
          let D = date.getDate() + ' '
          let h = date.getHours() + ':'
          let m = date.getMinutes() + ':'
          let s = date.getSeconds()
          this.docList[key].createTime = Y + M + D + h + m + s
          this.docList[key].fileSize = Math.floor(this.docList[key].fileSize / 1024 * 10) / 10
        }
      })
    },
    // 新建文件夹
    addFile() {
      this.dirName = ''
      this.dirPassword = ''
      this.operateName = '新建'
      this.inputShow = true
      this.selectFileId = ''
    },
    // 选择文件夹
    chooseFile(selection) {
      this.selectFileList = selection
      this.selectFileId = selection.id
      this.getFileList()
    },
    // 文件夹目录重命名
    renameFile() {
      if (!this.selectFileId) {
        this.$Message.error('请选择需要重命名的文件夹')
      } else {
        this.dirName = this.selectFileList.dirName
        this.dirPassword = this.selectFileList.dirPassword
        this.operateName = '删除'
        this.inputShow = true
      }
    },
    // 删除文件夹目录
    deleteFile() {
      if (!this.selectFileId) {
        this.$Message.error('请选择需要删除的文件夹')
      } else {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>删除后不可恢复，确认删除！</p>',
          onOk: () => {
            fileApi.deleteFileDir(this.selectFileId).then(() => {
              this.getFileDirList()
              this.success('删除成功！')
              this.selectFileId = ''
            })
          },
          onCancel: () => {}
        })
      }
    },
    // 删除文件列表
    deleteFileDoc(id) {
      if (!this.selectFileId) {
        this.$Message.error('请选择需要删除的文件夹')
      } else {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>删除后不可恢复，确认删除！</p>',
          onOk: () => {
            fileApi.deleteFile(id).then(() => {
              this.getFileList()
              this.success('删除成功！')
            })
          },
          onCancel: () => {}
        })
      }
    },
    // 选择文件
    selectDoc(selection) {
      this.selectDocList = selection
    },
    // 点击确定
    sure() {
      if (!this.dirName) {
        this.$Message.error('请输入文件夹名称')
        return false
      } else if (this.dirName.length > 61) {
        this.$Message.error('最多只能输入60个字')
        return false
      }
      if (this.dirPassword && this.dirPassword.length !== 6) {
        this.$Message.error('口令只能输入6个数字')
        return false
      }
      if (this.operateName === '新建') {
        let params = {
          dirName: this.dirName,
          dirPassword: this.dirPassword
        }
        fileApi.addFileDir(params).then((data) => {
          this.fileList = data
          this.inputShow = false
          this.getFileDirList()
        })
      } else {
        let params = {
          id: this.selectFileId,
          dirName: this.dirName,
          dirPassword: this.dirPassword
        }
        fileApi.updateFileDir(params).then(() => {
          this.inputShow = false
          this.getFileDirList()
          this.selectFileId = ''
          this.success('文件名修改成功！')
        })
      }
    },
    // 点击取消
    cancel() {
      this.inputShow = false
      this.dirName = ''
      this.dirPassword = ''
    },
    // 上传之前
    beforeUpload() {
      this.docParams.dirId = ''
      if (!this.selectFileId) {
        this.$Message.error('请选择文件夹')
        return false
      } else {
        this.docParams.dirId = this.selectFileId
      }
    },
    // 上传成功
    uploadSuccess() {
      this.getFileList()
      this.success('上传成功！')
    },
    uploadError(error, file) {
      console.info(error)
      this.$Message.error(file.err_msg)
    },
    // 点击文件列表分页数字
    onPageChange(pageNum) {
      this.docListParams.pageNum = pageNum
      this.docListParams.pageSize = 10
      this.getFileList()
    },
    // 切换文件列表每页显示数量
    onPageSizeChange(pageSize) {
      this.docListParams.pageNum = 1
      this.docListParams.pageSize = pageSize
      this.getFileList()
    },
    // 上移、下移
    moveFile(type, id) {
      let params = {
        is_move_up: type,
        id: id
      }
      fileApi.fileOrder(params).then(res => {
        this.getFileDirList()
      })
    }
  }
}
</script>
