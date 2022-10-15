import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT} from "./todolist-reducer";

export type removeTaskAT = ReturnType<typeof removeTaskAC>
export type addTaskAT = ReturnType<typeof addTaskAC>
export type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
export type changeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>

export type actionType = removeTaskAT | addTaskAT | changeTaskTitleAT | changeTaskStatusAT | AddTodolistAT | RemoveTodolistAT

export const tasksReducer = (state: TasksStateType, action: actionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state,
            [action.todolistID]: state[action.todolistID]
                .filter(t => t.id !== action.taskID)}
        case "ADD-TASK":
            return {...state,
                [action.todolistID]:
                    [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistID]]}
        case "CHANGE-TASK-TITLE":
            return {...state,
                [action.todolistID]: state[action.todolistID]
                    .map(t => t.id === action.taskID ? {...t, title: action.title} : t)}
        case "CHANGE-TASK-STATUS":
            return {...state,
                [action.todolistID]: state[action.todolistID]
                    .map(t => t.id === action.taskID ? {...t, isDone: action.status} : t)}
        case 'ADD-TODOLIST':
            return {...state, [action.id]: []}
        case 'REMOVE-TODOLIST':
            const {[action.todolistId]: [], ...rest} = {...state}
            return rest
        default:
            throw new Error("I don't understand this type!")
    }
}

export const removeTaskAC = (taskID: string, todolistID: string) => ({type: "REMOVE-TASK", taskID, todolistID}) as const
export const addTaskAC = (todolistID: string, title: string) => ({type: "ADD-TASK", todolistID, title}) as const
export const changeTaskTitleAC = (todolistID: string, taskID: string, title: string) => ({type: "CHANGE-TASK-TITLE", todolistID, title, taskID}) as const
export const changeTaskStatusAC = (todolistID: string, taskID: string, status: boolean) => ({type: "CHANGE-TASK-STATUS", todolistID, status, taskID}) as const