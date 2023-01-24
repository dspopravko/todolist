import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { initializeApp } from "./appAsyncThunk";

type AppStateType = {
  status: 'idle' | 'loading'
  error: string | null
}

const initialState: AppStateType = {
  status: 'loading',
  error: null,
}

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setAppStatus(state, action: PayloadAction<{ status: AppStateType["status"] }>) {
      state.status = action.payload.status
    },
    setAppError(state, action: PayloadAction<{ error: AppStateType["error"] }>) {
      state.error = action.payload.error
    }
  }, extraReducers: builder => {
    builder.addMatcher(isAnyOf(initializeApp.fulfilled, initializeApp.rejected),
      (state) => {
        state.status = 'idle'
      });
  }
})

export type AppReducerStateType = typeof initialState

export const appReducer = appSlice.reducer
export const appCaseReducer = appSlice.caseReducers
export const appActions = appSlice.actions

