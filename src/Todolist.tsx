import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import s from "./todolis.module.css"
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import BackspaceIcon from '@material-ui/icons/Backspace';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

type PropsType = {
    tdID: string
    title: string
    color?: string
    filter: FilterValuesType
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export const Todolist = ({tdID, filter, title, color}: PropsType) => {

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[tdID])
    const dispatch = useDispatch()

    let filteredTasks: Array<TaskType>

    switch (filter) {
        case "completed":
            filteredTasks = tasks.filter(task => task.isDone)
            break
        case "active":
            filteredTasks = tasks.filter(task => !task.isDone)
            break
        default:
            filteredTasks = tasks
    }

    const filterHandlerCreator = (filter: FilterValuesType) => () => dispatch(ChangeTodolistFilterAC(filter, tdID))
    const removeTodolistHandler = () => dispatch(RemoveTodolistAC(tdID))
    const addTaskHandler = (title: string) => dispatch(addTaskAC(tdID, title))
    const onChangeTitleHandler = (title: string) => dispatch(ChangeTodolistTitleAC(title, tdID))

    return (
        <div className={s.todolist} style={{backgroundColor: color}}>
            <div className={s.editWrapper}>
                <IconButton
                    onClick={removeTodolistHandler}>
                    <HighlightOffIcon/>
                </IconButton>
            </div>
            <h3>
                <EditableSpan title={title} onChange={onChangeTitleHandler}/>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            <List>
                {filteredTasks.map(task => {
                    const onRemoveHandler = () => dispatch(removeTaskAC(task.id, tdID))
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(task.id, tdID, e.currentTarget.checked))
                    const onChangeTitleHandler = (title: string) => dispatch(changeTaskTitleAC(task.id, title, tdID))

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
            {filteredTasks.length < 1 ? "Task list is empty" : ""}
            <div>
                <ButtonGroup
                    size="small"
                    variant="contained"
                    disableElevation>
                    <Button
                        color={filter === "all" ? "secondary" : "primary"}
                        onClick={filterHandlerCreator('all')}>All
                    </Button>
                    <Button
                        color={filter === "active" ? "secondary" : "primary"}
                        onClick={filterHandlerCreator('active')}>Active
                    </Button>
                    <Button
                        color={filter === "completed" ? "secondary" : "primary"}
                        onClick={filterHandlerCreator('completed')}>Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
}


