
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onDeletCartItems } from '../actions/CartAction';

export interface CartState {
  data: any;
  quantity: number
}


const initialState: CartState = {
  data: [],
  quantity: 0
}

export const cartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    AddToCart: (state, action: PayloadAction<{ quantity: number, item: any }>) => {
      const quantity = action.payload.quantity;
      const item = [...action.payload.item]
      return{
            data:[...item],
            quantity:quantity
          }
    },

    DeletItemsFromCart: (state, action: PayloadAction<{catData:{data:[] ,quantity:number} , deleteArray:{ids:number[] , quantity:number}}>) => {
    
      const newState :CartState =  onDeletCartItems({catData:action.payload.catData , deleteArray:action.payload.deleteArray})
    
      //   const quantity = action.payload.quantity;
    //   const item = action.payload.item
      return newState
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { AddToCart , DeletItemsFromCart} = cartSlice.actions

// export default function persistReducer<S, A extends Action = Action>


export default cartSlice.reducer