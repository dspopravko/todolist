import React from 'react'
import s from './FilterButtons.module.css'
import { Button, ButtonGroup } from '@material-ui/core'
import { useActions } from '../../../../../hooks/useActions'
import { todolistsActions } from '../../../index'
import { FilterValuesType } from '../../../../../models/MFilterValues'

export const FilterButtons = ({
  tdID,
  filter,
}: {
  tdID: string
  filter: FilterValuesType
}) => {
  const { changeTodolistFilter } = useActions(todolistsActions)
  const filterHandlerCreator = (filter: FilterValuesType) => () =>
    changeTodolistFilter({
      filter: filter,
      todolistId: tdID,
    })
  return (
    <div className={s.container}>
      <ButtonGroup size="small" variant="contained" disableElevation>
        <Button
          color={filter === 'all' ? 'secondary' : 'primary'}
          onClick={filterHandlerCreator('all')}
        >
          All
        </Button>
        <Button
          color={filter === 'active' ? 'secondary' : 'primary'}
          onClick={filterHandlerCreator('active')}
        >
          Active
        </Button>
        <Button
          color={filter === 'completed' ? 'secondary' : 'primary'}
          onClick={filterHandlerCreator('completed')}
        >
          Completed
        </Button>
      </ButtonGroup>
    </div>
  )
}
