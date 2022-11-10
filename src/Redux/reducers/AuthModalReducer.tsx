
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ModalState {
  showen: boolean;
}


const initialState: ModalState = {
    showen: false,
}

export const ModalSlice = createSlice({
  name: 'Modal',
  initialState,
  reducers: {
    ShowModal: (state, action: PayloadAction<boolean>) => {
        console.log("show AuthModal")
      return {showen:action.payload}
    },
  },
})

// Action creators are generated for each case reducer function
export const { ShowModal } = ModalSlice.actions

// export default function persistReducer<S, A extends Action = Action>


export default ModalSlice.reducer