import {tasksActionType, tasksReducer} from "../state/tasks-reducer";
import {todolistActionType, todolistReducer} from "../state/todolist-reducer";
import {applyMiddleware, combineReducers, compose, legacy_createStore, Store} from 'redux'
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer, AppReducerActionTypes} from "../state/app-reducer";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

export type ActionTypes = tasksActionType | todolistActionType | AppReducerActionTypes
export type ReduxStateType = ReturnType<typeof rootReducer>
export type StoreType = Store<ReduxStateType, ActionTypes>

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer,
    app: appReducer
})
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store: StoreType = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));
export type AppRootStateType = ReturnType<typeof rootReducer>
type ThunkAppDispatchType = ThunkDispatch<AppRootStateType, any, ActionTypes>
export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, ActionTypes>

//@ts-ignore
window.store = store