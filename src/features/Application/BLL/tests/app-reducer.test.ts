import {appReducer, AppReducerStateType, appActions} from "../appSlice"

const {setAppError, setAppStatus} = appActions
let startState: AppReducerStateType
beforeEach(() => {
    startState = {
        status: 'loading',
        error: null
    }
})

test('correct error message should be added', () => {
    const endState = appReducer(startState, setAppError({error: 'some error'}))
    expect(endState.error).toBe('some error');
})
test('correct status should be set', () => {
    const endState = appReducer(startState, setAppStatus({status: 'loading'}))
    expect(endState.status).toBe('loading');
})