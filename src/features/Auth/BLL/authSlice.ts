import { appActions } from '../../Application'
import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit'
import { authAsyncActions } from './authAsyncActions'

type AuthStateType = {
  user: string | null
  isAuth: boolean
  errors: string | null
  state: 'idle' | 'loading'
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null as string | null,
    isAuth: false,
    errors: null,
    state: 'idle',
  } as AuthStateType,
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
      state.isAuth = action.payload.value
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(appActions.initializeApp.fulfilled, (state) => {
        state.isAuth = true
      })
      .addCase(authAsyncActions.login.fulfilled, (state) => {
        state.isAuth = true
      })
      .addCase(authAsyncActions.logout.fulfilled, (state) => {
        state.isAuth = false
      })
      .addMatcher(
        isAnyOf(
          authAsyncActions.login.pending,
          authAsyncActions.logout.pending
        ),
        (state) => {
          state.state = 'loading'
        }
      )
      .addMatcher(
        isAnyOf(
          authAsyncActions.login.fulfilled,
          authAsyncActions.login.rejected,
          authAsyncActions.logout.fulfilled,
          authAsyncActions.logout.rejected
        ),
        (state) => {
          state.state = 'idle'
        }
      )
  },
})

export const authReducer = authSlice.reducer
export const authActions = authSlice.actions
