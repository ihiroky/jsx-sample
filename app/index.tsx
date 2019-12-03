import { h, create, diff, patch } from 'virtual-dom'

namespace Store {
  const state: {[id: string]: any} = {}

  export function useState<T>(initialValue: T): [T, (u: T) => void] {
    for (;;) {
      const id = String(Math.floor(Math.random() * 4503599627370495))
      if (!state[id]) {
        state[id] = initialValue
        const setter = (u: T): void => {
          state[id] = u
        }
        return [initialValue, setter]
      }
    }
  }
}

namespace VirtualDOMSample {
  let rootNode: Element
  let tree: VirtualDOM.VNode

  export interface Component {
    render(): VirtualDOM.VNode
  }
  
  export const render = (element: Component, container: Node) => {
    tree = element.render()
    rootNode = create(tree)
    container.appendChild(rootNode)
  }

  export const update = (element: Component) => {
    let newTree = element.render()
    let patches = diff(tree, newTree)
    rootNode = patch(rootNode, patches)
    tree = newTree
  }
}

class Count {
  
  constructor() {
  }

  render(): VirtualDOM.VNode {
    const [count, setCount] =  Store.useState(0)


    const styleProps = {
      textAlign: 'center',
      lineHeight: (100 + count) + 'px', 
      border: '1px solid red',
      width: (100 + count) + 'px',
      height: (100 + count) + 'px'
    }

    return <div style={styleProps} onclick={setCount(count + 1)}>{count}</div>
  }
}

const count = new Count()
VirtualDOMSample.render(count, document.body)