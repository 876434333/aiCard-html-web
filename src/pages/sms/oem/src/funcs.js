import { DEPLOY } from './const'

export function deployFilter(input) {
  return DEPLOY[`${input}`]
}
