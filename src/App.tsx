import React, {useState} from 'react';
import {Todolist} from "./Todolist";
import './App.css';
import {TaskType} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active"

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        { id: v1(), title: "HTML&CSS", isDone: false},
        { id: v1(), title: "JS", isDone: true},
        { id: v1(), title: "ReactJS", isDone: false},
        { id: v1(), title: "ReactReactive", isDone: true}
    ])
    let [filter, setFilter] = useState<FilterValuesType>("all")

    const title1='My learning goals'

    function removeTask (id: string) {
        setTasks(tasks.filter( t => t.id !== id))
    }

    function addTask(title: string) {
        setTasks([{
            id: v1(), title, isDone: false
        }, ...tasks])
    }

    function changeStatus (id: string, isDone: boolean) {
        setTasks(tasks.map(t => t.id !== id ? t : {...t, isDone}))
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    let tasksForTodoList = tasks;

    switch (filter) {
        case "completed":
            tasksForTodoList = tasks.filter(task => task.isDone)
            break
        case "active":
            tasksForTodoList = tasks.filter(task => !task.isDone)
    }

    return (
        <div className="App">
            <Todolist
                filter={filter}
                title={title1}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
            />
        </div>
    );
}

export default App;
