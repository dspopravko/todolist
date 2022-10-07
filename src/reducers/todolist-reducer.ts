import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    todolistId: string
}
export type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
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

export const todolistReducer = (todolists: Array<TodolistType>, action: actionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todolists.filter(td => td.id !== action.todolistId)
        case 'ADD-TODOLIST':
            const todolist: TodolistType = {
            id: v1(),
            filter: "all",
            title: action.title,
            color: "#f7f0ff"
        }
            return [todolist, ...todolists];
        case 'CHANGE-TODOLIST-FILTER':
            return todolists.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-TITLE':
            return todolists.map(t => t.id !== action.todolistId ? t : {...t, title: action.title})
        default:
            return todolists
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistAT => ({type: "REMOVE-TODOLIST", todolistId})
export const AddTodolistAC = (title: string): AddTodolistAT => ({type: "ADD-TODOLIST", title})
export const ChangeTodolistFilterAC = (filter: FilterValuesType, todolistId: string): ChangeTodolistFilterAT => ({type: 'CHANGE-TODOLIST-FILTER', filter,
    todolistId})
export const ChangeTodolistTitleAT = (title: string, todolistId: string): ChangeTodolistTitleAT => ({type: "CHANGE-TODOLIST-TITLE", title, todolistId})