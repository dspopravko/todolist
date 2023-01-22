import { createAsyncThunk } from "@reduxjs/toolkit";
import { tdType } from "../../../../models/MTodolist";
import { ThunkError } from "../../../../state/store";
import { todolist } from "../../../../api";
import { handleServerAppError, handleServerNetworkError } from "../../../../utils/error-utils";
import { AxiosError } from "axios";
import { TodolistType } from "../slices/todolistSlice";

const getTodolists = createAsyncThunk<{ todolists: TodolistType[] }, undefined, ThunkError>(
  'todolists/getTodolits', async (param, thunkAPI) => {
    try {
      const res = await todolist.getTodolists()
      return { todolists: res.data }
    } catch (e) {
      const error = e as AxiosError
      return handleServerNetworkError(error, thunkAPI)
    }
  })
const changeTodolistTitle = createAsyncThunk<{ title: string, todolistId: string }, { todolistId: string, title: string }, ThunkError>(
  'todolists/changeTodolistTitle', async ({ todolistId, title }, thunkAPI) => {
    try {
      const { data } = await todolist.updateTodolistTitle(todolistId, title)
      if (data.resultCode !== 0) {
        handleServerAppError(data, thunkAPI)
        thunkAPI.dispatch(getTodolists())
        return
      }
      return { todolistId: todolistId, title: title }
    } catch (e) {
      const error = e as AxiosError
      return handleServerNetworkError(error, thunkAPI)
    }
  })
const addTodolist = createAsyncThunk<tdType, { title: string }, ThunkError>(
  'todolists/addTodolist', async ({ title }, thunkAPI) => {
    try {
      const { data } = await todolist.createTodolist(title)
      if (data.resultCode !== 0) {
        handleServerAppError(data, thunkAPI)
        return
      }
      return { ...data.data.item }
    } catch (e) {
      const error = e as AxiosError
      return handleServerNetworkError(error, thunkAPI)
    }
  })
const removeTodolist = createAsyncThunk<{ todolistId: string }, { todolistId: string }, ThunkError>(
  'todolists/removeTodolist', async ({ todolistId }, thunkAPI) => {
    try {
      const { data } = await todolist.deleteTodolist(todolistId)
      if (data.resultCode !== 0) {
        handleServerAppError(data, thunkAPI)
        return
      }
      return { todolistId }
    } catch (e) {
      const error = e as AxiosError
      return handleServerNetworkError(error, thunkAPI)
    }
  })
export const asyncActions = {
  getTodolists,
  changeTodolistTitle,
  addTodolist,
  removeTodolist,
}