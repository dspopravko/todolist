import React, { ChangeEvent } from 'react';
import { Checkbox, IconButton } from "@material-ui/core";
import s from "./Task.module.css"
import { EditableSpan } from "../../../../components/EditableSpan/EditableSpan";
import BackspaceIcon from "@material-ui/icons/Backspace";
import { TaskType } from "../../../../models/MTask";
import { TaskStatus } from "../../../../models/MTaskStatus";
import { useActions } from "../../../../hooks/useActions";
import { entityStatus } from "../../../../models/MEntityStatus";
import { tasksActions } from "../../index";
import { theme } from "../../../../app/App";
import { motion } from 'framer-motion';

const formatTaskOnStatus = (status: TaskStatus) => {
  return status === TaskStatus.Completed ? {
      textDecoration: "line-through",
      padding: "0",
      color: theme.palette.grey["800"]
    }
    : {
      fontWeight: "bold",
      padding: "0",
      color: theme.palette.text.primary
    }
}
type TaskPropsType = TaskType & { todoId: string, tdStatus: entityStatus }

export const Task = ({ title, id, status, todoId, tdStatus }: TaskPropsType) => {
  const { removeTask, updateTask } = useActions(tasksActions)
  const onRemoveHandler = () => removeTask({ todolistId: todoId, taskId: id })
  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    updateTask({ todolistId: todoId, taskId: id, status, title })
  }
  const onChangeTitleHandler = (title: string) => updateTask({ todolistId: todoId, taskId: id, status, title })

  return (
    <motion.div
      layoutId={'task' + id}
      className={s.container}
      initial={{
        opacity:0
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {duration: 0.2}
      }}
    >
      <div className={s.task} style={formatTaskOnStatus(status)}>
        <div>
          <Checkbox
            style={{ color: theme.palette.primary.main }}
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
      </div>
      <div className={s.deleteButtonContainer}>
        <IconButton
          disabled={tdStatus === entityStatus.loading}
          color={"primary"}
          size="small"
          onClick={onRemoveHandler}
          style={{
            transition: '0.1s ease'
          }}>
          <BackspaceIcon />
        </IconButton>
      </div>
    </motion.div>
  );
}