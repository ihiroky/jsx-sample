/* @jsx h */
declare namespace h.JSX {
  type Element = VirtualDOM.VNode

  interface IntrinsicElements {
    [name: string]: any
  }
}
