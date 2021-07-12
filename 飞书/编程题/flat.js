/**
 * break 跳出循环
 * continue 跳出当前循环
 * return 跳出当前函数并返回值
 */

const arr = [1, 2, 3, 4, [100, 200, 3000, [1, 2, 4, [1, 2, 5]]], 5, "string", { name: "弹铁蛋同学" }];
// 遍历数组的方法有太多，本文只枚举常用的几种
Array.prototype.flat = function (num = 1) {
  if (!Number(num) || Number(num) < 0) {
    return this;
  }
  let arr = this;    // 获得调用 fakeFlat 函数的数组
  while (num > 0) {           
    if (arr.some(x => Array.isArray(x))) {
      // arr = [].concat.apply([], arr);    // 数组中还有数组元素的话并且 num > 0，继续展开一层数组
      // 旧值展开作为参数传入进来
      arr = [].concat(...arr)
    } else {
      break; // 数组中没有数组元素并且不管 num 是否依旧大于 0，停止循环。
    }
    num--;
  }
  return arr;
}
console.log(arr.flat(3))