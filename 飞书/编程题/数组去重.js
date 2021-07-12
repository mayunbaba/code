var array = [1, 2, 1, 1, '1'];
// ES5
function unique(array) {
  const res = array.filter((item,index) => array.indexOf(item) === index)
  return res
}
console.log(unique(array))

// ES6
// Set是es6新增的数据结构，似于数组，但它的一大特性就是所有元素都是唯一的，没有重复的值，我们一般称为集合。
// Array.from() 方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。
function unique(array) {
  return Array.from(new Set(array));
}
function unique(array) {
  return [...new Set(array)];
}

// set并非数组
const set = new Set([1,2,3])
console.log(set.has(1))
