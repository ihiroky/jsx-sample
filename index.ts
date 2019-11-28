import { JSDOM } from 'jsdom'

const dom = new JSDOM('<html></html>')
const { document } = dom.window

export const MyJSXString = (tagName: string, props: {[key: string]: string}, ...children: (Element | string)[]) => {
  let attrs = ''
  for (const key in props) {
    attrs += ` ${key}="${props[key]}`
  }
  return `<${tagName}${attrs}>${children.join('')}</${tagName}>`
}

export const MyJSX = (tagName: string, props: {[key: string]: string}, ...children: (Element | string)[]) => {
  const element = document.createElement(tagName)
  console.debug('new element', element.tagName)

  for (const attr in props) {
    console.debug(' attribute', attr, ':', props[attr])
    element.setAttribute(attr, props[attr])
  }

  for (const c of children) {
    const node = (typeof c === 'string') ? document.createTextNode(c) : c
    console.debug(' content', c, ':', node)
    element.appendChild(node)
  }

  console.debug('end', element.tagName)
  return element
}