import { createAsyncThunk } from "@reduxjs/toolkit";
import { TaskType } from "../../../../models/MTask";
import { AppRootStateType, ThunkError } from "../../../../state/store";
import { taskAPI } from "../../../../api";
import { AxiosError } from "axios";
import { handleServerAppError, handleServerNetworkError } from "../../../../utils/error-utils";
import { TaskStatus } from "../../../../models/MTaskStatus";
import { UpdateTaskModelType } from "../../../../models/MUpdateTask";

const getTasks = createAsyncThunk<{ tasks: TaskType[], todolistId: string }, string, ThunkError>(
  'tasks/getTasks',
  async (todolistId, thunkAPI) => {
    try {
      const res = await taskAPI.getTasks(todolistId)
      return { tasks: res.data.items, todolistId: todolistId }
    } catch (e) {
      const error = e as AxiosError
      return handleServerNetworkError(error, thunkAPI)
    }
  })
const removeTask = createAsyncThunk<{ todolistId: string, taskId: string }, { todolistId: string, taskId: string }, ThunkError>('tasks/removeTask',
  async (param, thunkAPI) => {
    try {
      await taskAPI.deleteTask(param.todolistId, param.taskId);
      return { taskId: param.taskId, todolistId: param.todolistId }
    } catch (e) {
      const error = e as AxiosError
      return handleServerNetworkError(error, thunkAPI)
    }
  })
const addTask = createAsyncThunk<TaskType, { title: string, todolistId: string }, ThunkError>('tasks/addTask',
  async (param, thunkAPI) => {
    try {
      const res = await taskAPI.addTask(param.todolistId, param.title)
      if (res.data.resultCode !== 0) {
        handleServerAppError(res.data, thunkAPI)
        return
      }
      return res.data.data.item
    } catch (e) {
      const error = e as AxiosError
      return handleServerNetworkError(error, thunkAPI)
    }
  })

const updateTask = createAsyncThunk('tasks/updateTask',
  async (param: {
    todolistId: string,
    taskId: string,
    status: TaskStatus,
    title: string
  }, thunkAPI) => {

    const state = thunkAPI.getState() as AppRootStateType
    const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)
    if (!task) return thunkAPI.rejectWithValue('task not found in the app state')

    const model: UpdateTaskModelType = {
      ...task,
      title: param.title,
      status: param.status
    }

    try {
      const res = await taskAPI.updateTask(param.todolistId, param.taskId, model)
      if (res.data.resultCode !== 0) {
        handleServerAppError(res.data, thunkAPI)
        return
      }
      return param
    } catch (e) {
      const error = e as AxiosError
      return handleServerNetworkError(error, thunkAPI)
    }
  })

export const asyncActions = {
  getTasks,
  removeTask,
  addTask,
  updateTask,
}