import {
    addTaskAC,
    tasksReducer,
    TasksStateType, deleteTaskAC, changeTaskAC
} from "./tasks-reducer";
import {AddTodolistAC, RemoveTodolistAC} from "./todolist-reducer";
import {v1} from "uuid";
import {Priority, TaskStatus} from "../api/todolist-api";

let todolistId1: string
let todolistId2: string
let startState: TasksStateType

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = {
        [todolistId1]: [
            {id: "1", title: "HTML&CSS", status: TaskStatus.Completed, todoListId: todolistId1, addedDate: '', startDate: '', deadline: '', description: '', order: 0, priority: Priority.Hi},
            {id: "2", title: "JS", status: TaskStatus.Completed, todoListId: todolistId1, addedDate: '', startDate: '', deadline: '', description: '', order: 0, priority: Priority.Hi},
            {id: "3", title: "ReactJS", status: TaskStatus.New, todoListId: todolistId1, addedDate: '', startDate: '', deadline: '', description: '', order: 0, priority: Priority.Hi},
            {id: "4", title: "ReactReactive", status: TaskStatus.Completed, todoListId: todolistId1, addedDate: '', startDate: '', deadline: '', description: '', order: 0, priority: Priority.Hi},
        ],
        [todolistId2]: [
            {id: "1", title: "Soup", status: TaskStatus.New, todoListId: todolistId2, addedDate: '', startDate: '', deadline: '', description: '', order: 0, priority: Priority.Hi},
            {id: "2", title: "Chicken Salad", status: TaskStatus.Completed, todoListId: todolistId2, addedDate: '', startDate: '', deadline: '', description: '', order: 0, priority: Priority.Hi},
            {id: "3", title: "Tosts", status: TaskStatus.New, todoListId: todolistId2, addedDate: '', startDate: '', deadline: '', description: '', order: 0, priority: Priority.Hi},
            {id: "4", title: "Beans", status: TaskStatus.Completed, todoListId: todolistId2, addedDate: '', startDate: '', deadline: '', description: '', order: 0, priority: Priority.Hi},
        ]
    }
})

test("correct task should be deleted from correct array", () => {
    const action = deleteTaskAC(todolistId2,"2")
    const endState = tasksReducer(startState, action)
    expect(endState).toEqual({
        [todolistId1]: [
            {id: "1", title: "HTML&CSS", status: TaskStatus.Completed, todoListId: todolistId1, addedDate: '', startDate: '', deadline: '', description: '', order: 0, priority: Priority.Hi},
            {id: "2", title: "JS", status: TaskStatus.Completed, todoListId: todolistId1, addedDate: '', startDate: '', deadline: '', description: '', order: 0, priority: Priority.Hi},
            {id: "3", title: "ReactJS", status: TaskStatus.New, todoListId: todolistId1, addedDate: '', startDate: '', deadline: '', description: '', order: 0, priority: Priority.Hi},
            {id: "4", title: "ReactReactive", status: TaskStatus.Completed, todoListId: todolistId1, addedDate: '', startDate: '', deadline: '', description: '', order: 0, priority: Priority.Hi},
        ],
        [todolistId2]: [
            {id: "1", title: "Soup", status: TaskStatus.New, todoListId: todolistId2, addedDate: '', startDate: '', deadline: '', description: '', order: 0, priority: Priority.Hi},
            {id: "3", title: "Tosts", status: TaskStatus.New, todoListId: todolistId2, addedDate: '', startDate: '', deadline: '', description: '', order: 0, priority: Priority.Hi},
            {id: "4", title: "Beans", status: TaskStatus.Completed, todoListId: todolistId2, addedDate: '', startDate: '', deadline: '', description: '', order: 0, priority: Priority.Hi},
        ]
    })
})
test("correct task should be added to correct array", () => {
    const newTask = {id: 'task1ID',
        title: 'juice',
        status: TaskStatus.New,
        description: 'title',
        order: 0,
        priority: Priority.Middle,
        startDate: 'title',
        deadline: 'title',
        addedDate: 'title',
        todoListId: todolistId1}
    const action = addTaskAC(todolistId2, newTask);

    const endState = tasksReducer(startState, action);

    expect(endState[todolistId1].length).toBe(4)
    expect(endState[todolistId2].length).toBe(5)
    expect(endState[todolistId2][0].id).toBeDefined()
    expect(endState[todolistId2][0].title).toBe("juice")
    expect(endState[todolistId2][0].status).toBe(TaskStatus.New)
})
test("title of specified task should be changed in correct array", () => {
    const action = changeTaskAC(todolistId2, "2", "juice", TaskStatus.New);

    const endState = tasksReducer(startState, action);

    expect(endState[todolistId1].length).toBe(4)
    expect(endState[todolistId2].length).toBe(4)
    expect(endState[todolistId2][0].id).toBeDefined()
    expect(endState[todolistId2][1].title).toBe("juice")
    expect(endState[todolistId2][0].status).not.toBe(TaskStatus.Completed)
})
test("status of specified task should be changed in correct array", () => {
    const action = changeTaskAC(todolistId2, "2", 'orange', TaskStatus.Completed);

    const endState = tasksReducer(startState, action);

    expect(endState[todolistId1].length).toBe(4)
    expect(endState[todolistId2].length).toBe(4)
    expect(endState[todolistId2][1].id).toBeDefined()
    expect(endState[todolistId2][1].title).toBe("orange")
    expect(endState[todolistId2][1].status).toBe(TaskStatus.Completed)
    expect(endState[todolistId2][0].status).toBe(TaskStatus.New)
})
test("new array should be added when new todolist is added", () => {
    const action = AddTodolistAC("new todolist", "new-id");

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