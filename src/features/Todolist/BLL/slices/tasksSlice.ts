import { createSlice } from '@reduxjs/toolkit'
import { TaskType } from '../../../../models/MTask'
import { tdType } from '../../../../models/MTodolist'
import { tasksAsyncActions } from '../actions/taskAsyncActions'
import { todolistAsyncActions } from '../actions/todolistAsyncActions'

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {} as TasksStateType,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(todolistAsyncActions.addTodolist.fulfilled, (state, action) => {
        state[action.payload.id] = []
      })
      .addCase(
        todolistAsyncActions.removeTodolist.fulfilled,
        (state, action) => {
          delete state[action.payload.todolistId]
        }
      )
      .addCase(todolistAsyncActions.getTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((tl: tdType) => {
          state[tl.id] = []
        })
      })
      .addCase(tasksAsyncActions.getTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks
      })
      .addCase(tasksAsyncActions.removeTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((t) => t.id === action.payload.taskId)
        if (index > -1) {
          tasks.splice(index, 1)
        }
      })
      .addCase(tasksAsyncActions.addTask.fulfilled, (state, action) => {
        state[action.payload.todoListId].unshift(action.payload)
      })
      .addCase(tasksAsyncActions.updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((t) => t.id === action.payload.taskId)
        if (index > -1) {tasks[index] = { ...tasks[index], ...action.payload }}
      })
  },
})

export const tasksReducer = tasksSlice.reducer
export const tasksActions = tasksSlice.actions
