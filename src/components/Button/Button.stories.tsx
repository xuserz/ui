import type { Meta, StoryObj } from 'storybook-solidjs-vite'
import { Button } from './Button'

const meta = {
	title: 'Actions/Button',
	component: Button,
	args: {
		children: 'Сохранить изменения',
		variant: 'primary',
		size: 'md',
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

/** Второстепенное действие рядом с primary. */
export const Secondary: Story = {
	args: { variant: 'secondary', children: 'Отмена' },
}

/** Действие без визуального контейнера — для тулбаров и карточек. */
export const Ghost: Story = {
	args: { variant: 'ghost', children: 'Подробнее' },
}

/** Use this state while a request is in progress. */
export const Loading: Story = { args: { loading: true, children: 'Сохраняем' } }

/** Проверяет короткие подписи и компактные интерфейсы. */
export const Small: Story = { args: { size: 'sm', children: 'Создать' } }

export const Disabled: Story = { args: { disabled: true } }
