export default {
  typeTabsList: [{
    name: '全部',
    value: ''
  }, {
    name: '公司',
    value: 1
  }, {
    name: '个人',
    value: 0
  }],
  contentFil(val) {
    if (val) {
      let delLebal = val.replace(/<\/?.+?\/?>/g, '')
      let delSpecial = delLebal.replace(/&.+;/g, '')
      return delSpecial
    }
  }
}
