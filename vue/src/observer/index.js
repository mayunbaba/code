import { arrayMethods } from "./array"

class Observer {
  constructor(value) {
    // 使用defineProperty重新定义属性
    // 判断一个对象是否被观测过看他有没有 __ob__这个属性
    Object.defineProperty(value, '__ob__', {
      enumerable: false, // 不能被枚举，不能被循环出来
      configurable: false, // 不能被修改
      value: this
    })
    // 不添加针对数组的单独处理 依然可以监听数组出行性能考虑对数组增加特殊处理
    if (Array.isArray(value)) {
      // 希望重写push pop shift unshift splice sort reverse
      // 函数劫持、切片编程
      value.__proto__ = arrayMethods
      // 观测数组中对象类型，对象变化也要做一些事
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
  walk(data) {
    let keys = Object.keys(data)
    keys.forEach(key => {
      defineReactive(data, key, data[key]) // Vue.util.defineReactive
    })
  }
}

// 监听当前变量的重要执行者
function defineReactive(data, key, value) {
  // data可能是多层，递归调用，给每个对象添加get set
  observe(value)
  Object.defineProperty(data, key, {
    get() {
      console.log('用户获取到值')
      return value
    },
    set(newValue) {
      console.log('用户设置了值', data, key, value)
      if (newValue === value) return
      observe(newValue) // 如果用户将值改为对象继续监控
      value = newValue
    }
  })
}

export function observe(data) {
  // typeof null 也是object
  // 不是对象的判断 null === null true
  if (typeof data !== 'object' || data === null) {
    return
  }
  if (data.__ob__) return data
  return new Observer(data)
}