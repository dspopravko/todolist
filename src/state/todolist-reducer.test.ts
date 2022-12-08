import {
    todolistReducer, todolistSlice,
    TodolistType
} from "./todolist-reducer";
import {v1} from "uuid";
import {entityStatus} from "./app-reducer";

let todolistId1: string
let todolistId2: string
let todolistId3: string
let startState: TodolistType[]

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    todolistId3 = v1()
    startState = [
        {id: todolistId1, title: "My learning goals", filter: "all", order: 0, addedDate: "", entityStatus: entityStatus.idle},
        {id: todolistId2, title: "What to cook", filter: "all", order: 0, addedDate: "", entityStatus: entityStatus.idle},
        {id: todolistId3, title: "What to read", filter: "all", order: 0, addedDate: "", entityStatus: entityStatus.idle}
    ]
})
test('correct todolist should be removed', () => {
    const endState = todolistReducer(startState, todolistSlice.actions.RemoveTodolist({todolistId: todolistId2}))

    expect(endState.length).toBe(2)
    expect(endState[1].id).toBe(todolistId3)
})
test('correct todolist should be added', () => {

    const endState = todolistReducer(startState, todolistSlice.actions.AddTodolist({title: "New Title", todolistId: "new-id"}))

    expect(endState.length).toBe(4)
    expect(endState[0].title).toBe("New Title")
    expect(endState[0].filter).toBe('all')
    expect(endState[0].id).toBeDefined()

})
test('correct todolist should change its name', () => {

    const endState = todolistReducer(startState, todolistSlice.actions.ChangeTodolistTitle({title: "New title", todolistId: todolistId2}))

    expect(endState[0].title).toBe("My learning goals")
    expect(endState[1].title).toBe("New title")
    expect(endState[2].title).toBe("What to read")
})
test('correct filter of todolist should be changed', () => {
    const endState = todolistReducer(startState, todolistSlice.actions.ChangeTodolistFilter({filter: "completed",todolistId: todolistId2}))

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe("completed")
    expect(endState[2].filter).toBe("all")
})