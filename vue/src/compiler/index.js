// const htmlparser2 = require("htmlparser2")
import htmlparser2 from 'htmlparser2'
console.log(htmlparser2)
const parser = new htmlparser2.Parser({
  onopentag(name, attributes) {
    console.log(name, attributes)
  },
  ontext(text) {
    console.log(text)
  },
  onclosetag(tagname) {
    console.log(tagname)
  }
})

function parserHTML(html) {
  function advance(len) {
    html = html.substring(len)
  }
  // parser.write(html)
  // while(html) { // 看解析的内容是否存在，如果存在就不停地解析
  //   let textEnd = html.indexOf('<') // 当前解析的开头  
  //   if (textEnd === 0) {
  //     const startTagMatch = parseStartTag(html) // 解析开始标签
  //     break;
  //     if (startTagMatch) {

  //     }
  //     const endTagMatch = parseEndTag(html)
  //     if (endTagMatch) {

  //     }
  //   }
  // }
}

// html 字符串解析成对应的脚本来触发 tokens <div id="app">{{name}}</div>
export function compileToFunction(template) {
  parserHTML(template)
}