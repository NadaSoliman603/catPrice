
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  user: object | null;
  token: string | null
}


const initialState: AuthState = {
  user: null,
  token: null
}

export const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    Login: (state, action: PayloadAction<{ token: string | null, user: object | null; }>) => {
      const token = action.payload.token;
      const user = action.payload.user
      return {user: user,token: token}
    },
  },
})

// Action creators are generated for each case reducer function
export const { Login } = AuthSlice.actions

// export default function persistReducer<S, A extends Action = Action>


export default AuthSlice.reducer