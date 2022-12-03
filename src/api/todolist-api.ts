import axios, {AxiosResponse} from "axios";
import {ResponseType} from "./responseTypes";

const instance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': '4f75b79d-af09-4141-9f0e-f229ac4ac21f'
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.1/'
})
export type tdType =
    {
        id: string,
        title: string,
        addedDate: string,
        order: number
    }

export enum TaskStatus {
    New,
    InProgress,
    Completed,
    Draft
}

export enum Priority {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

export type TaskType =
    {
        addedDate: string
        deadline: string
        description: string
        id: string
        order: number
        priority: Priority
        startDate: string
        status: TaskStatus
        title: string
        todoListId: string
    }


type TasksResponseType<T = {}> = {
    error: null | string
    items: TaskType[]
    totalCount: number
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatus
    priority: Priority
    startDate: string
    deadline: string
}

export const todolistAPI = {
    getTodolists() {
        return instance.get<tdType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: tdType }>>>('todo-lists', {title});
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<{ title: string }, AxiosResponse<ResponseType>>(`todo-lists/${todolistId}`, {title});
    },
    reorderTodolists(todolistId: string, putAfterItemId: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/reorder`, {putAfterItemId})
    }
}

export const taskAPI = {
    getTasks(todolistId: string) {
        return instance.get<TasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    addTask(todolistId: string, title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks/${taskId}`,
            model)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    reorderTasks(todolistId: string, taskId: string, putAfterItemId: string) {
        return instance.put<any>(`todo-lists/${todolistId}/tasks/${taskId}/reorder`, {putAfterItemId})
    }
}