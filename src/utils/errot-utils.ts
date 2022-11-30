import {Dispatch} from 'redux'
import {ResponseType} from "../api/todolist-api";
import {AppReducerActionTypes, entityStatus, setAppErrorAC, setAppStatusAC} from "../state/app-reducer";

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {

    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC(entityStatus.failed))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC(entityStatus.failed))
}

type ErrorUtilsDispatchType = Dispatch<AppReducerActionTypes>
