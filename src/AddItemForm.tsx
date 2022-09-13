import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [input, setInput] = useState("")
    const [error, setError] = useState<boolean>(false)
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setInput(event.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.ctrlKey && e.key === 'Enter' && addTask()
    }
    const addTask = () => {
        const mInput = input.trim()
        mInput ? props.addItem(mInput) : setError(true)
        setInput("")
    }
    const userMessage =
        error ? <div style={{color: "hotpink"}}>Title is required</div> : <div></div>
    return <div>
        <input
            placeholder={"Title..."}
            className={error ? "error" : ""}
            value={input}
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}/>
        <button onClick={addTask}>+</button>
        {userMessage}
    </div>
}