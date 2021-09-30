import tracker from '../utils/tracker';
import onload from '../utils/onload';

function getSelector(element) {
  if (!element) return ''
  if (element.id) {
    return `#${element.id}`
  } else {
    return element.nodeName.toLowerCase()
  }
}

export function blankScreen() {
  const wrapperElements = ['html', 'body', '#app']
  let emptyPoints = 0;
  function isWrapper(element) {
    const selector = getSelector(element)
    if (wrapperElements.includes(selector)) {
      emptyPoints++
    }
  }
  onload(function() {
    for(let i = 1; i <= 9; i++) {
      // 屏幕中间9个点
      const xElements = document.elementsFromPoint(
        window.innerWidth*i/10, window.innerHeight/2
      )
      // xElements 返回示例 [span, div.text, div#container, div, body, html]
      const yElements = document.elementsFromPoint(
        window.innerWidth/2, window.innerHeight*i/10
      )
      isWrapper(xElements[0])
      isWrapper(yElements[0])
    }
    if (emptyPoints >= 18) {
      let centerElements = document.elementFromPoint(
        window.innerWidth/2, window.innerHeight/2
      )
      tracker.send({
        kind: 'stability',
        type: 'blank',
        emptyPoints,
        screen: window.screen.width + 'X' + window.screen.height,
        viewPoint: window.innerWidth + 'X' + window.innerHeight,
        selector: getSelector(centerElements[0])
      })
    }
  })
}