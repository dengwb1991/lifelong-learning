import React from 'react'
import ReactDOM from 'react-dom'
import './index.less'
import UseState from './use-state'
import UseAction from './use-action'

const A: React.SFC = () => {
  return (
    <>
      <UseState/>
      <UseAction/>
    </>
  )
}

ReactDOM.render(
  <>
    <A></A>
  </>,
  document.getElementById('app')
)