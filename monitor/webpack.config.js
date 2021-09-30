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
    open: true,
    contentBase: path.resolve(__dirname, 'dist'), // 静态文件根目录
    // before用来配置路由
    before(router) {
      router.get('/success', (req, res) => {
        res.json({id: 1})
      })
      router.post('/error', (req, res) => {
        req.sendStatus(500)
      })
    }
  },
  plugins: [
    new HtmlWebpackPlugin({ // 自动打包出的html文件
      template: './src/index.html',
      inject: 'head'
    })
  ]
}