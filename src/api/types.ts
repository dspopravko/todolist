import { TaskType } from '../models/MTask'

export type ResponseType<T> = {
  data: T
  fieldsErrors: string[]
  messages: string[]
  resultCode: number
}
export type TasksResponseType = {
  error: null | string
  items: TaskType[]
  totalCount: number
}
export type FieldErrorType = { field: string; error: string }
