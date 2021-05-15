const fs = require('fs')
const path = require('path')
const axios = require('axios')
const xlsx = require('node-xlsx')


let page = '1'
const totalPage = '2'
let url = `https://danjuanfunds.com/djapi/fundx/portfolio/v3/plan/united/page?tab=4&page=${page}&size=20&default_order=1&invest_strategy=&type=&manager_type=&yield_between=&mz_between=`
const subUrl = 'https://danjuanfunds.com/djapi/plan/'
const name = '基金组合'
let allData = []
const dataDict = {
  plan_code: '组合code',
  plan_name: '组合名称',
  yield: '成立以来收益',
  risk_coefficient: '风险系数（小于1，风险小于基准指数）',
  follow_num: '关注人数',
  manager_name: '管理者',
  manager_img_url: '管理者头像',
  plan_tag: '投资方式',
  manager_type: '0-基金达人，1-基金公司',
  type: '',
  invest_desc: '投资策略',
  link: '',
  charge: '',
  yield_middle: '成立以来年化',
  yield_t: '日涨跌',
  found_date: '成立日期',
  invest_time_name: '建议',
  found_days: '成立天数',

}
const deletekey = ['plan_code',
  'yield_name',
  'manager_img_url',
  'type',
  'link',
  'charge',
  'min_buy_amount',
  'status',
  'auto_invest_status',
  'growth_day',
  'manager_xq_id',
  'manager_profile_photo',
  'invest_time_type',
  'min_buy_amount',
  'yield_name_t',
  'sales']

getAllData()
  .then(() => {
    console.log(allData[0])
    const xlsxData = formatArrayXlsx(allData)
    const buffer = xlsx.build([{ name, data: xlsxData }]);
    fs.writeFileSync(path.resolve(__dirname, `../dist/${name}.xlsx`), buffer, { 'flag': 'w' })
  })

async function getAllData() {
  console.log(page)
  await getListData()
  page++
  if (page <= totalPage) {
    await getAllData()
  } else {
    for (let i = 0; i < allData.length; i++) {
      await getDetailData(allData[i], i)
    }
  }
}
async function getListData() {
  console.log(url)
  const res = await axios.get(url)
  let data = res.data.data.items
  allData = [...allData, ...data]
}

async function getDetailData(item, index) {
  const res = await axios.get(`${subUrl}${item.plan_code}`)
  const data = res.data.data
  Object.assign(item, data)
}

function formatArrayXlsx(array) {
  const xlsxData = []
  array.forEach((item, index) => {
    // 表头数据
    let rowData = []
    if (index === 0) {
      Object.keys(item).forEach((key) => {
        if (!deletekey.includes(key)) {
          rowData.push(`${dataDict[key]??''}(${key})`)
        }
      })
      xlsxData.push(rowData)
    }
    // 单行数据
    rowData = []
    Object.keys(item).forEach((key) => {
      if (!deletekey.includes(key)) {
        rowData.push(item[key])
      }
    })
    xlsxData.push(rowData)
  })
  return xlsxData
}

