import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': '4f75b79d-af09-4141-9f0e-f229ac4ac21f'
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.1/'
})
type tdType =
    {
        id: string,
        title: string,
        addedDate: string,
        order: number
    }
type taskType =
    {
        addedDate: string
        deadline: null | string
        description: null | string
        id: string
        order: number
        priority: number
        startDate: null | string
        status: number
        title: string
        todoListId: string
    }

type ResponseType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}
type TasksResponseType<T = {}> = {
    error: null | string
    items: taskType[]
    totalCount: number
}

export const todolistAPI = {
    getTodolists() {
        return instance.get<tdType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item: tdType}>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },
    reorderTodolists(todolistId: string, putAfterItemId: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/reorder`, {putAfterItemId})
    }
}

export const taskAPI = {
    getTasks (todolistId: string) {
        return instance.get<TasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    addTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{item: taskType}>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, title: string, description: string, completed: boolean, status: number, priority: string, startDate: string, deadline: string) {
        return instance.put<ResponseType<{item: taskType}>>(`todo-lists/${todolistId}/tasks/${taskId}`,
            {title, description, completed, status, priority, startDate, deadline})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    reorderTasks(todolistId: string, taskId: string, putAfterItemId: string) {
        return instance.put<any>(`todo-lists/${todolistId}/tasks/${taskId}/reorder`, {putAfterItemId})
    }
}

export const authAPI = {

}
