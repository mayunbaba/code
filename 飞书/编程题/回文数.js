
/**
 * 回文数不能为负数
 * reverse 是Array方法
 * @param {number} x
 * @return {boolean}
 */
 var isPalindrome = function(x) {
  if (x < 0) return false
  const xArr = x.toString().split('')
  return xArr.reverse().join('') == x
};