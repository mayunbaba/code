const fs = require('fs')
const path = require('path')
const axios = require('axios')
const xlsx = require('node-xlsx')


const url = 'https://danjuanfunds.com/djapi/index_eva/dj'
const name = '指数估值'
const dataDict = {
  id: 'id',
  index_code: '',
  name: '指数名称',
  ttype: '指数类型',
  pe: 'pe',
  pb: 'pb',
  pe_percentile: 'pe百分位',
  pb_percentile: 'pb百分位',
  roe: 'roe（净资产收益率）',
  yeild: '股息率',
  ts: '',
  eva_type: '风险等级',
  eva_type_int: '风险等级数字',
  url: '详情页地址',
  bond_yeild: '',
  begin_at: '开始时间',
  created_at: '创建时间',
  updated_at: '更新时间',
  peg: '预测PEG（市盈率相对盈利增长比率）',
  pb_flag: '是否用pb估值',
  pb_over_history: '',
  pe_over_history: '',
  date: '日期',
}
const deletekey = ['id', 'ts', 'created_at', 'updated_at', 'index_code', 'eva_type_int', 'bond_yeild', 'peg']
const timeKey = ['begin_at', 'created_at', 'updated_at', 'ts']
const percentKey = ['pe_percentile', 'pb_percentile', 'roe', 'yeild', 'pb_over_history', 'pe_over_history']

axios.get(url).then(res => {
  let { data } = res.data
  const xlsxData = formatArrayXlsx(data.items)
  const buffer = xlsx.build([{ name, data: xlsxData }]);
  fs.writeFileSync(path.resolve(__dirname, `../dist/${name}.xlsx`), buffer, { 'flag': 'w' })
})

function formatArrayXlsx(array) {
  const xlsxData = []
  array.forEach((item, index) => {
    // 表头数据
    let rowData = []
    if (index === 0) {
      Object.keys(item).forEach((key) => {
        if (!deletekey.includes(key)) {
          rowData.push(`${dataDict[key]}(${key})`)
        }
      })
      xlsxData.push(rowData)
    }
    // 单行数据
    rowData = []
    Object.keys(item).forEach((key) => {
      if (!deletekey.includes(key)) {
        if (timeKey.includes(key)) {
          rowData.push(new Date(item[key]))
        } else if (percentKey.includes(key)) {
          rowData.push(`${(item[key]*100).toFixed(2)}%`)
        } else {
          rowData.push(item[key])
        }
      }
    })
    xlsxData.push(rowData)
  })
  return xlsxData
}

