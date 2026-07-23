import { IconSearch } from '@tabler/icons-solidjs'
import style from './Input.module.css'
import {
	type JSX,
	type Component,
	mergeProps,
	splitProps,
	Show,
} from 'solid-js'

interface Input extends JSX.InputHTMLAttributes<HTMLInputElement> {
	status?: 'default' | 'valid' | 'invalid'

	type?: 'text' | 'password' | 'email' | 'tel' | 'url' | 'search' | 'number'

	cancelLabel?: string
}

const Input: Component<Input> = props => {
	const merged = mergeProps(
		{
			status: 'default',
			disabled: false,
			type: 'text',

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
	])

	let ref: HTMLInputElement

	function onCancel() {
		if (!ref!) return

		ref.value = ''
		ref.dispatchEvent(new Event('input', { bubbles: true }))
		ref.focus()
	}

	return (
		<div class={style.Input}>
			<div class={style.Input__in}>
				<Show when={local.type === 'search'}>
					<span class={style[`Input__icon--search`]}>
						<IconSearch size={16} />
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
					{...others}
				/>
			</div>
			<Show when={local.type === 'search'}>
				<span
					class={style[`Input__button--close`]}
					classList={{
						[style[`Input__button--close-visible`]]: !!local.value,
					}}
				>
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
