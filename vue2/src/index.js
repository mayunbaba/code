import { initMixin } from "./init"

// 构造函数写法
function Vue (options) {
  this._init(options) // 入口方法，做初始化操作
}

// 写成插件,对原型扩展
initMixin(Vue)

export default Vue