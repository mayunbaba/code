let userAgent = require('user-agent')

let host = 'cn-beijing.log.aliyuncs.com'
let project = 'zhimeng-h5'
let logstore = 'h5-dev'

function getExtraData() {
  return {
    title: document.title,
    url: location.href,
    timestamp: Date.now(),
    userAgent: userAgent.parse(navigator.userAgent)
  }
}

class SendTracker {
  constructor() {
    this.url = `https://${project}.${host}/logstores/${logstore}/track` // 上报路径
    this.xhr = new XMLHttpRequest
  }
  send(data = {}) {
    const extraData = getExtraData()
    const log = { ...extraData, ...data }
    // 对象的值不能是数字
    // value必须是字符串不能是对象 阿里云要求
    for (let key in log) {
      if (typeof log[key] === 'number') {
        log[key] = String(log[key])
      }else if (typeof log[key] === 'object') {
        log[key] = JSON.stringify(log[key])
      }
    }
    const body = JSON.stringify({
      __logs__: [log]
    })
    this.xhr.open('POST', this.url, true)
    this.xhr.setRequestHeader('Content-Type', 'application/json') // 请求体类型
    this.xhr.setRequestHeader('x-log-apiversion', '0.6.0') // 版本号
    this.xhr.setRequestHeader('x-log-bodyrawsize', body.length) // 请求体的大小
    this.xhr.send(body)
  }
}
export default new SendTracker()