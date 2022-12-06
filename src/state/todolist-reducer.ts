import {tdType, todolistAPI} from "../api/todolist-api";
import {appSlice, entityStatus} from "./app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";

export type FilterValuesType = "all" | "completed" | "active"

export type TodolistType = tdType & {
    filter: FilterValuesType
    entityStatus: entityStatus
}

export const todolistSlice = createSlice({
    name: 'todolist',
    initialState: [] as Array<TodolistType>,
    reducers: {
        AddTodolistAC(state, action: PayloadAction<{title: string, todolistId: string}>) {
            state.unshift({
                id: action.payload.todolistId,
                filter: "all",
                title: action.payload.title,
                addedDate: '',
                order: 0,
                entityStatus: entityStatus.idle
            })
        },
        RemoveTodolistAC(state, action: PayloadAction<{todolistId: string}>) {
            const index = state.findIndex((td)=> td.id === action.payload.todolistId)
            if (index > -1) state.splice(index, 1)
        },
        SetTodolitsAC(state, action: PayloadAction<{todolists: Array<tdType>}>) {
            return action.payload.todolists.map((t: tdType) => ({...t, entityStatus: entityStatus.idle, filter: 'all'}))
        },
        ChangeTodolistFilterAC(state, action: PayloadAction<{filter: FilterValuesType, todolistId: string}>) {
            const index = state.findIndex((td)=> td.id === action.payload.todolistId)
            state[index].filter = action.payload.filter
        },
        ChangeTodolistTitleAC(state, action: PayloadAction<{title: string, todolistId: string}>) {
            const index = state.findIndex((td)=> td.id === action.payload.todolistId)
            state[index].title = action.payload.title
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{todolistId: string, status: entityStatus}>) {
            const index = state.findIndex((td)=> td.id === action.payload.todolistId)
            state[index].entityStatus = action.payload.status
        }
    }
})

export const todolistReducer = todolistSlice.reducer

export const getTodolitsTC = () => (dispatch: Dispatch) => {
    dispatch(appSlice.actions.setAppStatusAC({status: entityStatus.loading}))
    todolistAPI.getTodolists()
        .then((res) => {
            dispatch(appSlice.actions.setAppStatusAC({status: entityStatus.succeeded}))
            dispatch(todolistSlice.actions.SetTodolitsAC({todolists: res.data}))
        })
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(appSlice.actions.setAppStatusAC({status: entityStatus.loading}))
    todolistAPI.updateTodolistTitle(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(appSlice.actions.setAppStatusAC({status: entityStatus.succeeded}))
                dispatch(todolistSlice.actions.ChangeTodolistTitleAC({title: title, todolistId: todolistId}))
            }
        }).finally(() => {
        dispatch(todolistSlice.actions.changeTodolistEntityStatusAC({todolistId: todolistId, status: entityStatus.idle}))
    })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(appSlice.actions.setAppStatusAC({status: entityStatus.loading}))
    todolistAPI.createTodolist(title)
        .then((res) => {
            dispatch(appSlice.actions.setAppStatusAC({status: entityStatus.succeeded}))
            dispatch(todolistSlice.actions.AddTodolistAC({title: title, todolistId: res.data.data.item.id}))
        })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(todolistSlice.actions.changeTodolistEntityStatusAC({todolistId: todolistId, status: entityStatus.loading}))
    dispatch(appSlice.actions.setAppStatusAC({status: entityStatus.loading}))
    todolistAPI.deleteTodolist(todolistId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(appSlice.actions.setAppStatusAC({status: entityStatus.succeeded}))
                dispatch(todolistSlice.actions.RemoveTodolistAC({todolistId: todolistId}))
            }
        }).catch((err)=> {
        dispatch(appSlice.actions.setAppStatusAC({status: entityStatus.failed}))
        dispatch(appSlice.actions.setAppErrorAC(err.message))
    })
}