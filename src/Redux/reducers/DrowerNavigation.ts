
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface DrowerState {
    title:  string,
    headerShown:boolean,

}


const initialState: DrowerState = {
    title: "Home",
    headerShown:true
}

export const DrowerSlice = createSlice({
    name: 'Drower',
    initialState,
    reducers: {
        Drower: (state, action: PayloadAction<{ title:  string,headerShown:boolean, }>) => {
            return {
                title: action.payload.title === "default" ?state.title : action.payload.title,
                headerShown:action.payload.headerShown
            }
        },


    },
})

// Action creators are generated for each case reducer function
export const { Drower } = DrowerSlice.actions

// export default function persistReducer<S, A extends Action = Action>


export default DrowerSlice.reducer