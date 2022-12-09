import React, {useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Container,
    ThemeProvider,
} from "@material-ui/core";
import {createTheme} from "@material-ui/core/styles";
import {useAppDispatch, useAppSelector} from "./store";
import {entityStatus} from "../state/app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Navigate, Route, Routes} from 'react-router-dom'
import {TodolistPage} from "../pages/Todolist/TodolistPage";
import {Login} from "../features/Login/Login";
import {isAuthTC} from "../state/auth-reducer";
import {CircularProgress} from "@mui/material";
import {Navbar} from "../components/Navbar/Navbar";
import {NotFound} from "../pages/NotFound/NotFound";

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

    const authLoadingState = useAppSelector(state => state.auth.loadingState)
    const dispatch = useAppDispatch()

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
                    <Navbar/>
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path="/" element={<TodolistPage/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path='/404' element={<NotFound/>}/>
                        <Route path='*' element={<Navigate to={'/404'}/>}/>
                    </Routes>
                </Container>
            </div>
        </ThemeProvider>
    );
}

export default App;