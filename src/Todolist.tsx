import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import * as events from "events";

type PropsType = {
    title: string
    titleNEW?: number
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export const Todolist = (props: PropsType) => {

    const [input, setInput] = useState("")

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.ctrlKey && e.key === 'Enter' && addTask()
    }
    const addTask = () => {
        props.addTask(input);
        setInput("")
    }

    const filterHandler = (filter: FilterValuesType) => props.changeFilter(filter)

    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={input}
                           onChange={onChangeHandler}
                           onKeyDown={onKeyDownHandler}/>
                    <button onClick={addTask}>+</button>
                </div>
                <ul>
                    {props.tasks.map(task => {
                        const onRemoveHandler = () => props.removeTask(task.id)
                        return <li key={task.id}>
                            <input type={"checkbox"} checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    })}
                </ul>
                <div>
                    <button onClick={() => {
                        filterHandler('all')
                    }}>All
                    </button>
                    <button onClick={() => {
                        filterHandler('active')
                    }}>Active
                    </button>
                    <button onClick={() => {
                        filterHandler('completed')
                    }}>Completed
                    </button>
                </div>
            </div>
        </div>
    )
}


