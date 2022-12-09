import {TaskType} from "../models/MTask";

export type ResponseType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}
export type TasksResponseType<T = {}> = {
    error: null | string
    items: TaskType[]
    totalCount: number
}