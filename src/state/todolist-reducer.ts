import {v1} from "uuid";
import {ActionTypes} from "./store";

export type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    todolistId: string
}
export type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
    id: string
}
export type ChangeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    todolistId: string
}
export type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    todolistId: string
}

export type FilterValuesType = "all" | "completed" | "active"

export type TodolistType = {
    tdId: string
    title: string
    filter: FilterValuesType
}

export type todolistActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistFilterAT | ChangeTodolistTitleAT

const initialState: Array<TodolistType> = [
    {tdId: "todolistId1", title: "My learning goals", filter: "all"},
    {tdId: "todolistId2", title: "What to cook", filter: "all"},
    {tdId: "todolistId3", title: "What to read", filter: "all"}
]

export const todolistReducer = (state: Array<TodolistType> = initialState, action: ActionTypes): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(td => td.tdId !== action.todolistId)
        case 'ADD-TODOLIST':
            const newtodolist: TodolistType = {
                tdId: action.id,
            filter: "all",
            title: action.title
        }
            return [newtodolist, ...state];
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.tdId === action.todolistId ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.tdId !== action.todolistId ? t : {...t, title: action.title})
        default:
            return state
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistAT => ({type: "REMOVE-TODOLIST", todolistId})
export const AddTodolistAC = (title: string): AddTodolistAT => ({type: "ADD-TODOLIST", title, id: v1()})
export const ChangeTodolistFilterAC = (filter: FilterValuesType, todolistId: string): ChangeTodolistFilterAT => ({type: 'CHANGE-TODOLIST-FILTER', filter,
    todolistId})
export const ChangeTodolistTitleAC = (title: string, todolistId: string): ChangeTodolistTitleAT => ({type: 'CHANGE-TODOLIST-TITLE', title, todolistId})