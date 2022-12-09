import React, {useEffect, useState} from 'react'
import {todolist} from "../api/todolist";
import {Priority} from "../models/MPriority";
import {TaskStatus} from "../models/MTaskStatus";
import {taskAPI} from "../api/tasks";

export default {
    title: 'API'
}

const config = {
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolist.getTodolists().then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolist.createTodolist('new title2').then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolist.deleteTodolist("072b221d-80b4-4721-afca-36923c057200").then(res => setState(res))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolist.updateTodolistTitle('558a9d95-701f-4319-b3a7-1e9032aea879', 'updated title').then(res => setState(res))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const ReorderTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolist.reorderTodolists('685e5d49-2fb3-4d78-8cf7-a1384786ceed', '0ae2f75b-712b-4721-b2dd-036adf3687c0').then(res => setState(res))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        taskAPI.getTasks('0ae2f75b-712b-4721-b2dd-036adf3687c0').then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const AddTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        taskAPI.addTask('0ae2f75b-712b-4721-b2dd-036adf3687c0', 'task title').then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        taskAPI.updateTask('0ae2f75b-712b-4721-b2dd-036adf3687c0', '62a8db4e-53ed-40ab-a349-95bf3a23c5a9', { title: 'title', description: 'descr', priority: Priority.Middle, status: TaskStatus.New, deadline: '', startDate: ''}).then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
