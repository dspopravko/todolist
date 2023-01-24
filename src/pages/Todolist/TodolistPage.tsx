import React, { useCallback, useEffect } from 'react';
import { Typography } from "@material-ui/core";
import { AddItemForm } from "../../components/AppItemForm/AddItemForm";
import { Todolist } from "../../features/Todolist";
import { useAppSelector } from "../../state/store";
import { Navigate } from "react-router-dom";
import s from "./TodolistPage.module.css"
import { selectIsLoggedIn } from "../../features/Auth";
import { todolistsActions } from '../../features/Todolist'
import { useActions } from "../../utils/redux-utils";
import { selectTodolists } from "../../features/Todolist";
import { theme } from "../../app/App";
import { AnimatePresence } from "framer-motion";

export const TodolistPage = () => {
  const { getTodolists, addTodolist } = useActions(todolistsActions)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const todolists = useAppSelector(selectTodolists)
  const addTodolistHandler = useCallback((title: string) => addTodolist({ title }), [addTodolist])

  useEffect(() => {
    isLoggedIn && getTodolists()
  }, [isLoggedIn])
  if (!isLoggedIn) return <Navigate to={"/login"} />

  return (
    <div className={s.mainContainer}>
      <div style={{backgroundColor: theme.palette.background.default}} className={s.addNewTodolistContainer}>
        <Typography variant="h6">Add new todolist:</Typography>
        <AddItemForm addItem={addTodolistHandler} />
      </div>
      <AnimatePresence>
      {todolists?.map(tl => {
          return (
            <Todolist
              key={tl.id}
              tdID={tl.id}
              filter={tl.filter}
              title={tl.title}
              entityStatus={tl.tdStatus}
            />
          )
        }
      )}
      </AnimatePresence>
    </div>
  );
}