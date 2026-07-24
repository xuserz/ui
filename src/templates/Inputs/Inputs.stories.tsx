import type { Meta, StoryObj } from 'storybook-solidjs-vite'
import { Inputs } from './Inputs'

const meta = {
	title: 'Templates/Inputs',
	component: Inputs,
	parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Inputs>

export default meta
type Story = StoryObj<typeof meta>

/** Полный пример композиции из Button, Card и Stack. */
export const Default: Story = {}
