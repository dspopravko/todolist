import React, { memo, useCallback, useEffect } from "react";
import s from "./Todolist.module.css"
import { AddItemForm } from "../../../../components/AppItemForm/AddItemForm";
import { EditableSpan } from "../../../../components/EditableSpan/EditableSpan";
import { Button, ButtonGroup, IconButton } from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../../../state/store";
import { Task } from "../Task/Task";
import { TaskType } from "../../../../models/MTask";
import { useActions } from "../../../../utils/redux-utils";
import { tasksActions, todolistsActions } from "../../index";
import { entityStatus } from "../../../../models/MEntityStatus";
import { FilterValuesType } from "../../../../models/MFilterValues";
import { theme } from "../../../../app/App";
import { motion } from "framer-motion";

type PropsType = {
  tdID: string
  title: string
  filter: FilterValuesType
  entityStatus: entityStatus
}

export const Todolist = memo(({ tdID, filter, title, entityStatus: status }: PropsType) => {
  const { changeTodolistTitle, removeTodolist, changeTodolistFilter } = useActions(todolistsActions)
  const { getTasks, addTask } = useActions(tasksActions)
  useEffect(() => {
    getTasks(tdID)
  }, [tdID])

  const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[tdID])
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

  const filterHandlerCreator = (filter: FilterValuesType) => () => changeTodolistFilter({
    filter: filter,
    todolistId: tdID
  })
  const removeTodolistHandler = () => removeTodolist({ todolistId: tdID })
  const addTaskHandler = useCallback((title: string) => addTask({ title: title, todolistId: tdID }), [tdID])
  const onChangeTitleHandler = (title: string) => changeTodolistTitle({ todolistId: tdID, title })

  return (
    <motion.div
      layoutId={'todolist'+tdID} style={{backgroundColor: theme.palette.background.default}} className={s.todolist}>
      <motion.div  layoutId={'deleteTd'+tdID} className={s.editWrapper}>
        <IconButton
          disabled={status === entityStatus.loading}
          onClick={removeTodolistHandler}>
          <HighlightOffIcon />
        </IconButton>
      </motion.div>
      <motion.h3 layoutId={'title'+tdID} className={s.title}>
        <EditableSpan title={title} onChange={onChangeTitleHandler} />
      </motion.h3>
      <AddItemForm
        disabled={status === entityStatus.loading}
        addItem={addTaskHandler}
      />

      <div className={s.tasksList}>
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
        {filteredTasks && filteredTasks.length < 1 ? "Task list is empty" : ""}
      </div>

      <div className={s.filter}>
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
    </motion.div>
  )
})
