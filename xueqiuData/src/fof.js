const fs = require('fs')
const path = require('path')
const axios = require('axios')
const xlsx = require('node-xlsx')


let page = '1'
const totalPage = '3'
// 积极增值
// const url = 'https://danjuanfunds.com/djapi/fundx/portfolio/v3/plan/united/page?tab=4&size=20&default_order=1&invest_strategy=&type=&manager_type=1&yield_between=-12~50%E4%BB%A5%E4%B8%8A&mz_between=1~34&page='
// 稳健理财
const url = 'https://danjuanfunds.com/djapi/fundx/portfolio/v3/plan/united/page?tab=2&size=20&default_order=0&invest_strategy=&type=&manager_type=&yield_between=&mz_between=&page='
const subUrl = 'https://danjuanfunds.com/djapi/plan/'
const subUrl2 = 'https://danjuanfunds.com/djapi/plan/nav/indicator?plan_code='
const name = '稳健理财'
let allData = []
const dataDict = {
  plan_name: '组合名称',
  yield: '成立以来收益',
  risk_coefficient: '风险系数（小于1，风险小于基准指数）',
  // follow_num: '关注人数',
  // manager_name: '管理者',
  // plan_tag: '投资方式',
  // manager_type: '0-基金达人，1-基金公司',
  // type: 'type',
  // invest_desc: '投资策略',
  yield_middle: '成立以来年化',
  // yield_t: '日涨跌',
  // found_date: '成立日期',
  invest_time_name: '建议',
  found_days: '成立天数',
  plan_derived: '近期数据',
  sharpe: '夏普比例'
}

getAllData()
  .then(() => {
    const xlsxData = formatArrayXlsx(allData)
    const buffer = xlsx.build([{ name, data: xlsxData }]);
    fs.writeFileSync(path.resolve(__dirname, `../dist/${name}.xlsx`), buffer, { 'flag': 'w' })
  })

async function getAllData() {
  const reqUrl = url + page
  await getListData(reqUrl)
  page++
  if (page <= totalPage) {
    await getAllData()
  } else {
    console.log('开始获取分页数据')
    for (let i = 0; i < allData.length; i++) {
      await getDetailData(allData[i], i)
    }
  }
}
async function getListData(url) {
  const res = await axios.get(url)
  let data = res.data.data.items
  allData = [...allData, ...data]
}

async function getDetailData(item, index) {
  const res = await axios.get(`${subUrl}${item.plan_code}`)
  const data = res.data.data
  const res2 = await axios.get(`${subUrl2}${item.plan_code}`)
  const data2 = res2.data.data
  Object.assign(item, data, data2)
}

function formatArrayXlsx(array) {
  const xlsxData = []
  array.forEach((item, index) => {
    // 表头数据
    let rowData = []
    if (index === 0) {
      Object.keys(item).forEach((key) => {
        if (dataDict[key]) {
          rowData.push(dataDict[key])
        }
      })
      xlsxData.push(rowData)
    }
    // 单行数据
    rowData = []
    if (item.found_days < 180) return
    Object.keys(item).forEach((key) => {
      if (dataDict[key]) {
        if (key === 'plan_derived') {
          item[key].yield_history.forEach((item,index) => {
            rowData.push(item.name)
            rowData.push(parseFloat(item.yield) || '')
          })
        } else {
          if (parseFloat(item[key])) {
            rowData.push(parseFloat(item[key]))
          } else {
            rowData.push(item[key])
          }
        }
      }
    })
    // rowData.push(JSON.stringify(item))
    xlsxData.push(rowData)
  })
  return xlsxData
}

