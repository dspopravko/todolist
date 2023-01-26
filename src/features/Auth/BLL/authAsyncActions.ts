import { createAsyncThunk } from '@reduxjs/toolkit'
import { auth, LoginType } from '../../../api'
import { ThunkError } from '../../../state/store'
import {
  handleServerAppError,
  handleServerNetworkError,
} from '../../../utils/handeAsyncError'
import { AxiosError } from 'axios'

const login = createAsyncThunk<undefined, LoginType, ThunkError>(
  'auth/login',
  async (param, thunkAPI) => {
    try {
      const res = await auth.login(param)
      if (res.data.resultCode === 0) {
        return
      } else {
        handleServerAppError(res.data, thunkAPI)
      }
    } catch (e) {
      const error = e as AxiosError
      return handleServerNetworkError(error, thunkAPI)
    }
  }
)
const logout = createAsyncThunk<undefined, undefined, ThunkError>(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      const res = await auth.logout()
      if (res.data.resultCode === 0) {
        return
      } else {
        handleServerAppError(res.data, thunkAPI)
      }
    } catch (e) {
      const error = e as AxiosError
      return handleServerNetworkError(error, thunkAPI)
    }
  }
)
export const authAsyncActions = {
  login,
  logout,
}
