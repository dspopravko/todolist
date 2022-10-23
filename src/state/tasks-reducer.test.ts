import {TasksStateType} from "../App";
import {removeTaskAC, addTaskAC, tasksReducer, changeTaskTitleAC, changeTaskStatusAC} from "./tasks-reducer";
import {AddTodolistAC, RemoveTodolistAC} from "./todolist-reducer";
import {v1} from "uuid";

let todolistId1: string
let todolistId2: string
let startState: TasksStateType

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = {
        [todolistId1]: [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "ReactJS", isDone: false},
            {id: "4", title: "ReactReactive", isDone: true}
        ],
        [todolistId2]: [
            {id: "1", title: "Soup", isDone: false},
            {id: "2", title: "Chicken Salad", isDone: true},
            {id: "3", title: "Tosts", isDone: false},
            {id: "4", title: "Beans", isDone: true}
        ]
    }
})

test("correct task should be deleted from correct array", () => {
    const action = removeTaskAC("2", todolistId2)
    const endState = tasksReducer(startState, action)
    expect(endState).toEqual({
        [todolistId1]: [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "ReactJS", isDone: false},
            {id: "4", title: "ReactReactive", isDone: true}
        ],
        [todolistId2]: [
            {id: "1", title: "Soup", isDone: false},
            {id: "3", title: "Tosts", isDone: false},
            {id: "4", title: "Beans", isDone: true}
        ]
    })
})
test("correct task should be added to correct array", () => {
    const action = addTaskAC(todolistId2, "juice");

    const endState = tasksReducer(startState, action);

    expect(endState[todolistId1].length).toBe(4)
    expect(endState[todolistId2].length).toBe(5)
    expect(endState[todolistId2][0].id).toBeDefined()
    expect(endState[todolistId2][0].title).toBe("juice")
    expect(endState[todolistId2][0].isDone).toBe(false)
})
test("title of specified task should be changed in correct array", () => {
    const action = changeTaskTitleAC(todolistId2, "2", "juice");

    const endState = tasksReducer(startState, action);

    expect(endState[todolistId1].length).toBe(4)
    expect(endState[todolistId2].length).toBe(4)
    expect(endState[todolistId2][0].id).toBeDefined()
    expect(endState[todolistId2][1].title).toBe("juice")
    expect(endState[todolistId2][0].isDone).toBe(false)
})
test("status of specified task should be changed in correct array", () => {
    const action = changeTaskStatusAC(todolistId2, "2", false);

    const endState = tasksReducer(startState, action);

    expect(endState[todolistId1].length).toBe(4)
    expect(endState[todolistId2].length).toBe(4)
    expect(endState[todolistId2][1].id).toBeDefined()
    expect(endState[todolistId2][1].title).toBe("Chicken Salad")
    expect(endState[todolistId2][0].isDone).toBe(false)
})
test("new array should be added when new todolist is added", () => {
    const action = AddTodolistAC("new todolist");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != todolistId1 && k != todolistId2);
    if (!newKey) throw Error("new key should be added")

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
test('property with todolistId should be deleted', () => {
    const action = RemoveTodolistAC(todolistId2)
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)
    expect(keys.length).toBe(1)
    expect(endState[todolistId2]).toBeUndefined()
})