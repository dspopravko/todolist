import thunkMiddleware from 'redux-thunk'
import { TypedUseSelectorHook, useSelector } from "react-redux";
import logger from "redux-logger";
import { FieldErrorType } from "../api";
import { rootReducer } from "./reducers";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
      .concat(logger)
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export type AppDispatchType = typeof store.dispatch
export type ThunkError = { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }
//@ts-ignore
window.store = store
