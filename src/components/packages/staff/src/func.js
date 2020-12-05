export let getSelectedCount = (dataList, flag1 = 'child', flag2 = 'checked') => {
  let count = 0
  let loop = (list) => {
    list.forEach(child => {
      if (child[flag2]) {
        count++
      }
      if (child[flag1] && child[flag1].length) {
        loop(child[flag1])
      }
    })
  }

  if (dataList && dataList.length) {
    loop(dataList)
  }
  return count
}

export let initFormatData = (dataList, formatType = 1) => {
  let loop = (children) => {
    let arr = []
    children.forEach(child => {
      let clone = Object.assign({}, child)
      clone.title = clone.name
      if (formatType === 1) {
        clone.checked = !!clone.isRole
      } else {
        clone.isRole = clone.checked ? 1 : 0
      }
      arr.push(clone)
      if (child.child && child.child.length) {
        clone.child = loop(child.child)
      }
    })
    return arr
  }

  if (dataList && dataList.length) {
    return loop(dataList)
  } else {
    return []
  }
}

// export let getPostData = (dataList) => {
//   let loop = (children) => {
//     let arr = []
//     children.forEach(child => {
//       let clone = Object.assign({}, child)
//       clone.title = clone.name
//       clone.checked = !!clone.is_Role
//       arr.push(clone)
//       if (child.child && child.child.length) {
//         clone.child = loop(child.child)
//       }
//     })
//     return arr
//   }
// }
