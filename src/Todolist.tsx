import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

type PropsType = {
    title: string
    titleNEW?: number
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (taskID: string, isDone: boolean) => void
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export const Todolist = (props: PropsType) => {

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
        mInput ? props.addTask(mInput) : setError(true)
        setInput("")
    }
    const filterHandler = (filter: FilterValuesType) => () => props.changeFilter(filter)
    const userMessage =
        error ?
            <div style={{color: "hotpink"}}>Title is required</div> :
            <div>Please, fill in the input field</div>

    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input
                        className={error ? "error" : ""}
                        value={input}
                        onChange={onChangeHandler}
                        onKeyDown={onKeyDownHandler}/>
                    <button onClick={addTask}>+</button>
                    {userMessage}
                </div>
                <ul>
                    {props.tasks.map(task => {
                        const onRemoveHandler = () => props.removeTask(task.id)
                        return <li key={task.id} className={task.isDone ? "isDone" : ""}>
                            <input type={"checkbox"}
                                   checked={task.isDone}
                                   onChange={(e) => props.changeStatus(task.id, e.currentTarget.checked)}
                            />
                            <span>{task.title}</span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    })}
                </ul>
                {props.tasks.length < 1 ? "Task list is empty" : ""}
                <div>
                    <button className={props.filter === "all" ? "btn-active btn" : "btn"}
                            onClick={filterHandler('all')}>All
                    </button>
                    <button className={props.filter === "active" ? "btn-active btn" : "btn"}
                            onClick={filterHandler('active')}>Active
                    </button>
                    <button className={props.filter === "completed" ? "btn-active btn" : "btn"}
                            onClick={filterHandler('completed')}>Completed
                    </button>
                </div>
            </div>
        </div>
    )
}


