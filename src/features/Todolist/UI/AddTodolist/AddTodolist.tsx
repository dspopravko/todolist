import React, { useCallback } from 'react'
import { theme } from '../../../../app/App'
import s from './AddTodolist.module.css'
import { Typography } from '@material-ui/core'
import { AddItemForm } from '../../../../components/AppItemForm/AddItemForm'
import { useActions } from '../../../../hooks/useActions'
import { todolistsActions } from '../../index'

export const AddTodolist = () => {
  const { addTodolist } = useActions(todolistsActions)
  const addTodolistHandler = useCallback(
    (title: string) => addTodolist({ title }),
    [addTodolist]
  )
  return (
    <div
      style={{ backgroundColor: theme.palette.background.default }}
      className={s.addNewTodolistContainer}
    >
      <Typography variant="h6">Add new todolist:</Typography>
      <AddItemForm addItem={addTodolistHandler} />
    </div>
  )
}
