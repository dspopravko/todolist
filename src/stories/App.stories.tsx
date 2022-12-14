import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import App from "../app/App";
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
    title: 'TodolistPage/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator, withRouter]
} as ComponentMeta<typeof App>

const AppTemplate: ComponentStory<typeof App> = () => <App />

export const AppStory = AppTemplate.bind({}).story = {
    parameters: {
        reactRouter: {
            routePath: '/',
        }
    }
};