import { h, create, diff, patch } from 'virtual-dom'

function render(count: number)  {
    return h('div', {
        style: {
            textAlign: 'center',
            lineHeight: (100 + count) + 'px', 
            border: '1px solid red',
            width: (100 + count) + 'px',
            height: (100 + count) + 'px'
        }
    }, [String(count)])
}

var count = 0
var tree = render(count)
var rootNode = create(tree)
document.body.appendChild(rootNode)

setInterval(() => {
      count++
      var newTree = render(count)
      var patches = diff(tree, newTree)
      rootNode = patch(rootNode, patches)
      tree = newTree
}, 1000);
