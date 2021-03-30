import { initState } from "./state"

export function initMixin(Vue) {
  // 原型上不能使用箭头函数
  Vue.prototype._init = function (options) {
    const vm = this
    // 用户可以通过实例访问Vue属性
    vm.$options = options
    // 初始化状态（将数据做一个初始化的劫持 当我改变数据时，应该更新视图）
    // vue组件中状态 data props watch computed
    initState(vm)

    // 核心特性响应式原理
    // vue只是参考MVVM的框架 https://cn.vuejs.org/v2/guide/instance.html#%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA-Vue-%E5%AE%9E%E4%BE%8B
    // 数据变化视图更新，视图变化数据会受影响（MVVM）不能跳过数据去更新视图，$refs可以修改dom不是纯粹的mvvm
    // 
  }
}