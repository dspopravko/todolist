import React, {useCallback, useEffect} from 'react';
import {Todolist} from "../features/Todolist/Todolist";
import './App.css';
import {AddItemForm} from "../components/AppItemForm/AddItemForm";
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    Paper,
    ThemeProvider,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {createTheme} from "@material-ui/core/styles";
import {addTodolistTC, getTodolitsTC, TodolistType} from "../state/todolist-reducer";
import {useAppDispatch, useAppSelector} from "./store";
import {entityStatus} from "../state/app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";

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
    let todolists = useAppSelector<Array<TodolistType>>(state => state.todolists)
    const status = useAppSelector(state => state.app.status)
    const dispatch = useAppDispatch()
    const addTodolist = useCallback((title: string) => dispatch(addTodolistTC(title)), [dispatch])

    useEffect(() => {
        dispatch(getTodolitsTC())
    }, [])

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
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                    {status === entityStatus.loading && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Grid container style={{padding: "20px 0"}}>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>
                    <Grid container spacing={5} justifyContent={"center"}>
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
                </Container>
            </div>
        </ThemeProvider>
    );

}

export default App;