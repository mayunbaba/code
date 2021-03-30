class Observer {
  constructor(value) {
    // 使用defineProperty重新定义属性
    this.walk(value)
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
  return new Observer(data)
}