import {v1} from "uuid";
import {ActionTypes, AppRootStateType, AppThunk} from "./store";
import {Priority, taskAPI, TaskStatus, TaskType, UpdateTaskModelType} from "../api/todolist-api";
import {AddTodolistAT, RemoveTodolistAT} from "./todolist-reducer";
import {Dispatch} from "redux";

export type addTaskAT = ReturnType<typeof addTaskAC>
export type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
export type changeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type setTasksAT = ReturnType<typeof setTasksAC>
export type deleteTaskAT = ReturnType<typeof deleteTaskAC>

export type tasksActionType =
    addTaskAT
    | changeTaskTitleAT
    | changeTaskStatusAT
    | AddTodolistAT
    | RemoveTodolistAT
    | setTasksAT
    | deleteTaskAT

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const tasksReducer = (state: TasksStateType = {}, action: ActionTypes): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            console.log(action)
            console.log(action.todolistId)
            console.log(state[0])
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistID]:
                    [
                        {...action.task},
                        ...state[action.todolistID]
                    ]
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistID]: state[action.todolistID]
                    .map(t => t.id === action.taskID ? {...t, title: action.title} : t)
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistID]: state[action.todolistID]
                    .map(t => t.id === action.taskID ? {...t, status: action.status} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.id]: []}
        case 'REMOVE-TODOLIST':
            const {[action.todolistId]: [], ...rest} = {...state}
            return rest
        case 'SET-TODOLISTS':
            let copyState = {...state}
            action.todolists.forEach((tl) => {
                copyState[tl.id] = []
            })
            return {...state}
        case 'SET-TASKS':
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        default:
            return state
    }
}

export const addTaskAC = (todolistID: string, task: TaskType) => ({type: "ADD-TASK", todolistID, task}) as const
export const changeTaskTitleAC = (todolistID: string, taskID: string, title: string) => ({
    type: "CHANGE-TASK-TITLE",
    todolistID,
    title,
    taskID
}) as const
export const changeTaskStatusAC = (todolistID: string, taskID: string, status: TaskStatus) => ({
    type: "CHANGE-TASK-STATUS",
    todolistID,
    status,
    taskID
}) as const
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({type: "SET-TASKS", tasks, todolistId}) as const
export const deleteTaskAC = (todolistId: string, taskId: string) => ({type: "REMOVE-TASK", todolistId, taskId}) as const

export const getTasksTC = (todolistId: string): AppThunk => (dispatch) => {
    taskAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(todolistId, res.data.items))
        })
}
export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => (dispatch) => {
    taskAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            res.data.resultCode === 0 && dispatch(deleteTaskAC(todolistId, taskId))
        })
}
export const addTaskTC = (todolistId: string, task: string): AppThunk => (dispatch) => {
    taskAPI.addTask(todolistId, task)
        .then((res) => {
            res.data.resultCode === 0 && dispatch(addTaskAC(todolistId, res.data.data.item))
        })
}
export const updateTaskTC = (
    todolistId: string,
    taskId: string,
    status: TaskStatus
): AppThunk => (
    dispatch: Dispatch<tasksActionType>,
    getState: () => AppRootStateType
) => {
    const task = getState().tasks[todolistId]
        .find(t => t.id === taskId)
    if (task) {
        const model: UpdateTaskModelType = {
            ...task,
            status: status
        }
        console.log(model)
        taskAPI.updateTask(todolistId, taskId, model)
            .then((res) => {
                dispatch(changeTaskStatusAC(todolistId, taskId, status))
            })
    }
}