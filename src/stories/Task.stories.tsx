import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Task } from '../features/Todolist'
import { ReduxStoreProviderDecorator } from '../state/ReduxStoreProviderDecorator'
import { useSelector } from 'react-redux'
import { AppRootStateType } from '../state/store'
import { TaskType } from '../models/MTask'
import { entityStatus } from '../models/MEntityStatus'

export default {
  title: 'TodolistPage/Task',
  component: Task,
  decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof Task>

const TaskWithRedux = () => {
  const task = useSelector<AppRootStateType, TaskType>(
    (state) => state.tasks['todolistId1'][0]
  )
  return (
    <Task
      key={task.id}
      id={task.id}
      title={task.title}
      todoId={'todolistId1'}
      status={task.status}
      description={task.description}
      addedDate={task.addedDate}
      deadline={task.deadline}
      todoListId={task.todoListId}
      order={task.order}
      priority={task.priority}
      startDate={task.startDate}
      tdStatus={entityStatus.idle}
    />
  )
}

const TaskTemplate: ComponentStory<typeof TaskWithRedux> = () => (
  <TaskWithRedux />
)

export const ActiveTask = TaskTemplate
