import {
    AddTodolistAC, ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistReducer, TodolistType
} from "./todolist-reducer";
import {v1} from "uuid";

let todolistId1: string
let todolistId2: string
let todolistId3: string
let startState: TodolistType[]

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    todolistId3 = v1()
    startState = [
        {tdId: todolistId1, title: "My learning goals", filter: "all"},
        {tdId: todolistId2, title: "What to cook", filter: "all"},
        {tdId: todolistId3, title: "What to read", filter: "all"}
    ]
})
test('correct todolist should be removed', () => {
    const endState = todolistReducer(startState, RemoveTodolistAC(todolistId2))

    expect(endState.length).toBe(2)
    expect(endState[1].tdId).toBe(todolistId3)
})
test('correct todolist should be added', () => {

    const endState = todolistReducer(startState, AddTodolistAC("New Title"))

    expect(endState.length).toBe(4)
    expect(endState[0].title).toBe("New Title")
    expect(endState[0].filter).toBe('all')
    expect(endState[0].tdId).toBeDefined()

})
test('correct todolist should change its name', () => {

    const endState = todolistReducer(startState, ChangeTodolistTitleAC("New title", todolistId2))

    expect(endState[0].title).toBe("My learning goals")
    expect(endState[1].title).toBe("New title")
    expect(endState[2].title).toBe("What to read")
})
test('correct filter of todolist should be changed', () => {
    const endState = todolistReducer(startState, ChangeTodolistFilterAC("completed", todolistId2))

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe("completed")
    expect(endState[2].filter).toBe("all")
})