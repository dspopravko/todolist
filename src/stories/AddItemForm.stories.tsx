import React, { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { AddItemForm } from '../components/AppItemForm/AddItemForm'
import { action } from '@storybook/addon-actions'
import s from '../components/AppItemForm/AddItemForm.module.css'
import { IconButton, TextField } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { theme } from '../app/App'

export default {
  title: 'TodolistPage/AddItemForm',
  component: AddItemForm,
} as ComponentMeta<typeof AddItemForm>

const AddItemFormTemplate: ComponentStory<typeof AddItemForm> = (args) => (
  <AddItemForm {...args} />
)
const AddItemFormWithError: ComponentStory<typeof AddItemForm> = (args) => {
  const [input, setInput] = useState('')
  const [error, setError] = useState<boolean>(true)
  const disabled = false
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    error && setError(false)
    setInput(event.currentTarget.value)
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) =>
    e.ctrlKey && e.key === 'Enter' && addTask()

  const addTask = useCallback(() => {
    const mInput = input.trim()
    mInput ? args.addItem(mInput) : setError(true)
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

export const AddItemFormIdle = AddItemFormTemplate.bind({})
AddItemFormIdle.args = {
  addItem: action('Idle form content submitted!'),
}

export const AddItemFormError = AddItemFormWithError.bind({})
AddItemFormError.args = {
  addItem: action('Form with error content submitted!'),
}
