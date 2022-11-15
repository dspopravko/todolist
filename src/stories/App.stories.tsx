import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import App from "../App";
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";

export default {
    title: 'Todolist/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>

const AppTemplate: ComponentStory<typeof App> = (args) => <App />

export const AppStory = AppTemplate.bind({})