import { MyJSX } from './index'

function hello(id: string, name: string) {
  return <div id={id}>Hello <s>{name}!</s></div>
}

function foo(hoge: string, fuga: number) {
  return <foo hoge={hoge} fuga={fuga}></foo>
}

const e0 = hello('myid', 'my world')
console.log('hello', e0)

const e1 = foo('abc', 123)
console.log('foo', e1)
