import React, {useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Button,
    Container,
    IconButton,
    LinearProgress,
    ThemeProvider,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {createTheme} from "@material-ui/core/styles";
import {useAppDispatch, useAppSelector} from "./store";
import {entityStatus} from "../state/app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Navigate, Route, Routes} from 'react-router-dom'
import {TodolistList} from "../features/Todolist/TodolistList";
import {Login} from "../features/Login/Login";
import {isAuthTC, logoutTC} from "../state/auth-reducer";
import {CircularProgress} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#ecbcb1"
        },
        secondary: {
            main: "#e7917f"
        },
        info: {
            main: "#8de77f"
        }
    }
})

function App() {
    const status = useAppSelector(state => state.app.status)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const authLoadingState = useAppSelector(state => state.auth.loadingState)
    const username = useAppSelector(state => state.auth.user)
    const dispatch = useAppDispatch()

    const logoutBtnHandler = () => dispatch(logoutTC())

    useEffect(() => {
            dispatch(isAuthTC())
    }, [])

    if (authLoadingState === entityStatus.loading) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <ErrorSnackbar/>
                <AppBar position="static">
                    <Toolbar style={{justifyContent: "space-between"}}>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            Todolists
                        </Typography>
                        <Button onClick={() => logoutBtnHandler()}
                                color="inherit">
                            {isLoggedIn && 'Logout'}
                        </Button>
                        {<span>{username}</span>}
                    </Toolbar>
                    {status === entityStatus.loading && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path="/" element={<TodolistList/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>}/>
                        <Route path='*' element={<Navigate to={'/404'}/>}/>
                    </Routes>
                </Container>
            </div>
        </ThemeProvider>
    );

}

export default App;