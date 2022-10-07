import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import s from "./todolis.module.css"
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import BackspaceIcon from '@material-ui/icons/Backspace';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

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

    const filterHandlerCreator = (filter: FilterValuesType) => () => props.changeFilter(filter, props.tdID)
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
                <IconButton
                    onClick={removeTodolistHandler}>
                    <HighlightOffIcon/>
                </IconButton>

            </div>
            <h3>
                <EditableSpan title={props.title} onChange={onChangeTitleHandler}/>
            </h3>
            <AddItemForm addItem={addTask}/>
            <List>
                {props.tasks.map(task => {
                    const onRemoveHandler = () => props.removeTask(task.id, props.tdID)
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.tdID)
                    const onChangeTitleHandler = (title: string) => {
                        props.changeTaskTitle(task.id, title, props.tdID)
                    }
                    const style = task.isDone ?
                        {
                            textDecoration: "line-through",
                            padding: "0",
                            color: "#8fc0bc"
                        }
                        : {
                            fontWeight: "bold",
                            padding: "0",
                            color: "#5d6c6b"
                        }
                    return (
                        <ListItem
                            key={task.id}
                            className={task.isDone ? "isDone" : ""}
                            style={style}
                        >
                            <div className={s.task}>
                                <div>
                                    <Checkbox
                                        style={{color: "#9fc4c0"}}
                                        checked={task.isDone}
                                        onChange={onChangeStatusHandler}
                                    />
                                </div>
                                <div>
                                    <EditableSpan title={task.title}
                                                  onChange={onChangeTitleHandler}/>
                                </div>
                                <div className={s.btnWrapper}>
                                    <IconButton
                                        color="primary"
                                        size="small"
                                        onClick={onRemoveHandler}>
                                        <BackspaceIcon/>
                                    </IconButton>
                                </div>
                            </div>
                        </ListItem>
                    )
                })}
            </List>
            {props.tasks.length < 1 ? "Task list is empty" : ""}
            <div>
                <ButtonGroup
                    size="small"
                    variant="contained"
                    disableElevation>
                    <Button
                        color={props.filter === "all" ? "secondary" : "primary"}
                        onClick={filterHandlerCreator('all')}>All
                    </Button>
                    <Button
                        color={props.filter === "active" ? "secondary" : "primary"}
                        onClick={filterHandlerCreator('active')}>Active
                    </Button>
                    <Button
                        color={props.filter === "completed" ? "secondary" : "primary"}
                        onClick={filterHandlerCreator('completed')}>Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
}


