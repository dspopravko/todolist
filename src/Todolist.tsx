import React, {memo, useCallback} from "react";
import s from "./todolis.module.css"
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    FilterValuesType,
    RemoveTodolistAC
} from "./state/todolist-reducer";
import {addTaskAC} from "./state/tasks-reducer";
import {Task} from "./Task";

type PropsType = {
    tdID: string
    title: string
    filter: FilterValuesType
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export const Todolist = memo(({tdID, filter, title}: PropsType) => {
    console.log('Todolist ' + tdID + ' rendered')

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
    const addTaskHandler = useCallback((title: string) => dispatch(addTaskAC(tdID, title)), [tdID])
    const onChangeTitleHandler = (title: string) => dispatch(ChangeTodolistTitleAC(title, tdID))

    return (
        <div className={s.todolist}>
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
                {filteredTasks && filteredTasks.map(task => {
                    return <Task
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        tdId={tdID}
                        isDone={task.isDone}
                    />
                })}
            </List>
            {filteredTasks && filteredTasks.length < 1 ? "Task list is empty" : ""}
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
})
