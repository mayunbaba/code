export function isFunction(val) {
  return typeof val === 'function'
}
export function isObject(val) {
  // typeof null 也是object
  // 不是对象的判断 null === null true
  return typeof val === 'object' && val !== null
}