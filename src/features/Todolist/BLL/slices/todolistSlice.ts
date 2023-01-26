import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit'
import { tdType } from '../../../../models/MTodolist'
import { entityStatus } from '../../../../models/MEntityStatus'
import { todolistAsyncActions } from '../actions/todolistAsyncActions'
import { FilterValuesType } from '../../../../models/MFilterValues'
import { tasksAsyncActions } from '../actions/taskAsyncActions'

const { changeTodolistTitle, removeTodolist, addTodolist, getTodolists } =
  todolistAsyncActions

export type TodolistType = tdType & {
  filter: FilterValuesType
  tdStatus: entityStatus
}

const todolistSlice = createSlice({
  name: 'todolist',
  initialState: [] as Array<TodolistType>,
  reducers: {
    changeTodolistFilter(
      state,
      action: PayloadAction<{ filter: FilterValuesType; todolistId: string }>
    ) {
      const index = state.findIndex((td) => td.id === action.payload.todolistId)
      state[index].filter = action.payload.filter
    },
    changeTodolistEntityStatus(
      state,
      action: PayloadAction<{ todolistId: string; status: entityStatus }>
    ) {
      const index = state.findIndex((td) => td.id === action.payload.todolistId)
      state[index].tdStatus = action.payload.status
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodolists.fulfilled, (state, action) => {
        return action.payload.todolists.map((td: tdType) => ({
          id: td.id,
          filter: 'all',
          title: td.title,
          addedDate: '',
          order: 0,
          tdStatus: entityStatus.idle,
        }))
      })
      .addCase(changeTodolistTitle.fulfilled, (state, action) => {
        const index = state.findIndex(
          (tl) => tl.id === action.payload.todolistId
        )
        state[index].title = action.payload.title
      })
      .addCase(changeTodolistTitle.pending, (state, action) => {
        const index = state.findIndex(
          (tl) => tl.id === action.meta.arg.todolistId
        )
        state[index].title = action.meta.arg.title
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex(
          (td) => td.id === action.payload.todolistId
        )
        if (index > -1) {
          state.splice(index, 1)
        }
        state[index].tdStatus = entityStatus.idle
      })
      .addCase(removeTodolist.pending, (state, action) => {
        const index = state.findIndex(
          (td) => td.id === action.meta.arg.todolistId
        )
        state[index].tdStatus = entityStatus.loading
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        state.unshift({
          ...action.payload,
          filter: 'all',
          tdStatus: entityStatus.idle,
        })
      })
      .addMatcher(
        isAnyOf(
          changeTodolistTitle.pending,
          tasksAsyncActions.addTask.pending,
          tasksAsyncActions.updateTask.pending,
          tasksAsyncActions.removeTask.pending
        ),
        (state, action) => {
          const index = state.findIndex(
            (td) => td.id === action.meta.arg.todolistId
          )
          state[index].tdStatus = entityStatus.loading
        }
      )
      .addMatcher(
        isAnyOf(
          changeTodolistTitle.fulfilled,
          changeTodolistTitle.rejected,
          tasksAsyncActions.addTask.fulfilled,
          tasksAsyncActions.addTask.rejected,
          tasksAsyncActions.updateTask.fulfilled,
          tasksAsyncActions.updateTask.rejected,
          tasksAsyncActions.removeTask.fulfilled,
          tasksAsyncActions.updateTask.rejected
        ),
        (state, action) => {
          const index = state.findIndex(
            (td) => td.id === action.meta.arg.todolistId
          )
          state[index].tdStatus = entityStatus.idle
        }
      )
  },
})

export const todolistReducer = todolistSlice.reducer
export const todolistActions = todolistSlice.actions
