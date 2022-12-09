import React, {ChangeEvent, memo} from 'react';
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import s from "./Task.module.css"
import {EditableSpan} from "../../components/EditableSpan/EditableSpan";
import BackspaceIcon from "@material-ui/icons/Backspace";
import {removeTaskTC, updateTaskTC} from "../../state/tasks-reducer";
import {useAppDispatch} from "../../app/store";
import {entityStatus} from "../../state/app-reducer";
import {TaskType} from "../../models/MTask";
import {TaskStatus} from "../../models/MTaskStatus";

export type TaskPropsType = TaskType & { todoId: string, tdStatus: entityStatus }

export const Task = memo(({title, id, status, todoId, tdStatus, ...props}: TaskPropsType) => {
    const dispatch = useAppDispatch()

    const onRemoveHandler = () => {
        dispatch(removeTaskTC(todoId, id))
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
        dispatch(updateTaskTC(todoId, id, status, title))
    }
    const onChangeTitleHandler = (title: string) => {
        dispatch(updateTaskTC(todoId, id, status, title))
}

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
                                  onChange={onChangeTitleHandler}
                                  disabled={tdStatus === entityStatus.loading}
                    />
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