import {appReducer, AppReducerStateType, appSlice, entityStatus, errorType} from "./app-reducer"

let startState: AppReducerStateType

beforeEach(() => {
    startState = {
        status: entityStatus.loading as entityStatus,
        error: null as errorType
    }
})

test('correct error message should be added', () => {
    const action = appSlice.actions.setAppErrorAC({error: 'some unique error message'})
    const endState = appReducer(startState, action)
    expect(endState.error).toBe('some unique error message')
})