import { authActions as authSyncActions, authReducer } from "./BLL/authSlice";
import { authAsyncActions } from "./BLL/authAsyncActions";

export { Login } from './UI/Login'
export * from './BLL/authSelectors'

const authActions = {
  ...authSyncActions,
  ...authAsyncActions
}

export {
  authActions, authReducer
}