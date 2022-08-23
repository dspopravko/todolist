import React from "react";
import {FilterValuesType} from "./App";

type PropsType = {
    title: string
    titleNEW?: number
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    changeFilter: (value: FilterValuesType) => void
}

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

export const Todolist = (props: PropsType) => {
    return(
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {props.tasks.map(task => {
                        return <li>
                                <input type={"checkbox"} checked={task.isDone}/>
                                <span>{task.title}</span>
                                <button onClick={ () => {props.removeTask(task.id)} }>x</button>
                            </li>
                    })}
                </ul>
                <div>
                    <button onClick={() => {props.changeFilter("all")}}>All</button>
                    <button onClick={() => {props.changeFilter("active")}}>Active</button>
                    <button onClick={() => {props.changeFilter("completed")}}>Completed</button>
                </div>
            </div>
        </div>
    )
}