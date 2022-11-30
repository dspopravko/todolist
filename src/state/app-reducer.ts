export enum entityStatus {
    loading,
    idle,
    succeeded,
    failed
}
export type errorType = string | null

const initialState = {
    status: entityStatus.loading as entityStatus,
    error: null as errorType
}

export type AppReducerStateType = typeof initialState

export const appReducer = (state: AppReducerStateType = initialState, action: AppReducerActionTypes): AppReducerStateType => {
    switch (action.type) {
        case 'SET-APP-STATUS':
            return {...state, status: action.status}
        case 'SET-APP-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppStatusAC = (status: entityStatus) => {
    return {
        type: 'SET-APP-STATUS',
        status
    } as const
}
export const setAppErrorAC = (error: errorType) => {
    return {
        type: 'SET-APP-ERROR',
        error
    } as const
}

export type AppReducerActionTypes = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setAppErrorAC>
