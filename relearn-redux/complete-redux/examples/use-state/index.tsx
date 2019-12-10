import React, { useState, useEffect } from 'react'
import store from '../redux/store'

const hooks = () => {
  const [count, setCount] = useState(store.getState().counter.count)

  const add = () => {
    store.dispatch({
      type: 'INCREMENT'
    })
    setCount(store.getState().counter.count)
  }

  const subtract = () => {
    store.dispatch({
      type: 'DECREMENT'
    })
    setCount(store.getState().counter.count)
  }

  useEffect(() => {
    const unSubscribe = store.subscribe(() => {
      const { counter } = store.getState()
      setCount(counter.count)
      console.log('subscribe:', counter.count)
    })
    return () => unSubscribe()
  }, [count])

  return (
    <div>
      <h2>Modify the number by executing the `dispatch` method</h2>
      <button onClick={ add }>Add</button>
      { count }
      <button onClick={ subtract }>Subtract</button>
    </div>
  )
}

export default hooks