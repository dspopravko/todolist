import { instance } from '../../instance'
import { ResponseType, TasksResponseType } from '../../types'
import { AxiosResponse } from 'axios'
import { TaskType } from '../../../models/MTask'
import { UpdateTaskModelType } from '../../../models/MUpdateTask'

export const taskAPI = {
  getTasks(todolistId: string) {
    return instance.get<TasksResponseType>(`todo-lists/${todolistId}/tasks`)
  },
  addTask(todolistId: string, title: string) {
    return instance.post<
      { title: string },
      AxiosResponse<ResponseType<{ item: TaskType }>>
    >(`todo-lists/${todolistId}/tasks`, { title })
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<
      UpdateTaskModelType,
      AxiosResponse<ResponseType<{ item: TaskType }>>
    >(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType<null>>(
      `todo-lists/${todolistId}/tasks/${taskId}`
    )
  },
  // reorderTasks(todolistId: string, taskId: string, putAfterItemId: string) {
  //   return instance.put<any>(
  //     `todo-lists/${todolistId}/tasks/${taskId}/reorder`,
  //     { putAfterItemId }
  //   )
  // },
}
