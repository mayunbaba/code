/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 * 左右两项逐一替换
 */
var reverseString = function (s) {
  const len = s.length
  for (let left = 0, right = len - 1; left < right; left++, right--) {
    [s[left], s[right]] = [s[right], s[left]]
  }
};