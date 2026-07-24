import type { Meta, StoryObj } from 'storybook-solidjs-vite'
import { Button } from './Button'

const meta = {
	title: 'Actions/Button',
	component: Button,
	args: {
		children: 'Сохранить изменения',
		appearance: 'tertiary',
		size: 'medium',
	},
	argTypes: {
		variant: {
			control: 'inline-radio',
			options: ['primary', 'secondary', 'ghost'],
		},
		size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
	},
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

/** Базовое действие для главной кнопки на экране. */
export const Primary: Story = {}
