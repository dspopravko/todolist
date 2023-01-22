import { createSlice } from "@reduxjs/toolkit";
import { TaskType } from "../../../../models/MTask";
import { tdType } from "../../../../models/MTodolist";
import { asyncActions } from "../actions/taskAsyncActions";
import { todolistsActions } from "../../index";

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {} as TasksStateType,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(todolistsActions.addTodolist.fulfilled, (state, action) => {
        state[action.payload.id] = []
      });
    builder
      .addCase(todolistsActions.removeTodolist.fulfilled, (state, action) => {
        delete state[action.payload.todolistId]
      });
    builder
      .addCase(todolistsActions.getTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((tl: tdType) => {
          state[tl.id] = []
        })
      });
    builder
      .addCase(asyncActions.getTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks
      })
    builder
      .addCase(asyncActions.removeTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex(t => t.id === action.payload.taskId)
        if (index > -1) {
          tasks.splice(index, 1)
        }
      })
    builder
      .addCase(asyncActions.addTask.fulfilled, (state, action) => {
        state[action.payload.todoListId].unshift(action.payload)
      })
    builder
      .addCase(asyncActions.updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex(t => t.id === action.payload.taskId)
        if (index > -1) tasks[index] = { ...tasks[index], ...action.payload }
      })
  }
})

export const tasksReducer = tasksSlice.reducer
export const tasksActions = tasksSlice.actions