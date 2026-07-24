import type { Meta, StoryObj } from 'storybook-solidjs-vite'
import Input from './Input'
import { createSignal } from 'solid-js'

const meta = {
	title: 'Forms/Input',
	component: Input,
	render: props => {
		const [value, setValue] = createSignal('')
		const [loading, setLoading] = createSignal(false)
		let timer: NodeJS.Timeout

		return (
			<Input
				{...props}
				value={value()}
				loading={loading()}
				onInput={event => {
					clearTimeout(timer)
					setLoading(true)
					setValue(event.target.value)

					timer = setTimeout(() => {
						setLoading(false)
					}, 800)
				}}
			/>
		)
	},
	tags: ['autodocs'],
	args: {
		placeholder: 'Placeholder',
		status: 'default',
		disabled: false,
		type: 'text',
		readOnly: false,
		// before: <IconTest />,
		// after: <IconTest />,
	},
	argTypes: {
		placeholder: {
			control: 'text',
			description: 'Текст-подсказка, отображаемый в пустом поле.',
		},
		status: {
			control: 'select',
			options: ['default', 'auto', 'valid', 'invalid'],
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
		readOnly: {
			control: 'boolean',
		},
		loading: {
			control: 'boolean',
			description: 'Загрузка',
		},
	},
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {
	args: {
		type: 'text',
	},
}

export const Url: Story = {
	args: {
		type: 'url',
	},
}

export const Telephone: Story = {
	args: {
		type: 'tel',
	},
}

export const Search: Story = {
	args: {
		type: 'search',
	},
}

export const Password: Story = {
	args: {
		type: 'password',
	},
}

export const Number: Story = {
	args: {
		type: 'number',
	},
}

export const Email: Story = {
	args: {
		type: 'email',
	},
}
