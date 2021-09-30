import tracker from "../utils/tracker";
// fetch原理不同未监听
export function injectXHR() {
  let XMLHttpRequest = window.XMLHttpRequest
  const oldOpen = XMLHttpRequest.prototype.open
  XMLHttpRequest.prototype.open = function(method, url, async) {
    // 通过logstores 避免监听日志
    if (!url.match(/logstores/) && !url.match(/sockjs/)) {
      this.logData = {
        method,
        url,
        async,
      }
    }
    return oldOpen.apply(this, arguments)
  }
  const oldSend = XMLHttpRequest.prototype.send
  XMLHttpRequest.prototype.send = function(body) {
    if (this.logData) {
      const startTime = Date.now()
      const handler = (type) => (event) => {
        const duration = Date.now() - startTime
        const status = this.status // 200 500
        const statusText = this.statusText // OK Server Error
        // 接口成功不上报
        if (status === 200) return
        tracker.send({
          kind: 'stability',
          type: 'xhr',
          eventType: type, // load error abort
          pathname: this.logData.url, // 请求路径
          status: `${status}+${statusText}`, // 状态码
          duration, // 持续时间
          response: this.response ? JSON.stringify(this.response) : '', // 响应体
          params: body || '',
        })
      }
      this.addEventListener('load', handler('load'), false)
      this.addEventListener('error', handler('error'), false)
      this.addEventListener('abort', handler('abort'), false)
    }
    return oldSend.apply(this, arguments)
  }
}