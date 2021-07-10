// 普及知识 Map
// Map结构提供了“值—值”的对应，是一种更完善的Hash结构实现。如果你需要“键值对”的数据结构，Map比Object更合适。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
const m = new Map([['micheal', {a: 1}],['bob',90],['baobao',100]])
console.log(m.get('micheal'))


// 深拷贝定义   将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且修改新对象不会影响原对象
const obj = {
  a: '1',
  b: () => 2,
  c: {
    d: '3'
  }
}
// 浅拷贝 只拷贝第一层数据，如果深层数据是对象依然是对象引用
const obj2 = { ...obj }
obj2.c.d = '4'
console.log(obj2, '浅拷贝')

// 方法一 拷贝其他引用类型、拷贝函数、循环引用等情况。值会消失
const r = JSON.parse(JSON.stringify(obj))
console.log(r, '简易版深拷贝')

// 方法二
// 不考虑循环引用情况下可以使用
function clone(target) {
  if (typeof target === 'object') {
    // 考虑是数组的情况
    let cloneTarget = Array.isArray(target) ? [] : {}
    Object.keys(target).forEach(key => {
      cloneTarget[key] = clone(target[key])
    })
    return cloneTarget
  } else {
    return target
  }
}
const r1 = clone(obj)
console.log(r1, '浅拷贝基础版')

obj.obj = obj // 循环引用
function deepClone(target, map = new Map()) {
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {}
    // 对值进行标记，是否赋值过
    if (map.get(target)) {
      return target
    }
    map.set(target, cloneTarget)
    Object.keys(target).forEach(key => {
      cloneTarget[key] = deepClone(target[key], map)
    })
    return cloneTarget
  } else {
    return target
  }
}
console.log(deepClone(obj), '最终版')

