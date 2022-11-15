import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT} from "./todolist-reducer";
import {ActionTypes} from "./store";

export type removeTaskAT = ReturnType<typeof removeTaskAC>
export type addTaskAT = ReturnType<typeof addTaskAC>
export type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
export type changeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>

export type tasksActionType = removeTaskAT | addTaskAT | changeTaskTitleAT | changeTaskStatusAT | AddTodolistAT | RemoveTodolistAT

const initialState: TasksStateType = {
    ["todolistId1"]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "ReactReactive", isDone: true}
    ],
    ["todolistId2"]: [
        {id: v1(), title: "Soup", isDone: false},
        {id: v1(), title: "Chicken Salad", isDone: true},
        {id: v1(), title: "Tosts", isDone: false},
        {id: v1(), title: "Beans", isDone: true}
    ],
    ["todolistId3"]: [
        {id: v1(), title: "Life and Fate", isDone: false},
        {id: v1(), title: "Geschichte eines Deutschen", isDone: true},
        {id: v1(), title: "The Autumn of the Patriarch", isDone: false},
        {id: v1(), title: "Lord of the Flies", isDone: true}
    ],
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionTypes): TasksStateType => {
    console.group('taskReducer: state then action')
    console.log(state)
    console.log(action)
    console.groupEnd()
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
            return state
    }
}

export const removeTaskAC = (taskID: string, todolistID: string) => ({type: "REMOVE-TASK", taskID, todolistID}) as const
export const addTaskAC = (todolistID: string, title: string) => ({type: "ADD-TASK", todolistID, title}) as const
export const changeTaskTitleAC = (todolistID: string, taskID: string, title: string) => ({type: "CHANGE-TASK-TITLE", todolistID, title, taskID}) as const
export const changeTaskStatusAC = (todolistID: string, taskID: string, status: boolean) => ({type: "CHANGE-TASK-STATUS", todolistID, status, taskID}) as const