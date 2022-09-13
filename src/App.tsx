import React, {useState} from 'react';
import {Todolist} from "./Todolist";
import './App.css';
import {TaskType} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "completed" | "active"

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
    color: string
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let todolistId3 = v1()

    let [todolists, setTodilists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "My learning goals", filter: "all", color: "#f0f8ff"},
        {id: todolistId2, title: "What to cook", filter: "completed", color: "#fff7f0"},
        {id: todolistId3, title: "What to read", filter: "completed", color: "#f7f0ff"}
    ])
    let [alltasks, setAlltasks] = useState<TasksStateType>({
        [todolistId1]: [
            { id: v1(), title: "HTML&CSS", isDone: true},
            { id: v1(), title: "JS", isDone: true},
            { id: v1(), title: "ReactJS", isDone: false},
            { id: v1(), title: "ReactReactive", isDone: true}
        ],
        [todolistId2]: [
            { id: v1(), title: "Soup", isDone: false},
            { id: v1(), title: "Chicken Salad", isDone: true},
            { id: v1(), title: "Tosts", isDone: false},
            { id: v1(), title: "Beans", isDone: true}
        ],
        [todolistId3]: [
            { id: v1(), title: "Life and Fate", isDone: false},
            { id: v1(), title: "Geschichte eines Deutschen", isDone: true},
            { id: v1(), title: "The Autumn of the Patriarch", isDone: false},
            { id: v1(), title: "Lord of the Flies", isDone: true}
        ],
    })

    function removeTask (taskID: string, tdID: string) {
        alltasks[tdID] = alltasks[tdID].filter( t => t.id !== taskID)
        setAlltasks({...alltasks})
    }

    function addTask(title: string, tdID: string) {
        const task = {id: v1(), title: title, isDone: false}
        alltasks[tdID] = [task, ...alltasks[tdID]]
        setAlltasks({...alltasks})
    }

    function changeStatus (id: string, isDone: boolean, tdID: string) {
        alltasks[tdID] = alltasks[tdID].map(t => t.id !== id ? t : {...t, isDone})
        setAlltasks({...alltasks})
    }

    function changeTitle (taskID: string, title: string, tdID: string) {
        alltasks[tdID] = alltasks[tdID].map(t => t.id !== taskID ? t : {...t, title})
        setAlltasks({...alltasks})
    }

    function changeTdTitle (tdID: string, title: string) {
        const newtodolists = todolists.map(t => t.id !== tdID ? t : {...t, title} )
        setTodilists(newtodolists)
    }

    function changeFilter(value: FilterValuesType, tdID: string) {
        let todolist = todolists.find(tl => tl.id === tdID);
        if (todolist) {
            todolist.filter = value;
            setTodilists([...todolists]);
        }
    }
    function removeTodolist (tdID: string) {
        setTodilists(todolists.filter(td => td.id !== tdID))
        delete alltasks[tdID]
        setAlltasks({...alltasks})
    }
    function addTodolist(title: string) {
        const todolist: TodolistType = {
            id: v1(),
            filter: "all",
            title: title,
            color: "#f7f0ff"
        }
        setTodilists([todolist, ...todolists]);
        setAlltasks({...alltasks,
        [todolist.id]: []})
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map( tl => {
                    let tasksForTodoList = alltasks[tl.id];

                    switch (tl.filter) {
                        case "completed":
                            tasksForTodoList = alltasks[tl.id].filter(task => task.isDone)
                            break
                        case "active":
                            tasksForTodoList = alltasks[tl.id].filter(task => !task.isDone)
                    }
            return <Todolist
                key={tl.id}
                tdID={tl.id}
                filter={tl.filter}
                title={tl.title}
                color={tl.color}
                tasks={tasksForTodoList}
                removeTodolist={removeTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                changeTaskTitle={changeTitle}
                changeTdTitle={changeTdTitle}
            />
            }
            )}
        </div>
    );
}

export default App;
