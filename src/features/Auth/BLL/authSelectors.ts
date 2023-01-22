import { AppRootStateType } from "../../../state/store";

export const selectUserName = (state: AppRootStateType) => state.auth.user
export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isAuth
export const selectIsAuthPending = (state: AppRootStateType) => state.auth.state