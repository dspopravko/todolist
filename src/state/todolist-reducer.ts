import {todolist} from "../api/todolist";
import {appSlice, entityStatus} from "./app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {tdType} from "../models/MTodolist";
import {handleServerAppError, handleServerNetworkError} from "../utils/errot-utils";

export type FilterValuesType = "all" | "completed" | "active"

export type TodolistType = tdType & {
    filter: FilterValuesType
    entityStatus: entityStatus
}

export const todolistSlice = createSlice({
    name: 'todolist',
    initialState: [] as Array<TodolistType>,
    reducers: {
        AddTodolist(state, action: PayloadAction<{ title: string, todolistId: string }>) {
            state.unshift({
                id: action.payload.todolistId,
                filter: "all",
                title: action.payload.title,
                addedDate: '',
                order: 0,
                entityStatus: entityStatus.idle
            })
        },
        RemoveTodolist(state, action: PayloadAction<{ todolistId: string }>) {
            const index = state.findIndex((td) => td.id === action.payload.todolistId)
            if (index > -1) state.splice(index, 1)
        },
        SetTodolits(state, action: PayloadAction<{ todolists: Array<tdType> }>) {
            return action.payload.todolists.map((t: tdType) => ({...t, entityStatus: entityStatus.idle, filter: 'all'}))
        },
        ChangeTodolistFilter(state, action: PayloadAction<{ filter: FilterValuesType, todolistId: string }>) {
            const index = state.findIndex((td) => td.id === action.payload.todolistId)
            state[index].filter = action.payload.filter
        },
        ChangeTodolistTitle(state, action: PayloadAction<{ title: string, todolistId: string }>) {
            const index = state.findIndex((td) => td.id === action.payload.todolistId)
            state[index].title = action.payload.title
        },
        changeTodolistEntityStatus(state, action: PayloadAction<{ todolistId: string, status: entityStatus }>) {
            const index = state.findIndex((td) => td.id === action.payload.todolistId)
            state[index].entityStatus = action.payload.status
        }
    }
})

export const todolistReducer = todolistSlice.reducer

export const getTodolitsTC = () => async (dispatch: Dispatch) => {
    dispatch(appSlice.actions.setAppStatus({status: entityStatus.loading}))
    try {
        const res = await todolist.getTodolists()
        dispatch(appSlice.actions.setAppStatus({status: entityStatus.succeeded}))
        dispatch(todolistSlice.actions.SetTodolits({todolists: res.data}))
    } catch (e) {
        if (e instanceof Error) handleServerNetworkError(e, dispatch)
    } finally {

    }
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => async (dispatch: Dispatch) => {
    dispatch(appSlice.actions.setAppStatus({status: entityStatus.loading}))
    try {
        const res = await todolist.updateTodolistTitle(todolistId, title)
        if (res.data.resultCode !== 0) {
            handleServerAppError(res.data, dispatch)
            return
        }
        dispatch(appSlice.actions.setAppStatus({status: entityStatus.succeeded}))
        dispatch(todolistSlice.actions.ChangeTodolistTitle({title: title, todolistId: todolistId}))
    } catch (e) {
        if (e instanceof Error) handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(todolistSlice.actions.changeTodolistEntityStatus({todolistId: todolistId, status: entityStatus.idle}))
    }
}
export const addTodolistTC = (title: string) => async (dispatch: Dispatch) => {
    dispatch(appSlice.actions.setAppStatus({status: entityStatus.loading}))
    try {
        const res = await todolist.createTodolist(title)
        if (res.data.resultCode !== 0) {
            handleServerAppError(res.data, dispatch)
            return
        }
        dispatch(appSlice.actions.setAppStatus({status: entityStatus.succeeded}))
        dispatch(todolistSlice.actions.AddTodolist({title: title, todolistId: res.data.data.item.id}))
    } catch (e) {
        if (e instanceof Error) handleServerNetworkError(e, dispatch)
    } finally {

    }
}
export const removeTodolistTC = (todolistId: string) => async (dispatch: Dispatch) => {
    dispatch(todolistSlice.actions.changeTodolistEntityStatus({todolistId: todolistId, status: entityStatus.loading}))
    dispatch(appSlice.actions.setAppStatus({status: entityStatus.loading}))

    try {
        const res = await todolist.deleteTodolist(todolistId)
        if (res.data.resultCode !== 0) {
            handleServerAppError(res.data, dispatch)
            return
        }
        dispatch(todolistSlice.actions.RemoveTodolist({todolistId: todolistId}))

    } catch (e) {
        if (e instanceof Error) handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(appSlice.actions.setAppStatus({status: entityStatus.idle}))
    }
}