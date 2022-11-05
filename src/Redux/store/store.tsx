

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import  AuthSlice  from '../reducers/AuthReducer'
import cartSlice from '../reducers/CartReducer'
import  DrowerSlice  from '../reducers/DrowerNavigation'
import  LocationSlice  from '../reducers/LocationReducer'

const reuducer = combineReducers({
  Cart: cartSlice,
  Auth:AuthSlice,
  Drower:DrowerSlice,
  Location:LocationSlice
})

export const store = configureStore({
  reducer: reuducer,

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


