import {AppRootStateType} from "../app/store";
import {appSlice, entityStatus} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/errot-utils";
import {todolistSlice} from "./todolist-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {TaskType} from "../models/MTask";
import {TaskStatus} from "../models/MTaskStatus";
import {UpdateTaskModelType} from "../models/MUpdateTask";
import {tdType} from "../models/MTodolist";
import {taskAPI} from "../api/tasks";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {} as TasksStateType,
    reducers: {
        addTask(state, action: PayloadAction<{ todolistID: string, task: TaskType }>) {
            state[action.payload.todolistID].unshift(action.payload.task)
        },
        changeTask(state, action: PayloadAction<{ todolistID: string, taskID: string, title: string, status: TaskStatus }>) {
            const tasks = state[action.payload.todolistID]
            const index = tasks.findIndex(t => t.id === action.payload.taskID)
            if (index > -1) tasks[index] = {...tasks[index], ...action.payload}
        },
        setTasks(state, action: PayloadAction<{ todolistId: string, tasks: TaskType[] }>) {
            state[action.payload.todolistId] = action.payload.tasks
        },
        deleteTask(state, action: PayloadAction<{ todolistId: string, taskId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) tasks.splice(index, 1)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(todolistSlice.actions.AddTodolist, (state, action) => {
                state[action.payload.todolistId] = []
            });
        builder
            .addCase(todolistSlice.actions.RemoveTodolist, (state, action) => {
                delete state[action.payload.todolistId]
            });
        builder
            .addCase(todolistSlice.actions.SetTodolits, (state, action) => {
                action.payload.todolists.forEach((tl: tdType) => {
                    state[tl.id] = []
                })
            });
    }
})

export const tasksReducer = tasksSlice.reducer

export const getTasksTC = (todolistId: string) => async (dispatch: Dispatch) => {
    try {
        const res = await taskAPI.getTasks(todolistId)
        dispatch(tasksSlice.actions.setTasks({todolistId: todolistId, tasks: res.data.items}))
    } catch (e) {
        if (e instanceof Error) handleServerNetworkError(e, dispatch)
    }
}
export const removeTaskTC = (todolistId: string, taskId: string) => async (dispatch: Dispatch) => {
    try {
        const res = await taskAPI.deleteTask(todolistId, taskId)
        res.data.resultCode === 0 && dispatch(tasksSlice.actions.deleteTask({
            todolistId: todolistId,
            taskId: taskId
        }))
    } catch (e) {
        if (e instanceof Error) handleServerNetworkError(e, dispatch)
    } finally {

    }
}
export const addTaskTC = (title: string, todolistId: string) => async (dispatch: Dispatch) => {
    dispatch(todolistSlice.actions.changeTodolistEntityStatus({todolistId: todolistId, status: entityStatus.loading}))
    dispatch(appSlice.actions.setAppStatus({status: entityStatus.loading}))
    try {
        const res = await taskAPI.addTask(todolistId, title)
        if (res.data.resultCode !== 0) {
            handleServerAppError(res.data, dispatch)
            return
        }
        const task = res.data.data.item
        dispatch(tasksSlice.actions.addTask({todolistID: todolistId, task: task}))
        dispatch(todolistSlice.actions.changeTodolistEntityStatus({
            todolistId: todolistId,
            status: entityStatus.succeeded
        }))

    } catch (e) {
        if (e instanceof Error) handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(todolistSlice.actions.changeTodolistEntityStatus({todolistId: todolistId, status: entityStatus.idle}))
        dispatch(appSlice.actions.setAppStatus({status: entityStatus.idle}))
    }
}

export const updateTaskTC = (
    todolistId: string,
    taskId: string,
    status: TaskStatus,
    title: string
) => async (
    dispatch: Dispatch,
    getState: () => AppRootStateType
) => {
    dispatch(todolistSlice.actions.changeTodolistEntityStatus({todolistId: todolistId, status: entityStatus.loading}))

    const task = getState().tasks[todolistId]
        .find(t => t.id === taskId)
    if (!task) return

    const model: UpdateTaskModelType = {
        ...task,
        title: title,
        status: status
    }

    try {
        const res = await taskAPI.updateTask(todolistId, taskId, model)
        if (res.data.resultCode !== 0) {
            handleServerAppError(res.data, dispatch)
            return
        }
        dispatch(tasksSlice.actions.changeTask({
            todolistID: todolistId,
            taskID: taskId,
            title: title,
            status: status
        }))
    } catch (e) {
        if (e instanceof Error) handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(todolistSlice.actions.changeTodolistEntityStatus({
            todolistId: todolistId,
            status: entityStatus.idle
        }))
    }
}