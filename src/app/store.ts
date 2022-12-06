import {tasksReducer} from "../state/tasks-reducer";
import {todolistReducer} from "../state/todolist-reducer";
import {combineReducers, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "../state/app-reducer";
import {authReducer} from "../state/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import logger from "redux-logger";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

export type ReduxStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer,
    app: appReducer,
    auth: authReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .prepend(thunkMiddleware)
            .concat(logger)
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

//@ts-ignore
window.store = store