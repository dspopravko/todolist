import {
  tasksActions as tasksSyncActions,
  tasksReducer,
} from './BLL/slices/tasksSlice'
import {
  todolistActions as todolistSyncActions,
  todolistReducer,
} from './BLL/slices/todolistSlice'
import { tasksAsyncActions } from './BLL/actions/taskAsyncActions'
import { todolistAsyncActions } from './BLL/actions/todolistAsyncActions'

export * from './UI/Todolist/Todolist'
export * from './UI/Task/Task'
export * from './BLL/selectors/todolistSelectors'

const tasksActions = {
  ...tasksSyncActions,
  ...tasksAsyncActions,
}
const todolistsActions = {
  ...todolistSyncActions,
  ...todolistAsyncActions,
}

export { tasksActions, todolistsActions, todolistReducer, tasksReducer }
