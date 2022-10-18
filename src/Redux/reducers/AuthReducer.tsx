
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Auth {
  user: any
}


const initialState: Auth = {
    user: null,
  }
  
  export const AuthSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      login: (state, action: PayloadAction<any>) => {
        console.log(action.payload)
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { login } = AuthSlice.actions
  
  export default AuthSlice.reducer