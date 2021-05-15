/**
 * 如果网站提供了api接口，用 axios
 * 如果服务端渲染用 request
 * 复杂业务 用 puppeteer
 */

// 网络请求
// const axios = require('axios')
// const url = 'https://danjuanfunds.com/djapi/index_eva/dj'
// axios.get(url).then((result) => {
//   console.log(result.data)
// })

// puppeteer
const puppeteer = require('puppeteer')
const url = 'https://h5-test.fireflybao.com/catalog'
openUrl(url)


async function openUrl(url) {
  const browser = await puppeteer.launch({ headless: false }) // 打开一个无头浏览器
  const page = await browser.newPage() // 打开一个空白页面
  await page.goto(url, { waitUntil: 'networkidle2' }) // 地址栏输入地址，在network 空闲时间
  await page.screenshot({ path: 'images/catalog.png' }) // 截图当前页面，并保存早catalog

  await browser.close()
}
