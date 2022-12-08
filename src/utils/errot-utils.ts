import {Dispatch} from 'redux'
import {ResponseType} from "../api/responseTypes";
import {appSlice, entityStatus} from "../state/app-reducer";

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {

    if (data.messages.length) {
        dispatch(appSlice.actions.setAppError({error: data.messages[0]}))
    } else {
        dispatch(appSlice.actions.setAppError({error: 'Some error occurred'}))
    }
    dispatch(appSlice.actions.setAppStatus({status: entityStatus.failed}))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
    dispatch(appSlice.actions.setAppError({error: error.message}))
    dispatch(appSlice.actions.setAppStatus({status: entityStatus.failed}))
}

