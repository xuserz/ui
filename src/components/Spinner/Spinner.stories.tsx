import type { Meta, StoryObj } from 'storybook-solidjs-vite'
import Spinner from './Spinner'

const meta = {
	title: 'Actions/Spinner',
	component: Spinner,
	args: {
		size: 'inherit',
		progress: undefined,
		visible: true,
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['inherit', 'small', 'medium', 'large'],
		},
		progress: {
			control: 'range',
			options: [0, 100],
		},
		visible: {
			control: 'boolean',
		},
	},
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

/** Базовое действие для главной кнопки на экране. */
export const Primary: Story = {}
