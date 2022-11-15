import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import s from "./AddItemForm.module.css"
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {IconButton, TextField} from "@material-ui/core";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = ({addItem}: AddItemFormPropsType) => {
    const [input, setInput] = useState("")
    const [error, setError] = useState<boolean>(false)
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setInput(event.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.ctrlKey && e.key === 'Enter' && addTask()

    const addTask = useCallback(() => {
        const mInput = input.trim()
        mInput ? addItem(mInput) : setError(true)
        setInput("")
    }, [input])

    return <div className={s.titleInput}>
        <TextField
            variant={"outlined"}
            size={"small"}
            placeholder={"Title..."}
            className={error ? "error" : ""}
            value={input}
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
            error={error}
            helperText={error && "Title is required"}
        />
        <IconButton
            onClick={addTask}>
            <AddCircleIcon style={{color: "#9fc4c0"}}/>
        </IconButton>

    </div>
}