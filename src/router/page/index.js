import * as types from './types'

export const isPageRouter = name => {
  return Object.keys(types).some(key => types[key] === name)
}

export default [{
  path: '/ems/website',
  name: types.WEBSTIE,
  component: resolve => require(['@/pages/ems/website/index'], resolve)
}]
