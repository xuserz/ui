import {
	IconArrowDown,
	IconArrowUp,
	IconChevronDown,
	IconChevronUp,
	IconEye,
	IconLock,
	IconMinus,
	IconPlus,
	IconSearch,
	IconX,
} from '@tabler/icons-solidjs'
import style from './Input.module.css'
import {
	type JSX,
	type Component,
	mergeProps,
	splitProps,
	Show,
} from 'solid-js'
import Spinner from '../../Spinner/Spinner'

interface Input extends JSX.InputHTMLAttributes<HTMLInputElement> {
	status?: 'default' | 'auto' | 'valid' | 'invalid'

	type?: 'text' | 'password' | 'email' | 'tel' | 'url' | 'search' | 'number'

	cancelLabel?: string

	disabled?: boolean

	readonly?: boolean

	loading?: boolean
}

const Input: Component<Input> = props => {
	const merged = mergeProps(
		{
			status: 'default',
			disabled: false,
			type: 'text',
			loading: false,
			cancelLabel: 'Cancel',
		},
		props,
	)
	const [local, others] = splitProps(merged, [
		'class',
		'classList',
		'status',
		'type',
		'value',
		'cancelLabel',
		'loading',
	])

	let ref: HTMLInputElement | undefined
	let restoreFocusAfterClear = false

	function rememberClearFocus() {
		restoreFocusAfterClear = document.activeElement === ref
	}

	function onCancel() {
		if (!ref!) return

		ref.value = ''
		ref.dispatchEvent(new Event('input', { bubbles: true }))
	}

	function onClear() {
		if (!ref!) return

		ref.value = ''
		ref.dispatchEvent(new Event('input', { bubbles: true }))

		if (restoreFocusAfterClear && !ref.disabled) {
			queueMicrotask(() => {
				if (ref.isConnected) ref.focus()
			})
		}

		restoreFocusAfterClear = false
	}

	function stepUp() {
		if (!ref!) return

		ref.stepUp()
	}

	function stepDown() {
		if (!ref!) return

		ref.stepDown()
	}

	return (
		<div class={style.Input}>
			<div class={style.Input__in}>
				<Show when={local.type === 'search'}>
					<span class={style[`Input__group--search`]}>
						<span class={style[`Input__icon--search`]}>
							<IconSearch size={16} />
						</span>
						<span class={style[`Input__icon--loading`]}>
							<Spinner size={'x-small'} />
						</span>
					</span>
				</Show>
				<input
					ref={ref!}
					class={style.Input__element}
					classList={{
						[style[`Input__status--${local.status}`]]: !!local.status,

						[`${local.class}`]: !!local.class,
						...local.classList,
					}}
					type={local.type}
					value={local.value}
					data-loading={local.loading}
					{...others}
				/>
				<span aria-hidden={true} class={style[`Input__icon--readonly`]}>
					<IconEye size={16} />
				</span>
				<span aria-hidden={true} class={style[`Input__icon--disabled`]}>
					<IconLock size={16} />
				</span>
				<Show when={local.type === 'search'}>
					<span
						onPointerDown={rememberClearFocus}
						onClick={onClear}
						aria-hidden={true}
						class={style[`Input__icon--clear`]}
					>
						<IconX size={16} />
					</span>
				</Show>
				<Show when={local.type === 'number'}>
					<div class={style[`Input__number--buttons`]}>
						<button
							type={'button'}
							class={style[`Input__number--button`]}
							onClick={stepUp}
						>
							<IconPlus size={16} />
						</button>
						<button
							type={'button'}
							class={style[`Input__number--button`]}
							onClick={stepDown}
						>
							<IconMinus size={16} />
						</button>
					</div>
				</Show>
			</div>
			<Show when={local.type === 'search'}>
				<span class={style[`Input__button--close`]}>
					<button
						type='button'
						onClick={onCancel}
						class={style['Input__button--close_in']}
					>
						{local.cancelLabel}
					</button>
				</span>
			</Show>
		</div>
	)
}

export default Input
