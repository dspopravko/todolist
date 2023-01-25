import { entityStatus } from "../../../../models/MEntityStatus";
import { TodolistType } from "../slices/todolistSlice";

export const mockTodolistState = (todolistId1: string, todolistId2: string, todolistId3: string): TodolistType[] => {
  return [
    { id: todolistId1, title: "What to build", filter: "all", order: 0, addedDate: "", tdStatus: entityStatus.idle },
    { id: todolistId2, title: "What to cook", filter: "active", order: 0, addedDate: "", tdStatus: entityStatus.idle },
    { id: todolistId3, title: "What to read", filter: "completed", order: 0, addedDate: "", tdStatus: entityStatus.idle }
  ]
}