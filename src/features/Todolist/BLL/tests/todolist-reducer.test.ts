import {
  todolistReducer,
  TodolistType
} from "../slices/todolistSlice";
import { v1 } from "uuid";
import { todolistsActions } from "../../index";
import { mockTodolistState } from "./mockTodolistState";

const {
  changeTodolistTitle,
  addTodolist,
  removeTodolist,
  changeTodolistFilter
} = todolistsActions

let todolistId1: string
let todolistId2: string
let todolistId3: string
let startStateTodolists: TodolistType[]

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()
  todolistId3 = v1()
  startStateTodolists = mockTodolistState(todolistId1, todolistId2, todolistId3)
})
test('correct todolist should be removed', () => {
  const newTd = { todolistId: todolistId1 }
  const action = removeTodolist.fulfilled(newTd, 'requestId', newTd)
  const endStateTodolists = todolistReducer(startStateTodolists, action)

  expect(endStateTodolists.length).toBe(2)
  expect(endStateTodolists[1].id).toBe(todolistId3)
})
test('correct todolist should be added', () => {
  const newTd = { title: "New Title", id: "new-id", order: 0, addedDate: '12' }
  const endStateTodolists = todolistReducer(startStateTodolists, addTodolist.fulfilled(newTd, 'requestId', newTd))

  expect(endStateTodolists.length).toBe(4)
  expect(endStateTodolists[0].title).toBe("New Title")
  expect(endStateTodolists[0].filter).toBe('all')
  expect(endStateTodolists[0].id).toBeDefined()

})
test('correct todolist should change its name', () => {
  const newTd = { title: "New title", todolistId: todolistId2 }
  const endStateTodolists = todolistReducer(startStateTodolists, changeTodolistTitle.fulfilled(newTd, 'requestId', newTd))

  expect(endStateTodolists[0].title).toBe("What to build")
  expect(endStateTodolists[1].title).toBe("New title")
  expect(endStateTodolists[2].title).toBe("What to read")
})
test('correct filter of todolist should be changed', () => {
  const action = changeTodolistFilter({ todolistId: todolistId2, filter: "completed" })
  const endStateTodolists = todolistReducer(startStateTodolists, action)

  expect(endStateTodolists[0].filter).toBe("all")
  expect(endStateTodolists[1].filter).toBe("completed")
  expect(endStateTodolists[2].filter).toBe("completed")
})