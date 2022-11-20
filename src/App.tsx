import React, {useCallback, useEffect} from 'react';
import {Todolist} from "./Todolist";
import './App.css';
import {AddItemForm} from "./AddItemForm";
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    Paper,
    ThemeProvider,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {createTheme} from "@material-ui/core/styles";
import {AddTodolistAC, getTodolitsTC, TodolistType} from "./state/todolist-reducer";
import {useAppDispatch, useAppSelector} from "./state/store";

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

    const dispatch = useAppDispatch()

    const addTodolist = useCallback((title: string) => dispatch(AddTodolistAC(title)), [dispatch])

    useEffect(() => {
        dispatch(getTodolitsTC())
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
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