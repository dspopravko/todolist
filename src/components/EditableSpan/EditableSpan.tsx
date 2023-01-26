import React, { ChangeEvent, useEffect, useState } from 'react'
import { TextField } from '@material-ui/core'
import { Typography } from '@mui/material'

type EditableSpanPropsType = {
  title: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function EditableSpan({
  title,
  onChange,
  disabled = false,
}: EditableSpanPropsType) {
  const [editMode, setEditMode] = useState(false)
  const [input, setInput] = useState(title)

  useEffect(() => {
    setInput(title)
  }, [title])

  const activateEditMode = () => {
    if (!disabled) {
      setEditMode(true)
      // setInput(title)
    }
  }
  const activateViewMode = () => {
    setEditMode(false)
    setInput(title)
    onChange(input)
  }
  const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setInput(e.currentTarget.value)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      activateViewMode()
    }
  }
  return editMode ? (
    <TextField
      onKeyDown={handleKeyDown}
      onBlur={activateViewMode}
      value={input}
      onChange={inputOnChangeHandler}
      autoFocus
      multiline
    />
  ) : (
    <Typography onDoubleClick={activateEditMode}>{input}</Typography>
  )
}
