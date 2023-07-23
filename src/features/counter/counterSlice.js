import { createSlice } from '@reduxjs/toolkit'
export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    reset: (state) => {
      state.value = 0
    },

    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount, reset } =
  counterSlice.actions

export const incrementAsync = (amount, time) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount))
  }, time)
}

export const selectCount = (state) => state.counter.value

export default counterSlice.reducer
