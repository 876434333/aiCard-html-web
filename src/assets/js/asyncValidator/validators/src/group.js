export default (rule, value, callback, source, options) => {
  let errors = []
  if (value && rule.group) {
    let type = rule.groupType || 'or'
    switch (type) {
      case 'or':
        if (Array.isArray(rule.group)) {
          let pass = false
          for (let validator of rule.group) {
            if (pass) {
              break
            }
            validator(rule, value, errs => {
              if (errs.length === 0) {
                pass = true
                errors = []
              } else {
                errors = errors.concat(errs)
              }
            }, source, options)
          }
        } else {
          rule.group(rule, value, errs => {
            errors = errs
          }, source, options)
        }
        break
    }
  }
  callback(errors)
}
