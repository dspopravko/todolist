import React from 'react';
import {Provider} from "react-redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistReducer} from "./todolist-reducer";
import {combineReducers, legacy_createStore} from "redux";
import {AppRootStateType} from "./store";
import {v1} from "uuid";

const initialGlobalState = {
    todolists: [
        {tdId: 'todolistId1', title: 'What to learn', filter: 'all', color: "#f0f8ff"},
        {tdId: 'todolistId2', title: 'What to buy', filter: 'all', color: "#f1fff0"}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', isDone: false},
            {id: v1(), title: 'JS', isDone: true}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: true}
        ]
    }
}

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
})

export const StoryBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={StoryBookStore}>{storyFn()}</Provider>
}