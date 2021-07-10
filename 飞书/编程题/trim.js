String.prototype.trim = function () {
  // \s 查找空白字符。 *多个前一个变量
  return this.replace(/^\s*/, '').replace(/\s*$/, '')
}
console.log('   前端面试    '.trim().length)
