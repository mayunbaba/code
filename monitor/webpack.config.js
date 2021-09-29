const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  context: process.cwd(), // 上下文目录
  mode: 'development', // 开发模式
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出目录
    filename: 'monitor.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist') // 静态文件根目录
  },
  plugins: [
    new HtmlWebpackPlugin({ // 自动打包出的html文件
      template: './src/index.html',
      inject: 'head'
    })
  ]
}