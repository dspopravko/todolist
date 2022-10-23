import React from 'react';
import {Todolist} from "./Todolist";
import './App.css';
import {TaskType} from "./Todolist";
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
import {AddTodolistAC} from "./state/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

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

export type FilterValuesType = "all" | "completed" | "active"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
    color: string
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

    const dispatch = useDispatch()

    const addTodolist = (title: string) => dispatch(AddTodolistAC(title))

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
                        {todolists.map(tl => {
                                return (
                                    <Grid item key={tl.id}>
                                        <Paper>
                                            <Todolist
                                                tdID={tl.id}
                                                filter={tl.filter}
                                                title={tl.title}
                                                color={tl.color}
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
