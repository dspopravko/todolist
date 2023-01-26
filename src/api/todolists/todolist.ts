import { AxiosResponse } from 'axios'
import { ResponseType } from '../types'
import { tdType } from '../../models/MTodolist'
import { instance } from '../instance'

export const todolist = {
  getTodolists() {
    return instance.get<tdType[]>('todo-lists')
  },
  createTodolist(title: string) {
    return instance.post<
      { title: string },
      AxiosResponse<ResponseType<{ item: tdType }>>
    >('todo-lists', { title })
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType<null>>(`todo-lists/${todolistId}`)
  },
  updateTodolistTitle(todolistId: string, title: string) {
    return instance.put<{ title: string }, AxiosResponse<ResponseType<null>>>(
      `todo-lists/${todolistId}`,
      { title }
    )
  },
  reorderTodolists(todolistId: string, putAfterItemId: string) {
    return instance.put<ResponseType<null>>(`todo-lists/${todolistId}/reorder`, {
      putAfterItemId,
    })
  },
}
