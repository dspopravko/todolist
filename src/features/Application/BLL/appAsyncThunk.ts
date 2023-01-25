import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../../api";

export const initializeApp = createAsyncThunk('app/initializeApp', async (param, { rejectWithValue }) => {
  const res = await auth.me()
  if (res.data.resultCode !== 0) {
    return rejectWithValue(res.data.messages)
  }
})
export const appAsyncActions = {
  initializeApp
}