import React, {useCallback, useEffect} from 'react';
import {Grid, Paper, Typography} from "@material-ui/core";
import {AddItemForm} from "../../components/AppItemForm/AddItemForm";
import {Todolist} from "../../features/Todolist/Todolist";
import {addTodolistTC, getTodolitsTC, TodolistType} from "../../state/todolist-reducer";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {Navigate} from "react-router-dom";
import s from "./TodolistPage.module.css"

export const TodolistPage = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    let todolists = useAppSelector<Array<TodolistType>>(state => state.todolists)
    const addTodolist = useCallback((title: string) => dispatch(addTodolistTC(title)), [dispatch])

    useEffect(() => {
        isLoggedIn && dispatch(getTodolitsTC())
    }, [])

    if (!isLoggedIn) return <Navigate to={"/login"}/>

    return (
        <>
            <Grid
                container
                justifyContent={"center"}
                style={{padding: "20px 0"}}
            >
                <Paper className={s.addNewTodolistContainer}>
                        <Typography variant="h6">Add new todolist:</Typography>
                        <AddItemForm addItem={addTodolist}/>
                </Paper>
            </Grid>
            <Grid wrap={'wrap'} container spacing={5}  justifyContent={"center"}>
                {todolists?.map(tl => {
                        return (
                            <Grid key={tl.id} item>
                                <Paper>
                                    <Todolist
                                        tdID={tl.id}
                                        filter={tl.filter}
                                        title={tl.title}
                                        entityStatus={tl.entityStatus}
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