import React, {memo, useCallback, useEffect} from "react";
import s from "./Todolist.module.css"
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, IconButton, List} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./state/store";
import {
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    FilterValuesType,
    RemoveTodolistAC
} from "./state/todolist-reducer";
import {addTask, getTasksTC} from "./state/tasks-reducer";
import {Task} from "./Task";
import {TaskType} from "./api/todolist-api";

type PropsType = {
    tdID: string
    title: string
    filter: FilterValuesType
}

export const Todolist = memo(({tdID, filter, title}: PropsType) => {
    console.log('Todolist ' + tdID + ' rendered')
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTasksTC(tdID))
    }, [])

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[tdID])
    console.log('tasks ', tasks)

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
    const removeTodolistHandler = () => dispatch(RemoveTodolistAC(tdID))
    const addTaskHandler = useCallback((title: string) => dispatch(addTask(tdID, title)), [tdID])
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
