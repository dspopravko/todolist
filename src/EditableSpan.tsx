import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    onChange: (value: string) => void
}

export function EditableSpan({title, onChange}: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState(false)
    const [input, setInput] = useState(title)
    const activateEditMode = () => {
        setEditMode(true)
        setInput(title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        onChange(input)
    }
    const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setInput(e.currentTarget.value)

    return editMode
        ? <TextField
            onBlur={activateViewMode}
            value={input}
            onChange={inputOnChangeHandler}
            autoFocus
        />
        : <span onDoubleClick={activateEditMode}>{input}</span>
}