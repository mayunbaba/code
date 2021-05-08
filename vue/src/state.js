import { observe } from "./observer/index"
import { isFunction } from "./utils"

export function initState(vm) {
  const opts = vm.$options
  if (opts.props) {
    initProps(vm)
  }
  if (opts.methods) {
    initMethods(vm)
  }
  if (opts.data) {
    initData(vm)
  }
  if (opts.computed) {
    initComputed(vm)
  }
  if (opts.watch) {
    initWatch(vm)
  }
}
function initProps(vm) {}
function initMethods(vm) {}
function initData(vm) {
  let { data } = vm.$options // vue内部对属性检测，如果key以$开头，不会进行代理
  // call改变this指向
  vm._data = data = isFunction(data) ? data.call(vm) : data
  for (let key in data) {
    proxy(vm, '_data', key)
  }
  observe(data)
}
function initComputed(vm) {}
function initWatch(vm) {}

function proxy(vm, source, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key]
    },
    set(newValue) {
      vm[source][key] = newValue
    }
  })
}