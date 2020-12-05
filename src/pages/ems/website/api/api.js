import axios from 'axios'


export default {
  uploadImageBase64(data){
    return axios({
      url:'/v1.0/file/base64',
      data,
      method:'POST'
    });
  },
  getDepartments(){
    return axios({
      url:'/V1.0/company/person/department/tree',
      method:'POST'
    });
  },
  getEmployeesByDepartment(id){
    return axios({
      url:'/V1.0/company/StaffByDepart/'+id,
      method:'GET'
    });
  },
  uploadHomePage(data){
    return axios({
      url:'/V1.0/company/mini/website',
      data:data,
      method:'POST'
    })
  },
  getHomePage(){
    return axios({
      url:'/V1.0/company/mini/website',
      method:'GET'
    })
  }
}
