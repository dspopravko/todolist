import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { tasksActions, todolistsActions } from "../../Todolist";
import { authActions } from "../../Auth";
import { initializeApp } from "./appAsyncThunk";

type AppStateType = {
  status: 'idle' | 'loading'
  error: string | null
}

const initialState: AppStateType = {
  status: 'loading',
  error: null,
}

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setAppStatus(state, action: PayloadAction<{ status: AppStateType["status"] }>) {
      state.status = action.payload.status
    },
    setAppError(state, action: PayloadAction<{ error: AppStateType["error"] }>) {
      state.error = action.payload.error
    }
  }, extraReducers: builder => {
    builder
      .addMatcher(isAnyOf(
          tasksActions.addTask.pending,
          tasksActions.updateTask.pending,
          tasksActions.removeTask.pending,
          tasksActions.getTasks.pending,
          todolistsActions.addTodolist.pending,
          todolistsActions.changeTodolistTitle.pending,
          todolistsActions.getTodolists.pending,
          todolistsActions.removeTodolist.pending,
          authActions.login.pending,
          authActions.logout.pending,
        ),
        (state) => {
          state.status = 'loading'
        });
    builder.addMatcher(isAnyOf(
        tasksActions.addTask.fulfilled, tasksActions.addTask.rejected,
        tasksActions.updateTask.fulfilled, tasksActions.updateTask.rejected,
        tasksActions.removeTask.fulfilled, tasksActions.removeTask.rejected,
        tasksActions.getTasks.fulfilled, tasksActions.getTasks.rejected,
        todolistsActions.addTodolist.fulfilled, todolistsActions.addTodolist.rejected,
        todolistsActions.changeTodolistTitle.fulfilled, todolistsActions.changeTodolistTitle.rejected,
        todolistsActions.getTodolists.fulfilled, todolistsActions.getTodolists.rejected,
        todolistsActions.removeTodolist.fulfilled, todolistsActions.removeTodolist.rejected,
        authActions.login.fulfilled, authActions.login.rejected,
        authActions.logout.fulfilled, authActions.logout.rejected,
        initializeApp.fulfilled, initializeApp.rejected,
      ),
      (state) => {
        state.status = 'idle'
      });
  }
})

export type AppReducerStateType = typeof initialState

export const appReducer = appSlice.reducer
export const appCaseReducer = appSlice.caseReducers
export const appActions = appSlice.actions

