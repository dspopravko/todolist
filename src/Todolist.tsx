import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import s from "./todolis.module.css"
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type PropsType = {
    tdID: string
    title: string
    titleNEW?: number
    color?: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string, tdID: string) => void
    changeFilter: (value: FilterValuesType, tdID: string) => void
    addTask: (title: string, tdID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, tdID: string) => void
    changeTaskTitle: (taskID: string, title: string, tdID: string) => void
    removeTodolist: (tdID: string) => void
    changeTdTitle: (tdID: string, title: string) => void
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export const Todolist = (props: PropsType) => {

    const filterHandler = (filter: FilterValuesType) => () => props.changeFilter(filter, props.tdID)
    const removeTodolistHandler = () => {
        props.removeTodolist(props.tdID)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.tdID)
    }
    const onChangeTitleHandler = (title: string) => {
        props.changeTdTitle(props.tdID, title)
    }
    return (
        <div className={s.todolist} style={{backgroundColor: props.color}}>
            <div className={s.editWrapper}>
                <button onClick={removeTodolistHandler}>x</button>
            </div>
            <h3><EditableSpan title={props.title} onChange={onChangeTitleHandler}/></h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map(task => {
                    const onRemoveHandler = () => props.removeTask(task.id, props.tdID)
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.tdID)
                    const onChangeTitleHandler = (title: string) => {
                        props.changeTaskTitle(task.id, title, props.tdID)
                    }
                    return <li key={task.id} className={task.isDone ? "isDone" : ""}>
                        <div className={s.task}>
                            <div>
                                <input type={"checkbox"}
                                       checked={task.isDone}
                                       onChange={onChangeStatusHandler}
                                />
                            </div>
                            <div>
                                <EditableSpan title={task.title}
                                              onChange={onChangeTitleHandler}/>
                            </div>
                            <div className={s.btnWrapper}>
                                <button onClick={onRemoveHandler}>x</button>
                            </div>
                        </div>
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
    )
}


