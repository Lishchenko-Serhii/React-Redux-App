import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
  reset,
} from './counterSlice'

export function Counter() {
  const count = useSelector(selectCount)
  const dispatch = useDispatch()
  const [incrementAmount, setIncrementAmount] = useState('0')
  const [time, setTime] = useState(1000)

  return (
    <div className="counterDiv">
      <div>
        <h2>
          Это counter: <b> {count}</b>
        </h2>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>{' '}
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>{' '}
        <span> dicrement or increment</span>
      </div>
      <div>
        {' '}
        <h2>Set amount for added,invalid data is ignored (default 0)</h2>
        <input
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />{' '}
        <div>
          <h3>
            Set a time delay in a ms! Invalid data set default! (default 1000
            ms)
          </h3>
          <input
            aria-label="Set increment amount"
            value={time === 0 ? time : time ? time : 'no valid,default forever'}
            onChange={(e) => setTime(+e.target.value)}
          />
        </div>
        <div className="counterButton">
          <button
            onClick={() =>
              dispatch(incrementByAmount(Number(incrementAmount) || 0))
            }
          >
            Add {Number(incrementAmount) ? incrementAmount : 0} ,Sync
          </button>{' '}
          <button
            onClick={() =>
              dispatch(
                incrementAsync(Number(incrementAmount) || 0, time || 1000)
              )
            }
          >
            Add {Number(incrementAmount) ? incrementAmount : 0} ,Async whith
            delay {time ? time : 1000} ms.
          </button>{' '}
          <button onClick={() => dispatch(reset())}>Reset to zero</button>
        </div>
      </div>
    </div>
  )
}
