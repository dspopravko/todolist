import {appSlice, entityStatus} from "./app-reducer";
import {authAPI, LoginType} from "../api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/errot-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {AppRootStateType} from "../app/store";

const initialState = {
    user: null as string | null,
    isLoggedIn: false,
    errors: null,
    loadingState: entityStatus.idle
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{isLoggedIn: boolean}>) {
            state.isLoggedIn = action.payload.isLoggedIn
        },
        setUserLoggedInAC(state, action: PayloadAction<{username: string}>) {
            state.user = action.payload.username
        },
        setAuthLoadingAC(state, action: PayloadAction<{isLoading: entityStatus}>) {
            state.loadingState = action.payload.isLoading
        }
    }
})

export const authReducer = authSlice.reducer

// thunks
export const loginTC = (data: LoginType) => (dispatch: Dispatch) => {
    dispatch(appSlice.actions.setAppStatusAC({status: entityStatus.loading}))
    dispatch(authSlice.actions.setAuthLoadingAC({isLoading: entityStatus.loading}))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(appSlice.actions.setAppStatusAC({status: entityStatus.idle}))
                dispatch(authSlice.actions.setIsLoggedInAC({isLoggedIn: true}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((e) => {
            handleServerNetworkError(e, dispatch)
        })
        .finally(() => {
            dispatch(appSlice.actions.setAppStatusAC({status: entityStatus.idle}))
            dispatch(authSlice.actions.setAuthLoadingAC({isLoading: entityStatus.idle}))
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(appSlice.actions.setAppStatusAC({status: entityStatus.loading}))
    dispatch(authSlice.actions.setAuthLoadingAC({isLoading: entityStatus.loading}))
    authAPI.logout()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(authSlice.actions.setIsLoggedInAC({isLoggedIn: false}))
                dispatch(appSlice.actions.setAppStatusAC({status: entityStatus.idle}))
            } else {
                dispatch(appSlice.actions.setAppStatusAC({status: entityStatus.failed}))
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((e) => {
            handleServerNetworkError(e, dispatch)
        })
        .finally(() => {
            dispatch(appSlice.actions.setAppStatusAC({status: entityStatus.idle}))
            dispatch(authSlice.actions.setAuthLoadingAC({isLoading: entityStatus.idle}))
        })
}

export const isAuthTC = () => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    if (getState().auth.loadingState !== entityStatus.loading) {
        dispatch(appSlice.actions.setAppStatusAC({status: entityStatus.loading}))
        dispatch(authSlice.actions.setAuthLoadingAC({isLoading: entityStatus.loading}))
        authAPI.isAuth()
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(authSlice.actions.setIsLoggedInAC({isLoggedIn: true}))
                }
            })
            .catch((e) => {
                handleServerNetworkError(e, dispatch)
            })
            .finally(() => {
                dispatch(appSlice.actions.setAppStatusAC({status: entityStatus.idle}))
                dispatch(authSlice.actions.setAuthLoadingAC({isLoading: entityStatus.idle}))
            })
    }
}

