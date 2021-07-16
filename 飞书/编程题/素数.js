const num = 12

// 质数又称素数。一个大于1的自然数，除了1和它自身外，不能被其他自然数整除的数叫做质数；否则称为合数（规定1既不是质数也不是合数）。
function isPrime(num) {
  if (typeof num !== 'number' || !Number.isInteger(num)) {
    // Number.isInterget 判断是否为整数
    return false
  }
  // 2和3 是素数
  if (num <= 3) { return num > 1; }
  // i最大值是num的开方
  for (var i = 2; i * i <= num; i++) {
    if (num % i == 0) return false
  }
  return true;
}
console.log(isPrime(9))

// 质数求和
function count(range) {
  let counter = 0
  for (let i = 2; i < range; i++) {
    // 0 + true = 1
    counter += isPrime(i)
  }
  return counter
}
console.log(count(100))


// 我们可以看到，for循环只返回return所返回的值，并不会执行下一次循环。
// for (let i = 1; i < 10; i++) {
//   if (i == 5) return
//   console.log(i);
// }