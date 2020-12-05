import { STATUS } from './const'

export function statusFilter(input) {
  return STATUS[`${input}`]
}
