import React, {memo, useCallback, useEffect} from "react";
import s from "./Todolist.module.css"
import {AddItemForm} from "../../components/AppItemForm/AddItemForm";
import {EditableSpan} from "../../components/EditableSpan/EditableSpan";
import {Button, ButtonGroup, IconButton, List} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../app/store";
import {
    ChangeTodolistFilterAC,
    changeTodolistTitleTC,
    FilterValuesType,
    removeTodolistTC
} from "../../state/todolist-reducer";
import {addTaskTC, getTasksTC} from "../../state/tasks-reducer";
import {Task} from "./Task";
import {TaskType} from "../../api/todolist-api";
import {entityStatus} from "../../state/app-reducer";

type PropsType = {
    tdID: string
    title: string
    filter: FilterValuesType
    entityStatus: entityStatus
}

export const Todolist = memo(({tdID, filter, title, entityStatus: status}: PropsType) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTasksTC(tdID))
    }, [])

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[tdID])
    let filteredTasks: Array<TaskType>

    switch (filter) {
        case "completed":
            filteredTasks = tasks.filter(task => task.status === 2)
            break
        case "active":
            filteredTasks = tasks.filter(task => task.status !== 2)
            break
        default:
            filteredTasks = tasks
    }

    const filterHandlerCreator = (filter: FilterValuesType) => () => dispatch(ChangeTodolistFilterAC(filter, tdID))
    const removeTodolistHandler = () => dispatch(removeTodolistTC(tdID))
    const addTaskHandler = useCallback((title: string) => dispatch(addTaskTC(title, tdID)), [tdID])
    const onChangeTitleHandler = (title: string) => dispatch(changeTodolistTitleTC(tdID, title))

    return (
        <div className={s.todolist}>
            <div className={s.editWrapper}>
                <IconButton
                    disabled={status === entityStatus.loading}
                    onClick={removeTodolistHandler}>
                    <HighlightOffIcon/>
                </IconButton>
            </div>
            <h3>
                <EditableSpan title={title} onChange={onChangeTitleHandler}/>
            </h3>
            <AddItemForm
                disabled={status === entityStatus.loading}
                addItem={addTaskHandler}
            />
            <List>
                {filteredTasks?.map(task => {
                    return <Task
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        todoId={tdID}
                        status={task.status}
                        description={task.description}
                        addedDate={task.addedDate}
                        deadline={task.deadline}
                        todoListId={task.todoListId}
                        order={task.order}
                        priority={task.priority}
                        startDate={task.startDate}
                        tdStatus={status}
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
