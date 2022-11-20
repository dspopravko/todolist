import {v1} from "uuid";
import {ActionTypes} from "./store";
import {tdType, todolistAPI} from "../api/todolist-api";
import {Dispatch} from "redux";

export type FilterValuesType = "all" | "completed" | "active"

export type TodolistType = tdType & {
    filter: FilterValuesType
}

export type todolistActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistFilterAT | ChangeTodolistTitleAT | SetTodolitsAT

const initialState: Array<TodolistType> = [
    // {id: "todolistId1", title: "My learning goals", filter: "all", order: 0, addedDate: ""},
    // {id: "todolistId2", title: "What to cook", filter: "all", order: 0, addedDate: ""},
    // {id: "todolistId3", title: "What to read", filter: "all", order: 0, addedDate: ""}
]

export const todolistReducer = (state: Array<TodolistType> = initialState, action: ActionTypes): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            debugger
            console.log(action)
            console.log(state)
            return state.filter(td => td.id !== action.todolistId)
        case 'ADD-TODOLIST':
            const newtodolist: TodolistType = {
                id: action.id,
                filter: "all",
                title: action.title,
                addedDate: '',
                order: 0
            }
            return [newtodolist, ...state];
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id !== action.todolistId ? t : {...t, title: action.title})
        case 'SET-TODOLISTS':
            return action.todolists.map((t: tdType) => ({...t, filter: 'all'}))
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
export const AddTodolistAC = (title: string) => {
    return {
        type: "ADD-TODOLIST", title, id: v1()
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
export type SetTodolitsAT = ReturnType<typeof SetTodolitsAC>
export type ChangeTodolistTitleAT = ReturnType<typeof ChangeTodolistTitleAC>
export type ChangeTodolistFilterAT = ReturnType<typeof ChangeTodolistFilterAC>
export type AddTodolistAT = ReturnType<typeof AddTodolistAC>
export type RemoveTodolistAT = ReturnType<typeof RemoveTodolistAC>


export const getTodolitsTC = () => (dispatch: Dispatch) => {
    console.log('thunk')
    todolistAPI.getTodolists()
        .then((res) => dispatch(SetTodolitsAC(res.data)))
}