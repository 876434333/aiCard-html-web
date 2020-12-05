// oemCustomerController : 超级后台--贴牌商管理
import axios from 'axios'
const MODULE = 'V1.0/company/file'

export default {
  // 新建文件夹目录
  addFileDir(data) {
    return axios({
      url: `${MODULE}/addFileDir`,
      data,
      method: 'POST'
    })
  },
  // 删除文件夹目录
  deleteFileDir(id) {
    return axios({
      url: `${MODULE}/deleteFileDir/${id}`,
      method: 'GET'
    })
  },
  // 删除文件列表
  deleteFile(id) {
    return axios({
      url: `${MODULE}/deleteFile?id=${id}`,
      method: 'GET'
    })
  },
  // 获取文件夹目录列表
  getFileDirList() {
    return axios({
      url: `${MODULE}/getFileDirList`,
      method: 'GET'
    })
  },
  // 获取文件列表
  getFileList(dirId, data) {
    return axios({
      url: `${MODULE}/getFileList?dir_id=${dirId}`,
      data,
      method: 'POST'
    })
  },
  // 更新文件目录名字
  updateFileDir(data) {
    return axios({
      url: `${MODULE}/updateFileDir`,
      data,
      method: 'POST'
    })
  },
  // 上传文件
  upload() {
    return `${MODULE}/upload`
  },
  // 文件夹排序
  fileOrder(data) {
    return axios({
      url: `${MODULE}/updateDirOrder`,
      data,
      method: 'POST'
    })
  }
}
