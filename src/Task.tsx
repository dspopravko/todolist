import React, {ChangeEvent, memo} from 'react';
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import s from "./Task.module.css";
import {EditableSpan} from "./EditableSpan";
import BackspaceIcon from "@material-ui/icons/Backspace";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {TaskType} from "./Todolist";
import {TodolistType} from "./state/todolist-reducer";
import {useDispatch} from "react-redux";

export type TaskPropsType = TaskType & Pick<TodolistType, 'tdId'>

export const Task = memo(({title, id: taskId, isDone, tdId: todoId}: TaskPropsType) => {
    const dispatch = useDispatch()

    const onRemoveHandler = () => dispatch(removeTaskAC(taskId, todoId))
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(todoId, taskId, e.currentTarget.checked))
    const onChangeTitleHandler = (title: string) => dispatch(changeTaskTitleAC(todoId, taskId, title))

    const style = isDone ?
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
            key={taskId}
            className={isDone ? "isDone" : ""}
            style={style}
        >
            <div className={s.task}>
                <div>
                    <Checkbox
                        style={{color: "#9fc4c0"}}
                        checked={isDone}
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