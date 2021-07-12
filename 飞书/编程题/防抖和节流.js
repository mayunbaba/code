/**
 * 防抖函数一般在拖拽、移动完成后执行一次，通过clearTimeout 实现
 * 节流是函数在指定时间执行一次，并在时间结束后再执行一次，通过判断timeout 是否存在实现
 * @param {*} func 
 * @param {*} wait 
 * @returns 
 */
function debounce(func, wait) {
  var timeout
  return function() {
    var context = this
    var args = arguments
    clearTimeout(timeout)
    timeout = setTimeout(function() {
      func.apply(context, args)
    }, wait)
  }
}

debounce(console.log(1), 1000)