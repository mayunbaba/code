
// 遍历文件输出文件目录
function fileDisplay(filePathOuter) {
  const fs = require('fs')
  const path = require('path')
  const excludeFile = ['.DS_Store']
  // 根据文件路径读取文件，返回文件列表
  const allFilesAbsolutePath = {}
  function inner(filePath) {
    const files = fs.readdirSync(filePath)
    for (let i = 0; i < files.length; i++) {
      if (excludeFile.includes(files[i])) continue
      // 获取当前文件的绝对路径
      const filedir = path.resolve(filePath, files[i])
      // 根据文件路径获取文件信息，返回一个fs.Stats对象
      const stats = fs.statSync(filedir)
      const isFile = stats.isFile() // 是文件
      const isDir = stats.isDirectory() // 是文件夹
      if (isFile) {
        allFilesAbsolutePath[files[i]] = {
          name: files[i],
          absPath: path.resolve(filePath, files[i])
        }
      }
      if (isDir) {
        inner(filedir)// 递归，如果是文件夹，就继续遍历该文件夹下面的文件
      }
    }
    return allFilesAbsolutePath
  }
  return inner(filePathOuter)
}
function sortBy(array, key, order = 1) {
  return array.sort((a, b) => {
    const x = getObjectValue(a, key)
    const y = getObjectValue(b, key)
    return  x < y ? -order : x > y ? order : 0
  })
}
function getObjectValue(obj, key) {
  if (!key) return obj
  const keys = key.toString().split('.')
  let newObj = obj
  keys.forEach((item) => {
    newObj = newObj[item]
  })
  return newObj
}
function writeXlsx(name, path, data) {
  const xlsx = require('node-xlsx')
  const fs = require('fs')
  const buffer = xlsx.build([{ name, data }]);
  fs.writeFileSync(path, buffer, { 'flag': 'w' })
}

module.exports.fileDisplay = fileDisplay
module.exports.sortBy = sortBy
module.exports.writeXlsx = writeXlsx