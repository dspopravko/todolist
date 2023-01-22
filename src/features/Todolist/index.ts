import { tasksActions as TA1, tasksReducer } from "./BLL/slices/tasksSlice";
import { todolistActions as TO1, todolistReducer } from './BLL/slices/todolistSlice'
import { asyncActions as TA2 } from "./BLL/actions/taskAsyncActions";
import { asyncActions as TO2 } from "./BLL/actions/todolistAsyncActions";

export * from './UI/Todolist/Todolist'
export * from './UI/Task/Task'
export * from './BLL/selectors/todolistSelectors'

const tasksActions = {
  ...TA1,
  ...TA2
}
const todolistsActions = {
  ...TO1,
  ...TO2
}

export {
  tasksActions,
  todolistsActions,
  todolistReducer,
  tasksReducer
}