var a=1234567894532;
var b=1373439.4542;

// 方法一 截取字符串
function numFormat(num) {
  num = num.toString().split('.')
  let intStr = num[0]
  let r = []
  while( intStr.length > 0) {
    r.unshift(intStr.slice(-3))
    intStr = intStr.slice(0, -3)
    console.log(intStr)
  }
  return `${r.join(',')}.${num[1]}`
  
}
console.log(numFormat(b))
// 方法二 toLocaleString 小数部分会发生四舍五入
// 注：我测试的环境下小数部分会根据四舍五入只留下三位。
console.log(b.toLocaleString())

// 方法三 正则
function numFormat2(num) {
  const res = num.toString().replace(/\d+/, function(n) { // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g, function($1) {
      return $1 + ','
    })
  })
  return res
}
console.log(numFormat2(b))