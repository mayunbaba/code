// https://www.iwencai.com/stockpick/search?typed=1&preParams=&ts=1&f=1&qs=result_rewrite&selfsectsn=&querytype=bond&searchfilter=&tid=stockpick&w=%E5%8F%AF%E8%BD%AC%E5%80%BA%EF%BC%8C%E5%88%B0%E6%9C%9F%E6%97%A5%EF%BC%8C%E6%BA%A2%E4%BB%B7%E7%8E%87%3C15%25%EF%BC%8C%E5%88%B0%E6%9C%9F%E6%94%B6%E7%9B%8A%E7%8E%87%3E0
const path = require('path')
const xlsx = require('node-xlsx')
const fs = require('fs')
const { fileDisplay, sortBy, writeXlsx } = require('../utils')


const wencaiFile = fileDisplay(path.resolve(__dirname, './wencai/'))
// 待处理文件
const fileNameArr = [
  '2021-07-15.xls',
  '2021-07-13.xls',
]
const dataArr = []

// 读取文件并写入excel
fileNameArr.forEach(name => {
  const { absPath } = wencaiFile[name]
  const formData = xlsx.parse(absPath)[0].data
  dataArr.push(sortConvertibleBond(formData))
  writeXlsx(
    name,
    path.resolve(__dirname, `./resFile/${name}`),
    formData
  )
})
// 对比数据
let contrast = {
  name: `${fileNameArr[0]}-${fileNameArr[1]}`,
  data: []
}
const differencesInData = comparedata(dataArr[0], dataArr[1])
contrast.data.push(['新增转债', differencesInData.add.length])
contrast.data = [...contrast.data, ...sortBy(differencesInData.add)]
contrast.data.push(['移除转债', differencesInData.remove.length])
contrast.data = [...contrast.data, ...sortBy(differencesInData.remove)]
writeXlsx(
  contrast.name,
  path.resolve(__dirname, `./resFile/${contrast.name}`),
  contrast.data
)

// 按规则处理数据
function sortConvertibleBond(formData) {
  formData.shift()
  // 到期日 升序 数值越小越好
  // 溢价率 升序 数字越小越好
  // 到期收益率 降序 述职越大越好
  // 排序字典
  const keyMap = {
    '到期日': {
      index: 6,
      order: 1,
    },
    '溢价率': {
      index: 7,
      order: 1,
    },
    '到期收益率': {
      index: 8,
      order: -1
    },
  }
  // 添加排序字段
  formData.map(item => item.push(0))
  // 获取单条数据长度
  const len = formData[0].length

  Object.keys(keyMap).forEach(key => {
    const item = keyMap[key]
    sortBy(formData, item.index, item.order).map((item, index) => {
      item[len - 1] += index
    });
  })
  // 按照最后一项升序排序
  sortBy(formData, len - 1)
  // 取前20项
  formData.splice(20, formData.length - 1)
  return formData
}
// 对比两组数据
function comparedata(newData, oldData) {
  const common = newData.filter(item => oldData.some($item => $item[0] === item[0]))
  const add = newData.filter(item => !common.some($item => $item[0] === item[0]))
  const remove = oldData.filter(item => !common.some($item => $item[0] === item[0]))
  return {
    common,
    add,
    remove,
  }
}




