import {tasksActionType, tasksReducer} from "./tasks-reducer";
import {todolistActionType, todolistReducer} from "./todolist-reducer";
import {AnyAction, applyMiddleware, combineReducers, compose, legacy_createStore, Store} from 'redux'
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

export type ActionTypes = tasksActionType | todolistActionType
export type ReduxStateType = ReturnType<typeof rootReducer>
export type StoreType = Store<ReduxStateType, ActionTypes>

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store: StoreType = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));
export type AppRootStateType = ReturnType<typeof rootReducer>
type ThunkAppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

//@ts-ignore
window.store = store