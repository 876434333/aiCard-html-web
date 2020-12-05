import axios from 'axios'
const MODULE = '/V1.0/company'
const removeEmpty = true
export default {
  list(data) {
    return axios({
      url: `${MODULE}/person/radar/select`,
      method: 'POST',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  update(data) {
    return axios({
      url: `${MODULE}/person/radar/update`,
      method: 'PUT',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  info() {
    return axios({
      url: `${MODULE}/person/radar/info`,
      method: 'GET',
      removeEmpty,
      responseType: 'json'
    })
  },
  refresh() {
    return axios({
      url: `${MODULE}/person/radar/refresh`,
      method: 'PUT',
      removeEmpty,
      responseType: 'json'
    })
  }
}
