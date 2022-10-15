import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

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

export type actionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistFilterAT | ChangeTodolistTitleAT

export const todolistReducer = (state: Array<TodolistType>, action: actionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(td => td.id !== action.todolistId)
        case 'ADD-TODOLIST':
            const newtodolist: TodolistType = {
            id: action.id,
            filter: "all",
            title: action.title,
            color: "#f7f0ff"
        }
            return [newtodolist, ...state];
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id !== action.todolistId ? t : {...t, title: action.title})
        default:
            return state
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistAT => ({type: "REMOVE-TODOLIST", todolistId})
export const AddTodolistAC = (title: string): AddTodolistAT => ({type: "ADD-TODOLIST", title, id: v1()})
export const ChangeTodolistFilterAC = (filter: FilterValuesType, todolistId: string): ChangeTodolistFilterAT => ({type: 'CHANGE-TODOLIST-FILTER', filter,
    todolistId})
export const ChangeTodolistTitleAT = (title: string, todolistId: string): ChangeTodolistTitleAT => ({type: "CHANGE-TODOLIST-TITLE", title, todolistId})