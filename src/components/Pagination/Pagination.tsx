import {
	IconChevronLeft,
	IconChevronRight,
	IconNumber1,
	IconNumber10,
	IconNumber2,
} from '@tabler/icons-solidjs'
import {
	type Component,
	type JSX,
	For,
	Match,
	Show,
	Switch,
	createMemo,
	createSignal,
	mergeProps,
	splitProps,
} from 'solid-js'
import { Button } from '../Button'
import style from './Pagination.module.css'

export type PaginationProps = Omit<
	JSX.HTMLAttributes<HTMLDivElement>,
	'onChange'
> & {
	/** Общее количество страниц. */
	totalPages?: number
	/** Текущая страница для управляемого режима. */
	page: number
	/** Вызывается после выбора другой страницы. */
	onPageChange?: (page: number) => void
	/** Блокирует все кнопки пагинации. */
	disabled?: boolean

	onRender?: (page: number) => JSX.Element
}

type PaginationItem = number | 'ellipsis'

const clamp = (value: number, min: number, max: number) =>
	Math.min(Math.max(value, min), max)

const pagesBetween = (from: number, to: number) =>
	Array.from({ length: to - from + 1 }, (_, index) => from + index)

/**
 * До девяти страниц отображаем все номера без стрелок и многоточий.
 * От десяти страниц первый и последний номер остаются видимыми, а пропущенные
 * страницы заменяются многоточием.
 */
function getPaginationItems(
	totalPages: number,
	currentPage: number,
): PaginationItem[] {
	if (totalPages <= 9) return pagesBetween(1, totalPages)

	// В начале списка не нужна левая точка.
	if (currentPage <= 4) {
		return [1, 2, 3, 4, 5, 'ellipsis', totalPages]
	}

	// В конце списка не нужна правая точка.
	if (currentPage >= totalPages - 3) {
		return [1, 'ellipsis', ...pagesBetween(totalPages - 4, totalPages)]
	}

	// В середине показываем текущую страницу и двух соседей.
	return [
		1,
		'ellipsis',
		currentPage - 1,
		currentPage,
		currentPage + 1,
		'ellipsis',
		totalPages,
	]
}

const Pagination: Component<PaginationProps> = props => {
	const merged = mergeProps(
		{
			page: 1,
			totalPages: 10,
			disabled: false,
			onRender: (page: number) => page,
		},
		props,
	)
	const [local, others] = splitProps(merged, [
		'class',
		'classList',
		'children',
		'totalPages',
		'page',
		'onPageChange',
		'disabled',
		'onRender',
	])

	const items = createMemo(() =>
		getPaginationItems(local.totalPages, local.page),
	)

	function selectPage(nextPage: number) {
		if (local.disabled || local.totalPages === 0) return

		const page = clamp(nextPage, 1, local.totalPages)
		if (page === local.page) return
		local.onPageChange?.(page)
	}

	return (
		<div
			class={style.Pagination}
			classList={{
				[`${local.class}`]: !!local.class,
				...local.classList,
			}}
			role='navigation'
			aria-label='Pagination'
			{...others}
		>
			<Show when={local.totalPages > 9}>
				<Button
					form={'icon'}
					class={style.Pagination__button}
					mode={'secondary'}
					aria-label='Previous page'
					disabled={local.disabled || local.page <= 1}
					onClick={() => selectPage(local.page - 1)}
				>
					<IconChevronLeft size={`var(--ui-size-20px)`} />
				</Button>
			</Show>

			<div class={style.Pagination__in}>
				<For each={items()}>
					{item => (
						<Switch>
							<Match keyed when={typeof item === 'number' && item}>
								{item => (
									<Button
										form={'icon'}
										class={style.Pagination__button}
										mode={item === local.page ? 'primary' : 'tertiary'}
										aria-label={`Page ${item}`}
										aria-current={item === local.page ? 'page' : undefined}
										disabled={local.disabled}
										onClick={() => selectPage(item)}
									>
										{local.onRender(item)}
									</Button>
								)}
							</Match>

							<Match when={item === 'ellipsis'}>
								<span
									class={style.Pagination__button}
									classList={{
										[style[`Pagination__button--ellipsis`]]: true,
									}}
									aria-hidden='true'
								>
									…
								</span>
							</Match>
						</Switch>
					)}
				</For>
			</div>

			<Show when={local.totalPages > 9}>
				<Button
					form={'icon'}
					class={style.Pagination__button}
					mode={'secondary'}
					aria-label='Next page'
					disabled={local.disabled || local.page >= local.totalPages}
					onClick={() => selectPage(local.page + 1)}
				>
					<IconChevronRight size={`var(--ui-size-20px)`} />
				</Button>
			</Show>
		</div>
	)
}

export default Pagination
