import {ActionTypes, AppThunk} from "../app/store";
import {tdType, todolistAPI} from "../api/todolist-api";
import {entityStatus, setAppErrorAC, setAppStatusAC} from "./app-reducer";

export type FilterValuesType = "all" | "completed" | "active"

export type TodolistType = tdType & {
    filter: FilterValuesType
    entityStatus: entityStatus
}

export type todolistActionType =
    RemoveTodolistAT
    | AddTodolistAT
    | ChangeTodolistFilterAT
    | ChangeTodolistTitleAT
    | SetTodolitsAT
    | changeTodolistEntityStatusAT

export const todolistReducer = (state: Array<TodolistType> = [], action: ActionTypes): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(td => td.id !== action.todolistId)
        case 'CHANGE-TODO-ENTITY-STATUS':
            return state.map(td => td.id === action.todolistId ? {...td, entityStatus: action.status} : td)
        case 'ADD-TODOLIST':
            const newtodolist: TodolistType = {
                id: action.id,
                filter: "all",
                title: action.title,
                addedDate: '',
                order: 0,
                entityStatus: entityStatus.idle
            }
            return [newtodolist, ...state];
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id !== action.todolistId ? t : {...t, title: action.title})
        case 'SET-TODOLISTS':
            return action.todolists.map((t: tdType) => ({...t, entityStatus: entityStatus.idle, filter: 'all'}))
        default:
            return state
    }
}

export const RemoveTodolistAC = (todolistId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        todolistId
    } as const
}
export const AddTodolistAC = (title: string, todolistId: string) => {
    return {
        type: "ADD-TODOLIST", title, id: todolistId
    } as const
}
export const ChangeTodolistFilterAC = (filter: FilterValuesType, todolistId: string) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        filter,
        todolistId
    } as const
}
export const ChangeTodolistTitleAC = (title: string, todolistId: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        title,
        todolistId
    }as const
}
export const SetTodolitsAC = (todolists: Array<tdType>) => {
    return {
        type: 'SET-TODOLISTS',
        todolists
    } as const
}
export const changeTodolistEntityStatusAC = (todolistId: string, status: entityStatus) => {
    return {
        type: 'CHANGE-TODO-ENTITY-STATUS',
        todolistId,
        status
    } as const
}

export type SetTodolitsAT = ReturnType<typeof SetTodolitsAC>
export type ChangeTodolistTitleAT = ReturnType<typeof ChangeTodolistTitleAC>
export type ChangeTodolistFilterAT = ReturnType<typeof ChangeTodolistFilterAC>
export type AddTodolistAT = ReturnType<typeof AddTodolistAC>
export type RemoveTodolistAT = ReturnType<typeof RemoveTodolistAC>
export type changeTodolistEntityStatusAT = ReturnType<typeof changeTodolistEntityStatusAC>

export const getTodolitsTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC(entityStatus.loading))
    todolistAPI.getTodolists()
        .then((res) => {
            dispatch(setAppStatusAC(entityStatus.succeeded))
            dispatch(SetTodolitsAC(res.data))
        })
}
export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC(entityStatus.loading))
    todolistAPI.updateTodolistTitle(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC(entityStatus.succeeded))
                dispatch(ChangeTodolistTitleAC(title, todolistId))
            }
        }).finally(() => {
        dispatch(changeTodolistEntityStatusAC(todolistId, entityStatus.idle))
    })
}
export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC(entityStatus.loading))
    todolistAPI.createTodolist(title)
        .then((res) => {
            dispatch(setAppStatusAC(entityStatus.succeeded))
            dispatch(AddTodolistAC(title, res.data.data.item.id))
        })
}
export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(changeTodolistEntityStatusAC(todolistId, entityStatus.loading))
    dispatch(setAppStatusAC(entityStatus.loading))
    todolistAPI.deleteTodolist(todolistId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC(entityStatus.succeeded))
                dispatch(RemoveTodolistAC(todolistId))
            }
        }).catch((err)=> {
        dispatch(setAppStatusAC(entityStatus.failed))
        dispatch(setAppErrorAC(err.message))
    })
}