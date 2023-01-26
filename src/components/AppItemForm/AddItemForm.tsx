import React, { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react'
import s from './AddItemForm.module.css'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { IconButton, TextField } from '@material-ui/core'
import { theme } from '../../app/App'

type AddItemFormPropsType = {
  addItem: (title: string) => void
  disabled?: boolean
}

export const AddItemForm = ({
                              addItem,
                              disabled = false,
                            }: AddItemFormPropsType) => {
  const [input, setInput] = useState('')
  const [error, setError] = useState<boolean>(false)
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    error && setError(false)
    setInput(event.currentTarget.value)
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) =>
    e.ctrlKey && e.key === 'Enter' && addTask()

  const addTask = useCallback(() => {
    if (disabled) {
      return
    }
    const mInput = input.trim()
    mInput ? addItem(mInput) : setError(true)
    setInput('')
  }, [input])

  return (
    <>
      <div className={s.inputContainer}>
        <TextField
          variant={'outlined'}
          size={'small'}
          placeholder={'Title...'}
          className={error ? 'error' : ''}
          value={input}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
          error={error}
          helperText={error && 'Title is required'}
          multiline
          fullWidth
        />
      </div>
      <div className={s.button}>
        <IconButton
          style={{
            transition: '0.1s ease',
          }}
          onClick={addTask}
        >
          <AddCircleIcon
            style={
              disabled
                ? { color: theme.palette.grey.A200 }
                : { color: theme.palette.primary.main }
            }
          />
        </IconButton>
      </div>
    </>
  )
}
