import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../App";
import {
    actionType,
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAT,
    RemoveTodolistAC,
    todolistReducer
} from "./todolist-reducer";

test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all', color: "#FFF"},
        {id: todolistId2, title: 'What to read', filter: 'all', color: "#FFA"}
    ]

    const endState = todolistReducer(startState, RemoveTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2)
    expect(endState).not.toBe(startState)
});

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const newTodolistTitle = "NewTodolist Title"

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all', color: "#FFF"},
        {id: todolistId2, title: 'What to read', filter: 'all', color: "#FFA"}
    ]

    const endState = todolistReducer(startState, AddTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState).not.toBe(startState)
});

test('correct filter should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const newFilter: FilterValuesType = "completed"

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all', color: "#FFF"},
        {id: todolistId2, title: 'What to read', filter: 'all', color: "#FFA"}
    ]

    const endState = todolistReducer(startState, ChangeTodolistFilterAC(newFilter, todolistId1))

    expect(endState.length).toBe(2);
    expect(endState[0].filter).toBe(newFilter)
    expect(endState[1].filter).toBe(startState[1].filter)
    expect(endState).not.toBe(startState)
});

test('correct todolist should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const updatedTodolistTitle = "NewTodolist Title"

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all', color: "#FFF"},
        {id: todolistId2, title: 'What to read', filter: 'all', color: "#FFA"}
    ]

    const endState = todolistReducer(startState, ChangeTodolistTitleAT(updatedTodolistTitle, todolistId1))

    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe(updatedTodolistTitle)
    expect(endState[1].title).toBe(startState[1].title)
    expect(endState).not.toBe(startState)
});