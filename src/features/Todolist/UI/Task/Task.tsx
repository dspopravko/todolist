import React, { ChangeEvent, memo } from 'react';
import { Checkbox, IconButton, ListItem } from "@material-ui/core";
import s from "./Task.module.css"
import { EditableSpan } from "../../../../components/EditableSpan/EditableSpan";
import BackspaceIcon from "@material-ui/icons/Backspace";
import { TaskType } from "../../../../models/MTask";
import { TaskStatus } from "../../../../models/MTaskStatus";
import { useActions } from "../../../../utils/redux-utils";
import { entityStatus } from "../../../../models/MEntityStatus";
import { tasksActions } from "../../index";

const formatTaskOnStatus = (status: TaskStatus) => {
  return status === TaskStatus.Completed ? {
      textDecoration: "line-through",
      padding: "0",
      color: "#8fc0bc"
    }
    : {
      fontWeight: "bold",
      padding: "0",
      color: "#5d6c6b"
    }
}
type TaskPropsType = TaskType & { todoId: string, tdStatus: entityStatus }

export const Task = memo(({ title, id, status, todoId, tdStatus }: TaskPropsType) => {
  const { removeTask, updateTask } = useActions(tasksActions)

  const onRemoveHandler = () => removeTask({ todolistId: todoId, taskId: id })
  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    updateTask({ todolistId: todoId, taskId: id, status, title })
  }
  const onChangeTitleHandler = (title: string) => updateTask({ todolistId: todoId, taskId: id, status, title })

  return (
    <ListItem
      key={id}
      className={status === TaskStatus.Completed ? "isDone" : ""}
      style={formatTaskOnStatus(status)}
    >
      <div className={s.task}>
        <div>
          <Checkbox
            style={{ color: "#9fc4c0" }}
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
            <BackspaceIcon />
          </IconButton>
        </div>
      </div>
    </ListItem>
  );
})