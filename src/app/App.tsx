import React, { useEffect } from 'react';
import './App.css';
import { AppBar, Container, LinearProgress, ThemeProvider, } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import { useAppSelector } from "../state/store";
import { ErrorSnackbar } from "../components/ErrorSnackbar/ErrorSnackbar";
import { Navigate, Route, Routes } from 'react-router-dom'
import { TodolistPage } from "../pages/Todolist/TodolistPage";
import { Login } from "../features/Auth";
import { Navbar } from "../layout/Navbar/Navbar";
import { NotFound } from "../pages/NotFound/NotFound";
import { selectStatus } from "../features/Application";
import { selectIsLoggedIn } from "../features/Auth";
import { useActions } from "../utils/redux-utils";
import { appActions } from "../features/Application";

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

export const App = () => {
  const status = useAppSelector(selectStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const { initializeApp } = useActions(appActions)
  useEffect(() => {
    if (!isLoggedIn) {
      setTimeout(()=>{
        initializeApp()
      },100)
    }

  }, [])

  // if (status === entityStatus.loading) {
  //   return <div
  //     style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
  //     <CircularProgress />
  //   </div>
  // }
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <ErrorSnackbar />
        <AppBar position="static">
          <Navbar />
        </AppBar>
        {status === "loading" && <LinearProgress />}
        <Container>
          <Routes>
            <Route path="/" element={<TodolistPage />} />
            <Route path="/login" element={<Login />} />
            <Route path='/404' element={<NotFound />} />
            <Route path='*' element={<Navigate to={'/404'} />} />
          </Routes>
        </Container>
      </div>

    </ThemeProvider>
  );
}

export default App;