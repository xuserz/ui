import type { Meta, StoryObj } from 'storybook-solidjs-vite'
import Button from './Button'

const meta = {
	title: 'Actions/Button',
	component: Button,
	args: {
		children: 'Сохранить изменения',
		appearance: 'accent',
		mode: 'tertiary',
		size: 'medium',
	},
	argTypes: {
		mode: {
			control: 'inline-radio',
			options: ['primary', 'secondary', 'tertiary'],
		},
		size: { control: 'inline-radio', options: ['small', 'medium', 'large'] },
	},
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

/** Базовое действие для главной кнопки на экране. */
export const Primary: Story = {}
