// 拿到数组原型上的方法（原来的方法）
// 以下表示 Array 构造函数的原型，并允许您向所有Array对象添加新的属性和方法。
let oldArrayProtoMethods = Array.prototype

// 继承一下
// Object.create 一个新对象，带着指定的原型对象和属性
export let arrayMethods = Object.create(oldArrayProtoMethods)

// 这些方法会改变原数组
let methods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'reverse',
  'sort',
  'splice'
]

methods.forEach(method => {
  arrayMethods[method] = function(...args) { //this就是observer的value
    console.log('数组方法被调用', '更新视图')
    const result = oldArrayProtoMethods[method].call(this, ...args)
    let inserted // 数组方法修改的变量 push(1,2,3)
    let ob  = this.__ob__ // 根据当前数组获取到observer实例
    switch (method) {
      case 'push':
      case 'unshift': //这两个方法都是追加 追加的内容可能是对象类型，应该被再次劫持
        inserted = args
        break;
      case 'splice': // vue.$set原理
        inserted = args.slice(2) // arr.splice(0, 1, {a:1})
      default:
        break;
    }
    if (inserted) ob.observeArray(inserted) // 给数组新增的也要观测
    return result
  }
})