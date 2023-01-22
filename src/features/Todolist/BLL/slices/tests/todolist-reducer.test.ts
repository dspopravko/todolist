import {
  todolistReducer,
  TodolistType
} from "../todolistSlice";
import { v1 } from "uuid";
import { entityStatus } from "../../../../../models/MEntityStatus";
import { todolistsActions } from "../../../index";

const {
  changeTodolistTitle,
  addTodolist,
  removeTodolist,
  changeTodolistFilter
} = todolistsActions

let todolistId1: string
let todolistId2: string
let todolistId3: string
let startState: TodolistType[]

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()
  todolistId3 = v1()
  startState = [
    {
      id: todolistId1,
      title: "My learning goals",
      filter: "all",
      order: 0,
      addedDate: "",
      tdStatus: entityStatus.idle
    },
    { id: todolistId2, title: "What to cook", filter: "all", order: 0, addedDate: "", tdStatus: entityStatus.idle },
    { id: todolistId3, title: "What to read", filter: "all", order: 0, addedDate: "", tdStatus: entityStatus.idle }
  ]
})
test('correct todolist should be removed', () => {
  const newTd = { todolistId: todolistId1 }
  const endState = todolistReducer(startState, removeTodolist.fulfilled(newTd, 'requestId', newTd))

  expect(endState.length).toBe(2)
  expect(endState[1].id).toBe(todolistId3)
})
test('correct todolist should be added', () => {
  const newTd = { title: "New Title", id: "new-id", order: 0, addedDate: '12' }
  const endState = todolistReducer(startState, addTodolist.fulfilled(newTd, 'requestId', newTd))

  expect(endState.length).toBe(4)
  expect(endState[0].title).toBe("New Title")
  expect(endState[0].filter).toBe('all')
  expect(endState[0].id).toBeDefined()

})
test('correct todolist should change its name', () => {
  const newTd = { title: "New title", todolistId: todolistId2 }
  const endState = todolistReducer(startState, changeTodolistTitle.fulfilled(newTd, 'requestId', newTd))

  expect(endState[0].title).toBe("My learning goals")
  expect(endState[1].title).toBe("New title")
  expect(endState[2].title).toBe("What to read")
})
test('correct filter of todolist should be changed', () => {
  const action = changeTodolistFilter({todolistId: todolistId2, filter: "completed"})
  const endState = todolistReducer(startState, action)

  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe("completed")
  expect(endState[2].filter).toBe("all")
})