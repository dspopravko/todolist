import { TaskStatus } from "../../../../models/MTaskStatus";
import { Priority } from "../../../../models/MPriority";
import { TasksStateType } from "../slices/tasksSlice";

export const mockTasksState = (todolistId1: string, todolistId2: string, todolistId3: string): TasksStateType => {
  return {
    [todolistId1]: [
      {
        id: "1",
        title: "HTML&CSS",
        status: TaskStatus.Completed,
        todoListId: todolistId1,
        addedDate: '',
        startDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: Priority.Hi
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatus.Completed,
        todoListId: todolistId1,
        addedDate: '',
        startDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: Priority.Hi
      },
      {
        id: "3",
        title: "ReactJS",
        status: TaskStatus.New,
        todoListId: todolistId1,
        addedDate: '',
        startDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: Priority.Hi
      },
      {
        id: "4",
        title: "ReactNative",
        status: TaskStatus.Completed,
        todoListId: todolistId1,
        addedDate: '',
        startDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: Priority.Hi
      },
    ],
    [todolistId2]: [
      {
        id: "1",
        title: "Soup",
        status: TaskStatus.New,
        todoListId: todolistId2,
        addedDate: '',
        startDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: Priority.Hi
      },
      {
        id: "2",
        title: "Chicken Salad",
        status: TaskStatus.Completed,
        todoListId: todolistId2,
        addedDate: '',
        startDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: Priority.Hi
      },
      {
        id: "3",
        title: "Tosts",
        status: TaskStatus.New,
        todoListId: todolistId2,
        addedDate: '',
        startDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: Priority.Hi
      },
      {
        id: "4",
        title: "Beans",
        status: TaskStatus.Completed,
        todoListId: todolistId2,
        addedDate: '',
        startDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: Priority.Hi
      },
    ],
    [todolistId3]: [
      {
        id: "1",
        title: "Camera",
        status: TaskStatus.New,
        todoListId: todolistId3,
        addedDate: '',
        startDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: Priority.Hi
      },
      {
        id: "2",
        title: "Phone",
        status: TaskStatus.Completed,
        todoListId: todolistId3,
        addedDate: '',
        startDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: Priority.Hi
      },
      {
        id: "3",
        title: "Microphone",
        status: TaskStatus.New,
        todoListId: todolistId3,
        addedDate: '',
        startDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: Priority.Hi
      },
      {
        id: "4",
        title: "Laptop",
        status: TaskStatus.Completed,
        todoListId: todolistId3,
        addedDate: '',
        startDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: Priority.Hi
      },
    ]
  }
}


