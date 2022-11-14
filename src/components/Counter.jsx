import React from 'react'
import { useState } from 'react'

const Counter = () => {
    const [count, setCount] = useState(0)

    const increment = () => {
        setCount(count +1)
    }
    const decrement = () => {
        setCount(count -1)
    }
  return (
    <div>
        <h1>{count}</h1>
        <button onClick={increment}>increment</button>
        <button onClick={decrement}>increment</button>

    </div>
  )
}

export default Counter;