import { authActions as A1, authReducer } from "./BLL/authSlice";
import { asyncActions } from "./BLL/authAsyncActions";

export { Login } from './UI/Login'
export * from './BLL/authSelectors'

const authActions = {
  ...A1,
  ...asyncActions
}

export {
  authActions, authReducer
}