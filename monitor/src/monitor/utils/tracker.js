import SlsWebLogger from 'js-sls-logger'

let userAgent = require('user-agent')

let host = 'cn-beijing.log.aliyuncs.com'
let project = 'zhimeng-h5'
let logstore = 'h5-dev'
let time = 5 // 5S上报一次

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
    this.logger = new SlsWebLogger({
      host,      
      project,
      logstore,
      time,
    })
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
    this.logger.send(log)
  }
}
export default new SendTracker()