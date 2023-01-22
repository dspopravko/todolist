import { appActions } from "../../Application";
import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { asyncActions } from "./authAsyncActions";

type AuthStateType = {
  user: string | null
  isAuth: boolean
  errors: string | null
  state: 'idle' | 'loading'
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {  user: null as string | null,
    isAuth: false,
    errors: null,
    state: 'idle'
  } as AuthStateType,
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
      state.isAuth = action.payload.value
    }
  },
  extraReducers: builder => {
    builder
      .addCase(appActions.initializeApp.fulfilled, (state) => {
        state.isAuth = true
      })
      .addCase(asyncActions.login.fulfilled, (state) => {
        state.isAuth = true
      })
      .addCase(asyncActions.logout.fulfilled, (state) => {
        state.isAuth = false
      })
      .addMatcher(isAnyOf(asyncActions.login.pending, asyncActions.logout.pending), (state) => {
        state.state = 'loading'
      })
      .addMatcher(isAnyOf(
        asyncActions.login.fulfilled,
        asyncActions.login.rejected,
        asyncActions.logout.fulfilled,
        asyncActions.logout.rejected,
      ), (state) => {
        state.state = 'idle'
      })
  }
})

export const authReducer = authSlice.reducer
export const authActions = authSlice.actions

