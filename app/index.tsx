import { h, create, diff, patch } from 'virtual-dom'

class Count {
  private count = 0

  up() {
    this.count++
    VirtualDOMSample.update(this)
  }

  render(): VirtualDOM.VNode {
    const styleProps = {
      textAlign: 'center',
      lineHeight: (100 + this.count) + 'px', 
      border: '1px solid red',
      width: (100 + this.count) + 'px',
      height: (100 + this.count) + 'px'
    }
    return <div style={styleProps} onclick={this.up}>{this.count}</div>
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
    console.log(element)
    const a = element as any
    console.log(a.tagName)
    let newTree = element.render()
    let patches = diff(tree, newTree)
    rootNode = patch(rootNode, patches)
    tree = newTree
  }
}

VirtualDOMSample.render(new Count(), document.body)