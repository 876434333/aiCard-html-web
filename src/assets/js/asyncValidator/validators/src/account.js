export default (rule, value, callback, source, options) => {
  let errors = []
  if (value && !/^[\d|\w|_]{6,16}$/.test(value)) {
    errors.push(rule.message || '账号必须为6-16位字母、数字、下划线')
  }
  callback(errors)
}
