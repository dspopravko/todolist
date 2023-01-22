import React, { useCallback, useEffect } from 'react';
import { Grid, Paper, Typography } from "@material-ui/core";
import { AddItemForm } from "../../components/AppItemForm/AddItemForm";
import { Todolist } from "../../features/Todolist";
import { useAppSelector } from "../../state/store";
import { Navigate } from "react-router-dom";
import s from "./TodolistPage.module.css"
import { selectIsLoggedIn } from "../../features/Auth";
import { todolistsActions } from '../../features/Todolist'
import { useActions } from "../../utils/redux-utils";
import { selectTodolists } from "../../features/Todolist";

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
    <>
      <Grid
        container
        justifyContent={"center"}
        style={{ padding: "20px 0" }}
      >
        <Paper className={s.addNewTodolistContainer}>
          <Typography variant="h6">Add new todolist:</Typography>
          <AddItemForm addItem={addTodolistHandler} />
        </Paper>
      </Grid>
      <Grid wrap={'wrap'} container spacing={5} justifyContent={"center"}>
        {todolists?.map(tl => {
            return (
              <Grid key={tl.id} item>
                <Paper>
                  <Todolist
                    tdID={tl.id}
                    filter={tl.filter}
                    title={tl.title}
                    entityStatus={tl.tdStatus}
                  />
                </Paper>
              </Grid>
            )
          }
        )}
      </Grid>
    </>
  );
}