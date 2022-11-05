
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface LocationState {
    cca2: string,
    currency: string[],
    callingCode: string[],
    name: string
}


const initialState = {
    cca2: 'SA',
    currency: ['SAR'],
    callingCode: ["966"],
    name: "Saudi Arabia"
}

export const LocationSlice = createSlice({
    name: 'Location',
    initialState,
    reducers: {
        Location: (state, action: PayloadAction<{cca2: string,currency: string[],callingCode: string[],name: string}>) => {
            return {
                callingCode:action.payload.callingCode,
                cca2:action.payload.cca2,
                currency:action.payload.currency,
                name:action.payload.name    
            }
        },


    },
})

// Action creators are generated for each case reducer function
export const { Location } = LocationSlice.actions

// export default function persistReducer<S, A extends Action = Action>


export default LocationSlice.reducer