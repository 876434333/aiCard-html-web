import axios from 'axios'

const MODULE = '/V1.0/common/point'

export default {
  /**
   * 条件查询列表
   * @param {*} data
    "create_time_end": "2018-06-21T08:31:25.289Z",
    "create_time_start": "2018-06-21T08:31:25.290Z",
    "enterprise_id": "string",
    "operation": "string",
    "page_num": 0,
    "page_size": 0
   */
  getPointList(data) {
    return axios({
      url: `${MODULE}/list`,
      method: 'POST',
      data
    })
  }
}
