import { Priority } from './MPriority'
import { TaskStatus } from './MTaskStatus'

export type TaskType = {
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
