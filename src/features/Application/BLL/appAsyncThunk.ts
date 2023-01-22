import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../../api";

export const initializeApp = createAsyncThunk('app/initializeApp', async (param, { dispatch, rejectWithValue }) => {
  const res = await auth.me()
  if (res.data.resultCode !== 0) {
    return rejectWithValue(res.data.messages)
  }
})
export const asyncActions = {
  initializeApp
}