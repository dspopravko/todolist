import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export enum entityStatus {
    loading,
    idle,
    succeeded,
    failed
}
export type errorType = string | null

const initialState = {
    status: entityStatus.loading as entityStatus,
    error: null as errorType
}

export const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{status: entityStatus}>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{error: errorType}>) {
            state.error = action.payload.error
        }
    }
})

export type AppReducerStateType = typeof initialState

export const appReducer = appSlice.reducer
