import { AppRootStateType } from '../../../state/store'

export const selectStatus = (state: AppRootStateType) => state.app.status
export const selectError = (state: AppRootStateType) => state.app.error
