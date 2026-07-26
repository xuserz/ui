import type { Meta, StoryObj } from 'storybook-solidjs-vite'
import Switch from './Switch'
import { createSignal } from 'solid-js'

const meta = {
	title: 'Forms/Switch',
	component: Switch,
	render: props => {
		const [value, setValue] = createSignal(false)

		return <Switch value={value()} onValueChange={value => setValue(value)} />
	},
	tags: ['autodocs'],
	args: {},
	argTypes: {},
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Docs: Story = {}

// export const Url: Story = {
// 	args: {
// 		type: 'url',
// 	},
// }

// export const Telephone: Story = {
// 	args: {
// 		type: 'tel',
// 	},
// }

// export const Search: Story = {
// 	args: {
// 		type: 'search',
// 	},
// }

// export const Password: Story = {
// 	args: {
// 		type: 'password',
// 	},
// }

// export const Number: Story = {
// 	args: {
// 		type: 'number',
// 	},
// }

// export const Email: Story = {
// 	args: {
// 		type: 'email',
// 	},
// }
