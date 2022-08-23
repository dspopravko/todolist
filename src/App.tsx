import React, {useState} from 'react';
import {Todolist} from "./Todolist";
import './App.css';
import {TaskType} from "./Todolist";

export type FilterValuesType = "all" | "completed" | "active"

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        { id: 1, title: "HTML&CSS", isDone: false},
        { id: 2, title: "JS", isDone: true},
        { id: 3, title: "ReactJS", isDone: false},
        { id: 4, title: "ReactReactive", isDone: true}
    ])
    let [filter, setFilter] = useState<FilterValuesType>("all")

    const title1='My learning goals'

    function removeTask (id: number) {
        setTasks(tasks.filter( t => t.id !== id))
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
                title={title1}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
