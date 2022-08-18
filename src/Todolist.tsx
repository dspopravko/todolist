import React from "react";

type PropsType = {
    title: string
    titleNEW?: number
    tasks: Array<TaskType>
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
                        return (
                            <li><input type={"checkbox"} checked={task.isDone}/><span>{task.title}</span></li>
                        )
                    })}
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    )
}