// 函数柯里化（curry）是函数式编程里面的概念。curry的概念很简单：只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。

// 简易版
const add = x => y => z => x + y + z;
console.log(add(1)(2)(3))
// 无法满意以下情况
// add(1, 2, 3);
// add(1, 2)(3);
// add(1)(2, 3);

const curry = (fn, ...args) =>
  // 函数的参数个数可以直接通过函数的.length属性来访问
  args.length >= fn.length // 这个判断很关键！！！
    // 传入的参数大于等于原始函数fn的参数个数，则直接执行该函数
    ? fn(...args)
    /**
     * 传入的参数小于原始函数fn的参数个数时
     * 则继续对当前函数进行柯里化，返回一个接受所有参数（当前参数和剩余参数） 的函数
    */
    : (..._args) => curry(fn, ...args, ..._args);
function add1(x, y, z) {
  return x + y + z;
}
const add2 = curry(add1)
console.log(add2(1, 2, 3));
console.log(add2(1)(2)(3));
console.log(add2(1, 2)(3));
console.log(add2(1)(2, 3));
