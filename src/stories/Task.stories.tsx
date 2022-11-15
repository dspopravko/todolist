import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {Task} from "../Task";
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {TaskType} from "../Todolist";


export default {
    title: 'Todolist/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof Task>

const TaskWithRedux = () => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])
    return <Task tdId='todolistId1'
                 id={task.id}
                 title={task.title}
                 isDone={task.isDone}
    />
}

const TaskTemplate: ComponentStory<typeof TaskWithRedux> = (args) => <TaskWithRedux />

export const ActiveTask = TaskTemplate



