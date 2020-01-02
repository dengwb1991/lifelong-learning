import React, { useState, useEffect } from 'react'
import store from '../redux/store'
import { bindActionCreators } from 'owl-redux'
import { changeCount } from '../redux/counter'

const actions: any = bindActionCreators({ changeCount }, store.dispatch)

const hooks = () => {
  const [count, setCount] = useState(store.getState().counter.count)

  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    actions.changeCount(e.currentTarget.value)
    setCount(e.currentTarget.value)
  }

  useEffect(() => {
    const unSubscribe = store.subscribe(() => {
      const { counter } = store.getState()
      setCount(counter.count)
    })
    return () => unSubscribe()
  }, [count])

  return (
    <div>
      <h2>Modify the number by executing the `action` method</h2>
      <input value={ count } onChange={ onInput }/>
    </div>
  )
}

export default hooks