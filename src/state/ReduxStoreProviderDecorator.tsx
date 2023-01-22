import React from 'react';
import { Provider } from "react-redux";
import { todolistReducer } from "../features/Todolist";
import { combineReducers } from "redux";
import { AppRootStateType } from "./store";
import { v1 } from "uuid";
import { appReducer } from "../features/Application";
import { Priority } from "../models/MPriority";
import { TaskStatus } from "../models/MTaskStatus";
import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";
import { authReducer } from "../features/Auth";
import { entityStatus } from "../models/MEntityStatus";
import { tasksReducer } from "../features/Todolist";

const initialGlobalState: AppRootStateType = {
  auth: {
    isAuth: true,
    errors: null,
    user: 'User',
    state: 'idle'
  },
  app: {
    status: 'idle',
    error: ''
  },
  todolists: [
    { id: 'todolistId1', title: 'What to learn', filter: 'all', order: 0, addedDate: "", tdStatus: entityStatus.idle },
    { id: 'todolistId2', title: 'What to buy', filter: 'all', order: 0, addedDate: "", tdStatus: entityStatus.idle }
  ],
  tasks: {
    ['todolistId1']: [
      {
        id: v1(),
        title: 'HTML&CSS',
        status: TaskStatus.New,
        todoListId: "todolistId1",
        addedDate: '',
        startDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: Priority.Hi
      },
      {
        id: v1(),
        title: 'JS',
        status: TaskStatus.Completed,
        todoListId: "todolistId1",
        addedDate: '',
        startDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: Priority.Hi
      },
    ],
    ['todolistId2']: [
      {
        id: v1(),
        title: 'Milk',
        status: TaskStatus.Completed,
        todoListId: "todolistId2",
        addedDate: '',
        startDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: Priority.Hi
      },
      {
        id: v1(),
        title: 'React Book',
        status: TaskStatus.Completed,
        todoListId: "todolistId2",
        addedDate: '',
        startDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: Priority.Hi
      },
    ]
  }
}

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistReducer,
  app: appReducer,
  auth: authReducer
})

export const StoryBookStore = configureStore({
  reducer: rootReducer,
  preloadedState: initialGlobalState,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .prepend(thunkMiddleware)
      .concat(logger)
})


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={StoryBookStore}>{storyFn()}</Provider>
}