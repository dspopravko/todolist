import {ActionTypes, AppRootStateType, AppThunk} from "../app/store";
import {taskAPI, TaskStatus, TaskType, UpdateTaskModelType} from "../api/todolist-api";
import {AddTodolistAT, changeTodolistEntityStatusAC, RemoveTodolistAT} from "./todolist-reducer";
import {entityStatus, setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/errot-utils";

export type addTaskAT = ReturnType<typeof addTaskAC>
export type changeTaskAT = ReturnType<typeof changeTaskAC>
export type setTasksAT = ReturnType<typeof setTasksAC>
export type deleteTaskAT = ReturnType<typeof deleteTaskAC>

export type tasksActionType =
    addTaskAT
    | changeTaskAT
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
        case "CHANGE-TASK":
            return {
                ...state,
                [action.todolistID]: state[action.todolistID]
                    .map(t => t.id === action.taskID ? {...t, status: action.status, title: action.title} : t)
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
export const changeTaskAC = (todolistID: string, taskID: string, title: string, status: TaskStatus) => ({
    type: "CHANGE-TASK",
    todolistID,
    status,
    taskID,
    title
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
export const addTaskTC = (title: string, todolistId: string): AppThunk => (dispatch) => {
    dispatch(changeTodolistEntityStatusAC(todolistId, entityStatus.loading))
    dispatch(setAppStatusAC(entityStatus.loading))
    taskAPI.addTask(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                dispatch(addTaskAC(todolistId, task))
                dispatch(setAppStatusAC(entityStatus.succeeded))
                dispatch(changeTodolistEntityStatusAC(todolistId, entityStatus.succeeded))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch((err) => {
        handleServerNetworkError(err, dispatch)
        dispatch(changeTodolistEntityStatusAC(todolistId, entityStatus.idle))
    })
}

export const updateTaskTC = (
    todolistId: string,
    taskId: string,
    status: TaskStatus,
    title: string
): AppThunk => (
    dispatch,
    getState: () => AppRootStateType
) => {
    dispatch(changeTodolistEntityStatusAC(todolistId, entityStatus.loading))
    const task = getState().tasks[todolistId]
        .find(t => t.id === taskId)
    if (task) {
        console.log('01')
        const model: UpdateTaskModelType = {
            ...task,
            title: title,
            status: status
        }
        taskAPI.updateTask(todolistId, taskId, model)
            .then((res) => {
                console.log('02')
                if (res.data.resultCode === 0) {
                    console.log('03')
                    dispatch(changeTaskAC(todolistId, taskId, title, status))
                } else {
                    console.log('04')
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((err) => {
                console.log('05')
                dispatch(setAppStatusAC(entityStatus.failed))
                dispatch(setAppErrorAC(err.message))
            }).finally(() => {
            console.log('06')
            dispatch(changeTodolistEntityStatusAC(todolistId, entityStatus.idle))
        })

    }
}