import type { Meta, StoryObj } from 'storybook-solidjs-vite'
import Input from './Input'
import { createSignal } from 'solid-js'

const meta = {
	title: 'Forms/Input',
	component: Input,
	render: props => {
		const [value, setValue] = createSignal('jj')

		return (
			<Input
				{...props}
				value={value()}
				onInput={event => setValue(event.target.value)}
			/>
		)
	},
	tags: ['autodocs'],
	args: {
		placeholder: 'Placeholder',
		status: 'default',
		disabled: false,
		type: 'text',
	},
	argTypes: {
		placeholder: {
			control: 'text',
			description: 'Текст-подсказка, отображаемый в пустом поле.',
		},
		status: {
			control: 'select',
			options: ['default', 'valid', 'invalid'],
			table: {
				defaultValue: {
					summary: 'default',
				},
			},
		},
		disabled: {
			control: 'boolean',
			table: {
				defaultValue: {
					summary: 'false',
				},
			},
		},
		type: {
			control: 'select',
			options: ['text', 'password', 'email', 'tel', 'url', 'search', 'number'],
			table: {
				defaultValue: {
					summary: 'text',
				},
			},
		},
	},
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

/** Базовое действие для главной кнопки на экране. */
export const Docs: Story = {}
