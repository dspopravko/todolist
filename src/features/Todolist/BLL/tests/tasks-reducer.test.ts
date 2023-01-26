import { tasksReducer, TasksStateType } from '../slices/tasksSlice'
import { tasksAsyncActions } from '../actions/taskAsyncActions'
import { todolistAsyncActions } from '../actions/todolistAsyncActions'
import { v1 } from 'uuid'
import { Priority } from '../../../../models/MPriority'
import { TaskStatus } from '../../../../models/MTaskStatus'
import { mockTasksState } from './mockTasksState'

const { addTodolist, removeTodolist } = todolistAsyncActions
const { addTask, updateTask, removeTask } = tasksAsyncActions

let todolistId1: string
let todolistId2: string
let todolistId3: string
let tasksState: TasksStateType

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()
  todolistId3 = v1()
  tasksState = mockTasksState(todolistId1, todolistId2, todolistId3)
})

test('correct task should be deleted from correct array', () => {
  const param = { todolistId: todolistId2, taskId: '2' }
  const action = removeTask.fulfilled(param, 'requestId', param)
  const endStateTasks = tasksReducer(tasksState, action)
  expect(endStateTasks[todolistId1].length).toEqual(4)
  expect(endStateTasks[todolistId2].length).toEqual(3)
  expect(endStateTasks[todolistId3].length).toEqual(4)
  expect(endStateTasks[todolistId2][0].title).toEqual('Soup')
  expect(endStateTasks[todolistId2][1].title).toEqual('Tosts')
  expect(endStateTasks[todolistId2][2].title).toEqual('Beans')
})
test('correct task should be added to correct array', () => {
  const date = new Date().getDate().toString()
  const param = {
    id: '100',
    title: 'Juice',
    status: TaskStatus.New,
    description: 'Description',
    order: 0,
    priority: Priority.Middle,
    startDate: date,
    deadline: date,
    addedDate: date,
    todoListId: todolistId2,
  }
  const action = addTask.fulfilled(param, 'requestId', {
    todolistId: todolistId2,
    title: 'Juice',
  })

  const endState = tasksReducer(tasksState, action)

  expect(endState[todolistId1].length).toBe(4)
  expect(endState[todolistId2].length).toBe(5)
  expect(endState[todolistId2][0].id).toBe('100')
  expect(endState[todolistId2][0].title).toBe('Juice')
  expect(endState[todolistId2][0].status).toBe(TaskStatus.New)
})
test('title of specified task should be changed', () => {
  const param = {
    todolistId: todolistId2,
    taskId: '2',
    title: 'Bread',
    status: TaskStatus.Completed,
  }
  const action = updateTask.fulfilled(param, 'requestId', param)

  const endState = tasksReducer(tasksState, action)

  expect(endState[todolistId1].length).toBe(4)
  expect(endState[todolistId2].length).toBe(4)
  expect(endState[todolistId2][0].id).toBeDefined()
  expect(endState[todolistId2][1].title).toBe('Bread')
  expect(endState[todolistId2][1].status).toBe(TaskStatus.Completed)
})
test('status of specified task should be changed in correct array', () => {
  const param = {
    todolistId: todolistId2,
    taskId: '2',
    title: 'orange',
    status: TaskStatus.Completed,
  }
  const action = updateTask.fulfilled(param, 'requestId', param)

  const endStateTasks = tasksReducer(tasksState, action)

  expect(endStateTasks[todolistId1].length).toBe(4)
  expect(endStateTasks[todolistId2].length).toBe(4)
  expect(endStateTasks[todolistId2][1].id).toBeDefined()
  expect(endStateTasks[todolistId2][1].title).toBe('orange')
  expect(endStateTasks[todolistId2][1].status).toBe(TaskStatus.Completed)
  expect(endStateTasks[todolistId2][0].status).toBe(TaskStatus.New)
})
test('new array should be added when new todolist is added', () => {
  const param = {
    todolist: {
      id: 'blabla',
      title: 'new todolist',
      order: 0,
      addedDate: '',
    },
  }
  const action = addTodolist.fulfilled(param.todolist, 'requestId', {
    title: 'new todolist',
  })
  const endStateTasks = tasksReducer(tasksState, action)

  const todolistsId = Object.keys(endStateTasks)
  const addedTodolistId = todolistsId.find(
    (k) => k != todolistId1 && k != todolistId2 && k != todolistId3
  )
  if (!addedTodolistId) {throw Error('new key should be added')}

  expect(todolistsId.length).toBe(4)
  expect(endStateTasks[addedTodolistId]).toEqual([])
})
test('property with todolistId should be deleted', () => {
  const param = { todolistId: todolistId2 }
  const action = removeTodolist.fulfilled(param, 'requestId', param)
  const endStateTasks = tasksReducer(tasksState, action)
  const keys = Object.keys(endStateTasks)
  expect(keys.length).toBe(2)
  expect(endStateTasks[todolistId2]).toBeUndefined()
})
