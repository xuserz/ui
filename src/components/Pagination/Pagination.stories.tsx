import type { Meta, StoryObj } from 'storybook-solidjs-vite'
import Pagination from './Pagination'
import { createEffect, createSignal } from 'solid-js'

const meta = {
	title: 'Blocks/Pagination',
	component: Pagination,
	render: props => {
		const [page, setPage] = createSignal(props.page)

		createEffect(() => {
			setPage(props.page)
		})

		return <Pagination page={page()} onPageChange={setPage} />
	},
	args: {
		page: 1,
	},
	argTypes: {},
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

/** Базовое действие для главной кнопки на экране. */
export const Docs: Story = {}
