import {ActionTypes, AppThunk} from "../app/store";
import {entityStatus, setAppStatusAC} from "./app-reducer";
import {authAPI, LoginType} from "../api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/errot-utils";

const initialState = {
    user: null as string | null,
    isLoggedIn: false,
    errors: null,
    loadingState: entityStatus.idle
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'login/SET-USERNAME-LOGGED-IN':
            return {...state, user: action.username}
        case 'login/SET-LOADING':
            return {...state, loadingState: action.isLoading}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)
export const setUserLoggedInAC = (username: string) =>
    ({type: 'login/SET-USERNAME-LOGGED-IN', username} as const)
export const setAuthLoadingAC = (isLoading: entityStatus) =>
    ({type: 'login/SET-LOADING', isLoading} as const)

// thunks
export const loginTC = (data: LoginType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC(entityStatus.loading))
    dispatch(setAuthLoadingAC(entityStatus.loading))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC(entityStatus.idle))
                dispatch(setIsLoggedInAC(true))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((e) => {
            handleServerNetworkError(e, dispatch)
        })
        .finally(() => {
            dispatch(setAppStatusAC(entityStatus.idle))
            dispatch(setAuthLoadingAC(entityStatus.idle))
        })
}

export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC(entityStatus.loading))
    dispatch(setAuthLoadingAC(entityStatus.loading))
    authAPI.logout()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC(entityStatus.idle))
            } else {
                dispatch(setAppStatusAC(entityStatus.failed))
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((e) => {
            handleServerNetworkError(e, dispatch)
        })
        .finally(() => {
            dispatch(setAppStatusAC(entityStatus.idle))
            dispatch(setAuthLoadingAC(entityStatus.idle))
        })
}

export const isAuthTC = (): AppThunk => (dispatch, getState) => {
    const state = getState()
    if (state.auth.loadingState !== entityStatus.loading) {
        dispatch(setAppStatusAC(entityStatus.loading))
        dispatch(setAuthLoadingAC(entityStatus.loading))
        authAPI.isAuth()
            .then((res) => {
                if (res.data.resultCode === 0) {
                    console.log('I remember you!')
                    dispatch(setIsLoggedInAC(true))
                }
            })
            .catch((e) => {
                handleServerNetworkError(e, dispatch)
            })
            .finally(() => {
                dispatch(setAppStatusAC(entityStatus.idle))
                dispatch(setAuthLoadingAC(entityStatus.idle))
            })
    }
}

// types
export type AuthReducerActionType =
    ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setUserLoggedInAC>
    | ReturnType<typeof setAuthLoadingAC>
