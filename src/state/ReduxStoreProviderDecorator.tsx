import React from 'react';
import {Provider} from "react-redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistReducer} from "./todolist-reducer";
import {combineReducers, legacy_createStore} from "redux";
import {AppRootStateType} from "../app/store";
import {v1} from "uuid";
import {appReducer, entityStatus} from "./app-reducer";
import {Priority} from "../models/MPriority";
import {TaskStatus} from "../models/MTaskStatus";

const initialGlobalState: AppRootStateType = {
    auth: {
        isLoggedIn: true,
        errors: null,
        user: 'User',
        loadingState: entityStatus.idle
    },
    app: {
        status: entityStatus.idle,
        error: ''
    },
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', order: 0, addedDate: "", entityStatus: entityStatus.idle},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', order: 0, addedDate: "", entityStatus: entityStatus.idle}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', status: TaskStatus.New, todoListId: "todolistId1", addedDate: '', startDate: '', deadline: '', description: '', order: 0, priority: Priority.Hi},
            {id: v1(), title: 'JS', status: TaskStatus.Completed, todoListId: "todolistId1", addedDate: '', startDate: '', deadline: '', description: '', order: 0, priority: Priority.Hi},
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', status: TaskStatus.Completed, todoListId: "todolistId2", addedDate: '', startDate: '', deadline: '', description: '', order: 0, priority: Priority.Hi},
            {id: v1(), title: 'React Book', status: TaskStatus.Completed, todoListId: "todolistId2", addedDate: '', startDate: '', deadline: '', description: '', order: 0, priority: Priority.Hi},
        ]
    }
}

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer,
    app: appReducer
})

export const StoryBookStore = legacy_createStore(rootReducer, initialGlobalState);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={StoryBookStore}>{storyFn()}</Provider>
}