import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Todolist } from '../features/Todolist'
import { ReduxStoreProviderDecorator } from '../state/ReduxStoreProviderDecorator'
import { useSelector } from 'react-redux'
import { AppRootStateType } from '../state/store'
import { TodolistType } from '../features/Todolist/BLL/slices/todolistSlice'

export default {
  title: 'TodolistPage/Todolist',
  component: Todolist,
  decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof Todolist>

const TaskWithRedux = () => {
  const tl = useSelector<AppRootStateType, TodolistType>(
    (state) => state.todolists[0]
  )
  return (
    <Todolist
      key={tl.id}
      tdID={tl.id}
      filter={tl.filter}
      title={tl.title}
      entityStatus={tl.tdStatus}
    />
  )
}

const TaskTemplate: ComponentStory<typeof TaskWithRedux> = () => (
  <TaskWithRedux />
)

export const ActiveTask = TaskTemplate
