import {appSlice, entityStatus} from "./app-reducer";
import {auth, LoginType} from "../api/auth";
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
        setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn
        },
        setUserLoggedIn(state, action: PayloadAction<{ username: string }>) {
            state.user = action.payload.username
        },
        setAuthLoading(state, action: PayloadAction<{ isLoading: entityStatus }>) {
            state.loadingState = action.payload.isLoading
        }
    }
})

export const authReducer = authSlice.reducer

// thunks
export const loginTC = (data: LoginType) => async (dispatch: Dispatch) => {
    dispatch(appSlice.actions.setAppStatus({status: entityStatus.loading}))
    dispatch(authSlice.actions.setAuthLoading({isLoading: entityStatus.loading}))
    auth.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(appSlice.actions.setAppStatus({status: entityStatus.idle}))
                dispatch(authSlice.actions.setIsLoggedIn({isLoggedIn: true}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((e) => {
            handleServerNetworkError(e, dispatch)
        })
        .finally(() => {
            dispatch(appSlice.actions.setAppStatus({status: entityStatus.idle}))
            dispatch(authSlice.actions.setAuthLoading({isLoading: entityStatus.idle}))
        })
}

export const logoutTC = () => async (dispatch: Dispatch) => {
    dispatch(appSlice.actions.setAppStatus({status: entityStatus.loading}))
    dispatch(authSlice.actions.setAuthLoading({isLoading: entityStatus.loading}))
    auth.logout()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(authSlice.actions.setIsLoggedIn({isLoggedIn: false}))
                dispatch(appSlice.actions.setAppStatus({status: entityStatus.idle}))
            } else {
                dispatch(appSlice.actions.setAppStatus({status: entityStatus.failed}))
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((e) => {
            handleServerNetworkError(e, dispatch)
        })
        .finally(() => {
            dispatch(appSlice.actions.setAppStatus({status: entityStatus.idle}))
            dispatch(authSlice.actions.setAuthLoading({isLoading: entityStatus.idle}))
        })
}

export const isAuthTC = () => async (dispatch: Dispatch, getState: () => AppRootStateType) => {
    if (getState().auth.loadingState === entityStatus.loading) return
    dispatch(appSlice.actions.setAppStatus({status: entityStatus.loading}))
    dispatch(authSlice.actions.setAuthLoading({isLoading: entityStatus.loading}))
    try {
        const res = await auth.isAuth()
        if (res.data.resultCode !== 0) return
        dispatch(authSlice.actions.setIsLoggedIn({isLoggedIn: true}))
        dispatch(authSlice.actions.setUserLoggedIn({username: res.data.data.login}))
    } catch (e) {
        if (e instanceof Error) handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(appSlice.actions.setAppStatus({status: entityStatus.idle}))
        dispatch(authSlice.actions.setAuthLoading({isLoading: entityStatus.idle}))
    }
}

