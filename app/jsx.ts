import { h } from 'virtual-dom'

export const VirtualDOMSample = (tagName: string, props: VirtualDOM.createProperties, children: string | VirtualDOM.VChild[]): VirtualDOM.VNode => {
  return h(tagName, props, children)
}