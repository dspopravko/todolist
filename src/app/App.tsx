import React from 'react'
import './App.css'
import { AppBar, Container, ThemeProvider } from '@material-ui/core'
import { createTheme } from '@material-ui/core/styles'
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import { TodolistPage } from '../pages/Todolist/TodolistPage'
import { Login } from '../features/Auth'
import { Navbar } from '../layout/Navbar/Navbar'
import { NotFound } from '../pages/NotFound/NotFound'
import { AppLoader } from '../layout/AppLoader/AppLoader'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#AACB73',
    },
    secondary: {
      main: '#FFD4D4',
    },
  },
})
export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <AppLoader>
          <ErrorSnackbar />
          <AppBar position='static'>
            <Navbar />
          </AppBar>
          <Container>
            <Routes>
              <Route path='/' element={<TodolistPage />} />
              <Route path='/login' element={<Login />} />
              <Route path='/404' element={<NotFound />} />
              <Route path='*' element={<Navigate to={'/404'} />} />
            </Routes>
          </Container>
        </AppLoader>
      </div>
    </ThemeProvider>
  )
}

export default App
