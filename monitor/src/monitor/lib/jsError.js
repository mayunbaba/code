import getLastEvent from "../utils/getLastEvent"
import getSelector from '../utils/getSelector'
import tracker from '../utils/tracker'

export function injectJsError() {
  // 监听全局未捕获错误
  window.addEventListener('error', event => {
    let lastEvent = getLastEvent() // 最后一个交互事件
    const log = {
      kind: 'stability', // 键控指标的大类
      type: 'error', // 小类型 这是一个错误
      errorType: 'jsError', // JS执行错误
      message: event.message, // 报错信息
      filename: event.filename, // 哪个文件报错
      position: `${event.lineno}:${event.colno}`, // 报错位置
      stack: getLines(event.error.stack),
      selector: lastEvent ? getSelector(lastEvent.path) : '', // 代表最后一个操作的元素
    }
    tracker.send(log)
  })
}

function getLines(stack) {
  // ^开始 \s空白 \s+任意空白符
  return stack.split('\n').slice(1).map(item => item.replace(/^\s+at\s+/g, '')).join('^')
}