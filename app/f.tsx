import { VirtualDOMJSX } from './index'

function Func(props: any) {
  return <div a={props.a}>{props.hello}</div>
}

console.log(<Func a={'aaa'} hello={'Hello!'}></Func>)