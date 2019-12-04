import { h, create, diff, patch, createProperties, VChild } from 'virtual-dom'

namespace Observer {
  let timerId: NodeJS.Timeout
  export function debounce(func: () => void) {

    if (timerId) {
      clearTimeout(timerId)
    }
    timerId = setTimeout(() => {
      func()
    }, 50)
  }
}

namespace Hooks {
  const slots: Slot[] = []
  let currentSlotIndex = 0
  let hasUpdate = false

  interface Slot {
    id: number
    caller: any
    value: any
  }

  export function rewind() {
    currentSlotIndex = 0
  }

  function update() {
    rewind()
    VirtualDOMSample.update()
  }

  function ensure() {
   if (slots.length === currentSlotIndex)  {
     slots.push({
       id: slots.length,
       caller: null,
       value: null
     })
   }
  }

  export function useState<T>(initialValue: T): [T, (u: T) => void] {
    ensure()
  
    slots[currentSlotIndex].value = slots[currentSlotIndex].value || initialValue
    const thisCurrentHookIndex = currentSlotIndex
    const setter = function(u: T) {
      const slot = slots[thisCurrentHookIndex]
      slot.value = u
      //slot.caller = this.caller
      hasUpdate = true
    }
    return [slots[currentSlotIndex++].value, setter]
  }
}

namespace VirtualDOMSample {
  let actualDOM: Element
  let virtualDOM: VirtualDOM.VNode


  export interface Component {
    render(): VirtualDOM.VNode
  }
  
  export const render = (vNode: VirtualDOM.VNode, container: Node) => {
    virtualDOM = vNode
    actualDOM = create(virtualDOM)
    container.appendChild(actualDOM)
  }
  export const update = () => {
    let fc = virtualDOM.fc
    let newVirtualDOM = fc.func(fc.props)
    let patches = diff(virtualDOM, newVirtualDOM)
    actualDOM = patch(actualDOM, patches)
    virtualDOM = newVirtualDOM
  }
}

declare global {
  namespace VirtualDOM {
    interface VNode {
      fc: {
        "func": (...e: any) => VNode
        "props": createProperties
      }
    }
  }  
}

export const VirtualDOMJSX = (tag: (string | ((props: VirtualDOM.createProperties, children: string | VirtualDOM.VChild[]) => VirtualDOM.VNode)), props: VirtualDOM.createProperties, children: string | VirtualDOM.VChild[]): VirtualDOM.VNode => {
  console.log('tag', tag)
  if (typeof tag === 'string') {
    return h(tag, props, children)
  }
  
  const vNode = tag(props, children)
  vNode.fc = {
    "func": tag,
    "props": props
  }
  return vNode
}

function Count(props: VirtualDOM.createProperties, children: string | VirtualDOM.VChild[]) {
  const [count, setCount] = Hooks.useState(0)

  console.log('Count', props, children)
  const styleProps = {
    textAlign: 'center',
    lineHeight: (100 + count) + 'px', 
    border: '1px solid red',
    width: (100 + count) + 'px',
    height: (100 + count) + 'px'
  }
  return <div style={styleProps} onclick={setCount(count + 1)}>{count}</div>
}

function Hello() {
  return <div>Hello!</div>
}

function Hi() {
  return <div>Hi!</div>
}

VirtualDOMSample.render(<Count/>, document.body)