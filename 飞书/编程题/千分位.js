var a=1234567894532;
var b=1673439.4542;

function numFormat(num) {
  num = num.toString().split('.')
  let intStr = num[0]
  const r = []
  while( intStr.length > 3) {
    intStr = intStr.slice(-3)
    console.log(intStr)
  }
}
console.log(numFormat(b))