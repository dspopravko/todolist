import { tasksReducer, todolistReducer } from "../features/Todolist";
import { appReducer } from "../features/Application";
import { authReducer } from "../features/Auth";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  tasks: tasksReducer || (() => null),
  todolists: todolistReducer || (() => null),
  app: appReducer || (() => null),
  auth: authReducer || (() => null)
})