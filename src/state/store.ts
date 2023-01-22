import { todolistReducer } from "../features/Todolist";
import { combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { appReducer } from "../features/Application";
import { authReducer } from "../features/Auth";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { FieldErrorType } from "../api";
import { tasksReducer } from "../features/Todolist";

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
      // .concat(logger)
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export type AppDispatchType = typeof store.dispatch
export type ThunkError = { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }
//@ts-ignore
window.store = store