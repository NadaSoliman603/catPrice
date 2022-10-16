import type { Reducer } from '@reduxjs/toolkit'
import { createAction, createReducer } from '@reduxjs/toolkit'


interface CounterState {
    value: number
}
const initialState = { value: 0 } as CounterState

const increment = createAction('counter/increment')
const decrement = createAction('counter/decrement')
const incrementByAmount = createAction<number>('counter/incrementByAmount')

export const rootReducer = createReducer(initialState , (builder)=>{
   
})


