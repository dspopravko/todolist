import { TaskStatus } from './MTaskStatus'
import { Priority } from './MPriority'

export type UpdateTaskModelType = {
  title: string
  description: string
  status: TaskStatus
  priority: Priority
  startDate: string
  deadline: string
}
