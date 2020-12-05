import { advApi } from '@/api/ems'

const editOrder = (id) => {
  if (document.querySelector('#span' + id).style.display === 'inline-block') {
    document.querySelector('#input' + id).style.display = 'inline-block'
    document.querySelector('#span' + id).style.display = 'none'
    document.querySelector('#span' + id).nextElementSibling.nextElementSibling.firstChild.nextElementSibling.className = 'ivu-icon ivu-icon-ios-checkmark'
  } else {
    document.querySelector('#input' + id).style.display = 'none'
    document.querySelector('#span' + id).style.display = 'inline-block'
    document.querySelector('#span' + id).firstChild.textContent = document.querySelector('#input' + id).firstChild.nextElementSibling.nextElementSibling.value
    document.querySelector('#span' + id).nextElementSibling.nextElementSibling.firstChild.nextElementSibling.className = 'ivu-icon ivu-icon-ios-redo'
    advApi.updateAdv({id: id, aOrder: document.querySelector('#input' + id).firstChild.nextElementSibling.nextElementSibling.value})
  }
}

export {
  editOrder
}
