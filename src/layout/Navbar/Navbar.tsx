import React from 'react';
import {Button, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {GitHub, Menu} from "@material-ui/icons";
import {logoutTC} from "../../state/auth-reducer";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {entityStatus} from "../../state/app-reducer";
import s from "./Navbar.module.css"

export const Navbar = () => {

    const status = useAppSelector(state => state.app.status)
    const username = useAppSelector(state => state.auth.user)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()
    const logoutBtnHandler = () => dispatch(logoutTC())
    const user = username || "Guest"

    return (
        <>
            <Toolbar className={s.toolbar}>

                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Menu/>
                </IconButton>
                <div className={s.navbar}>

                    <Typography variant="h6">
                        Todolists
                    </Typography>

                    <div className={s.logoutWrapper}>
                        <Button onClick={() => logoutBtnHandler()}
                                color="inherit">
                            {isLoggedIn && 'Logout'}
                        </Button>
                        {isLoggedIn &&
                            <div className={s.user}>
                                <p>
                                    {user}
                                </p>
                            </div>
                        }
                    </div>
                </div>
                <IconButton onClick={() => {
                    const a = window.open('https://github.com/dspopravko/03-todolist', '_blank')
                    a && a.focus()
                }} edge="start" color="inherit" aria-label="menu">
                    <GitHub/>
                </IconButton>

            </Toolbar>
            {status === entityStatus.loading && <LinearProgress/>}
        </>
    );

}