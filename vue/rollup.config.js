import babel from 'rollup-plugin-babel' // rollup 的 babel 插件，ES6转ES5
import serve from 'rollup-plugin-serve'
import nodeResolve from 'rollup-plugin-node-resolve' // 帮助寻找node_modules里的包
import commonjs from 'rollup-plugin-commonjs' // 将非ES6语法的包转为ES6可用

export default {
  input: './src/index.js', // 入口文件
  // 作用：指出应将哪些模块视为外部模块，否则会被打包进最终的代码里
  external: ['htmlparser2'],
  output: {
    format: 'umd', // 模块化类型 esModule commonjs模块
    name: 'Vue', // 全局变量的名字
    file: 'dist/umd/vue.js',
    sourcemap: true,
    globals: {
      htmlparser2: 'htmlparser2', // 这跟external 是配套使用的
    }
  },
  plugins: [
    nodeResolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs(),
    serve({
      open: true,
      port: 3000,
      contentBase: '',
      openPage: 'index.html'
    })
  ]
}