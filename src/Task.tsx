import React, {ChangeEvent, memo} from 'react';
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import s from "./Task.module.css"
import {EditableSpan} from "./EditableSpan";
import BackspaceIcon from "@material-ui/icons/Backspace";
import {changeTaskTitleAC, removeTask, updateTask} from "./state/tasks-reducer";
import {TaskStatus, TaskType} from "./api/todolist-api";
import {useAppDispatch} from "./state/store";

export type TaskPropsType = TaskType & { todoId: string }

export const Task = memo(({title, id, status, todoId, todoListId, deadline, order, priority, description, startDate, addedDate}: TaskPropsType) => {
    const dispatch = useAppDispatch()

    const onRemoveHandler = () => {
        dispatch(removeTask(todoId, id))
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
        dispatch(updateTask(todoId, id, status))
    }
    const onChangeTitleHandler = (title: string) => dispatch(changeTaskTitleAC(todoId, id, title))

    const style = status === TaskStatus.Completed?
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
            key={id}
            className={status === TaskStatus.Completed ? "isDone" : ""}
            style={style}
        >
            <div className={s.task}>
                <div>
                    <Checkbox
                        style={{color: "#9fc4c0"}}
                        checked={status === TaskStatus.Completed}
                        onChange={onChangeStatusHandler}
                    />
                </div>
                <div>
                    <EditableSpan title={title}
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
    );
})