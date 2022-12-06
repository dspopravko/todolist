import {AppRootStateType} from "../app/store";
import {taskAPI, TaskStatus, TaskType, tdType, UpdateTaskModelType} from "../api/todolist-api";
import {appSlice, entityStatus} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/errot-utils";
import {todolistSlice} from "./todolist-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const tasksSlice = createSlice({
    name: 'app',
    initialState: {} as TasksStateType,
    reducers: {
        addTaskAC(state, action: PayloadAction<{todolistID: string, task: TaskType}>) {
            state[action.payload.todolistID].unshift(action.payload.task)
        },
        changeTaskAC(state, action: PayloadAction<{todolistID: string, taskID: string, title: string, status: TaskStatus}>) {
            const tasks = state[action.payload.todolistID]
            const index = tasks.findIndex(t => t.id === action.payload.taskID)
            if (index > -1) tasks[index] = {...tasks[index], ...action.payload}
        },
        setTasksAC(state, action: PayloadAction<{todolistId: string, tasks: TaskType[]}>) {
            state[action.payload.todolistId] = action.payload.tasks
        },
        deleteTaskAC(state, action: PayloadAction<{todolistId: string, taskId: string}>) {
            console.log('3')
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) tasks.splice(index,1)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(todolistSlice.actions.AddTodolistAC, (state, action) => {
            state[action.payload.todolistId] = []
        });
        builder
            .addCase(todolistSlice.actions.RemoveTodolistAC, (state, action) => {
            delete state[action.payload.todolistId]
        });
        builder
            .addCase(todolistSlice.actions.SetTodolitsAC, (state, action) => {
            action.payload.todolists.forEach((tl: tdType) => {
                state[tl.id] = []
            })
        });
    }
})

export const tasksReducer = tasksSlice.reducer

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    taskAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(tasksSlice.actions.setTasksAC({todolistId: todolistId, tasks: res.data.items}))
        })
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    console.log('1')
    taskAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            console.log('2')
            res.data.resultCode === 0 && dispatch(tasksSlice.actions.deleteTaskAC({todolistId: todolistId, taskId: taskId}))
        })
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(todolistSlice.actions.changeTodolistEntityStatusAC({todolistId: todolistId, status: entityStatus.loading}))
    dispatch(appSlice.actions.setAppStatusAC({status: entityStatus.loading}))
    taskAPI.addTask(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                dispatch(tasksSlice.actions.addTaskAC({todolistID: todolistId, task: task}))
                dispatch(appSlice.actions.setAppStatusAC({status: entityStatus.succeeded}))
                dispatch(todolistSlice.actions.changeTodolistEntityStatusAC({todolistId: todolistId, status: entityStatus.succeeded}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch((err) => {
        handleServerNetworkError(err, dispatch)
        dispatch(todolistSlice.actions.changeTodolistEntityStatusAC({todolistId: todolistId, status: entityStatus.idle}))
    })
}

export const updateTaskTC = (
    todolistId: string,
    taskId: string,
    status: TaskStatus,
    title: string
) => (
    dispatch: Dispatch,
    getState: () => AppRootStateType
) => {
    dispatch(todolistSlice.actions.changeTodolistEntityStatusAC({todolistId: todolistId, status: entityStatus.loading}))
    const task = getState().tasks[todolistId]
        .find(t => t.id === taskId)
    if (task) {
        const model: UpdateTaskModelType = {
            ...task,
            title: title,
            status: status
        }
        taskAPI.updateTask(todolistId, taskId, model)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(tasksSlice.actions.changeTaskAC({todolistID: todolistId, taskID: taskId, title: title, status: status}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((err) => {
                dispatch(appSlice.actions.setAppStatusAC({status: entityStatus.failed}))
                dispatch(appSlice.actions.setAppErrorAC(err.message))
            }).finally(() => {
            dispatch(todolistSlice.actions.changeTodolistEntityStatusAC({todolistId: todolistId, status: entityStatus.idle}))
        })

    }
}