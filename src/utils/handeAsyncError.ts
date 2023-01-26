import { AxiosError } from 'axios'
import { ResponseType } from '../api'
import { appActions } from '../features/Application'

// original type:
// BaseThunkAPI<S, E, D extends Dispatch = Dispatch, RejectedValue = undefined>
type ThunkAPIType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: (action: any) => any
  // eslint-disable-next-line @typescript-eslint/ban-types
  rejectWithValue: Function
}

export const handleServerAppError = <D>(
  data: ResponseType<D>,
  thunkAPI: ThunkAPIType,
  showError = true
) => {
  if (!showError) {
    thunkAPI.dispatch(appActions.setAppStatus({ status: 'idle' }))
  }
  thunkAPI.dispatch(
    appActions.setAppError({
      error: data.messages.length ? data.messages[0] : 'Some error occurred',
    })
  )
  return thunkAPI.rejectWithValue({
    errors: data.messages,
    fieldsErrors: data.fieldsErrors,
  })
}

export const handleServerNetworkError = (
  error: AxiosError,
  thunkAPI: ThunkAPIType,
  showError = true
) => {
  if (!showError) {
    thunkAPI.dispatch(appActions.setAppStatus({ status: 'idle' }))
  }
  thunkAPI.dispatch(
    appActions.setAppError({
      error: error.message ? error.message : 'Some error occurred',
    })
  )

  return thunkAPI.rejectWithValue({
    errors: [error.message],
    fieldsErrors: undefined,
  })
}
