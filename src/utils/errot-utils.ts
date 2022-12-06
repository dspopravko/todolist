import {Dispatch} from 'redux'
import {ResponseType} from "../api/responseTypes";
import {appSlice, entityStatus} from "../state/app-reducer";

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {

    if (data.messages.length) {
        dispatch(appSlice.actions.setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(appSlice.actions.setAppErrorAC({error: 'Some error occurred'}))
    }
    dispatch(appSlice.actions.setAppStatusAC({status: entityStatus.failed}))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
    dispatch(appSlice.actions.setAppErrorAC({error: error.message}))
    dispatch(appSlice.actions.setAppStatusAC({status: entityStatus.failed}))
}

