import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {action} from "@storybook/addon-actions"
import {EditableSpan} from "../components/EditableSpan/EditableSpan";

export default {
    title: 'TodolistPage/EditableSpan',
    component: EditableSpan,
    argTypes: {
        onChange: {
            description: 'Value EditableSpan changed'
        },
        title: {
            defaultValue: 'Default value',
            description: 'Initial value in EditableSpan'
        }
    }
} as ComponentMeta<typeof EditableSpan>

const EditableSpanTemplate: ComponentStory<typeof EditableSpan> = (args) =>
    <EditableSpan {...args}/>

export const EditableSpanWithValue = EditableSpanTemplate.bind({})
EditableSpanWithValue.args = {
    title: 'Editable Span with value',
    onChange: action('New value send in callback')
}