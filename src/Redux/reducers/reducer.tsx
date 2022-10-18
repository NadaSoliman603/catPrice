import type { Reducer } from '@reduxjs/toolkit'
import { createAction, createReducer } from '@reduxjs/toolkit'


interface CounterState {
    value: number
}
const initialState = { value: 0 } as CounterState


export const rootReducer = createReducer(initialState , (builder)=>{
   
})


