import { configureStore } from '@reduxjs/toolkit'
import { Api } from '../../Api/redux'
import { setupListeners } from '@reduxjs/toolkit/query'
// import AuthReducer from '../reducers/AuthReducer'

export const store = configureStore({
  reducer: {
    [Api.reducerPath]: Api.reducer,
    // auth:AuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(Api.middleware),
})


setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


