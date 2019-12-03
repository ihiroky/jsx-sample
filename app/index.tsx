import { h, create, diff, patch } from 'virtual-dom'

interface Component {
  render(): VirtualDOM.VNode
}

class Count {
  private count = 0

  up() {
    this.count++
  }

  render(): VirtualDOM.VNode {
    const styleProps = {
      textAlign: 'center',
      lineHeight: (100 + this.count) + 'px', 
      border: '1px solid red',
      width: (100 + this.count) + 'px',
      height: (100 + this.count) + 'px'
    }
    return <div style={styleProps}>{this.count}</div>
  }
}

const count = new Count()
let tree = count.render()
let rootNode = create(tree)
document.body.appendChild(rootNode)

setInterval(() => {
  count.up()
  let newTree = count.render()
  let patches = diff(tree, newTree)
  rootNode = patch(rootNode, patches)
  tree = newTree
}, 1000)