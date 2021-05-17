import { isObject } from "../utils"
import { arrayMethods } from "./array"

// 如果数据是对象 会将对象不停地递归进行劫持
// 如果是数组，会劫持数组的方法 并对数组中不是基本数据类型的进行检测

class Observer {
  constructor(value) {
    // 使用defineProperty重新定义属性
    // 判断一个对象是否被观测过看他有没有 __ob__这个属性,并且让当前值可以访问当前this
    Object.defineProperty(value, '__ob__', {
      enumerable: false, // 不能被枚举，不能被循环出来 否则会出现死循环
      configurable: false, // 不能被修改
      value: this
    })
    // 不添加针对数组的单独处理 依然可以监听数组出行性能考虑对数组增加特殊处理
    if (Array.isArray(value)) {
      // 希望重写push pop shift unshift splice sort reverse
      // 函数劫持、切片编程
      value.__proto__ = arrayMethods
      // 如果数组中数据是对象类型，需要监控对象的变化
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }
  observeArray(value) {
    value.forEach(item => {
      observe(item)
    })
  }
  // 对对象中所有属性就行劫持
  walk(data) {
    let keys = Object.keys(data)
    keys.forEach(key => {
      defineReactive(data, key, data[key]) // Vue.util.defineReactive
    })
  }
}

// 监听当前变量的重要执行者
function defineReactive(data, key, value) {
  observe(value) // 本身用户默认值是对象套对象 需要递归处理（性能差）
  Object.defineProperty(data, key, {
    get() {
      console.log('用户获取到值')
      return value
    },
    set(newValue) {
      console.log('用户设置了值', data, key, value)
      if (newValue === value) return
      // 更新视图
      observe(newValue) // 如果用户赋值一个新对象，需要将这个对象进行劫持
      value = newValue
    }
  })
}

export function observe(data) {
  // 默认最外层的data必须是一个对象
  if (!isObject(data)) return
  if (data.__ob__) return data
  return new Observer(data)
}