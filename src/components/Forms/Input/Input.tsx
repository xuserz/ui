import {
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
	Switch,
	Match,
} from 'solid-js'
import Spinner from '../../Spinner/Spinner'
import Button from '../../Button/Button'

interface Input extends JSX.InputHTMLAttributes<HTMLInputElement> {
	/**
	 * Управляет визуальным состоянием поля.
	 * `auto` определяет valid/invalid по нативной HTML-валидации после потери фокуса.
	 */
	status?: 'default' | 'auto' | 'valid' | 'invalid'

	/** Тип нативного `<input>` и связанные с ним элементы интерфейса. */
	type?: 'text' | 'password' | 'email' | 'tel' | 'url' | 'search' | 'number'

	/** Подпись кнопки, которая очищает и завершает поиск. Используется только при `type="search"`. */
	cancelLabel?: string

	/** Блокирует ввод и взаимодействие с полем. */
	disabled?: boolean

	/** Оставляет значение доступным для выделения, но запрещает его изменение. */
	readonly?: boolean

	/** Показывает индикатор обработки запроса. Используется только при `type="search"`. */
	loading?: boolean

	before?: JSX.Element
	after?: JSX.Element

	size?: 'medium' | 'large'
}

const Input: Component<Input> = props => {
	const merged = mergeProps(
		{
			status: 'default',
			disabled: false,
			type: 'text',
			loading: false,
			cancelLabel: 'Cancel',
			size: 'medium',
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
		'size',
		'readonly',
		'readOnly',
		'disabled',

		'before',
		'after',
	])

	let ref: HTMLInputElement | undefined
	// К моменту `click` фокус может перейти с input на контрол очистки.
	// Поэтому проверяем его на `pointerdown`, до выполнения браузерного действия.
	let restoreFocusAfterClear = false

	function rememberClearFocus(event: PointerEvent) {
		restoreFocusAfterClear = document.activeElement === ref

		// Не даём кнопке забрать фокус у активного input во время нажатия.
		if (restoreFocusAfterClear) event.preventDefault()
	}

	function onCancel(event: MouseEvent) {
		if (!ref!) return

		ref.value = ''
		ref.dispatchEvent(new Event('input', { bubbles: true }))
		queueMicrotask(() => {
			if (ref.isConnected) ref.blur()
		})
	}

	function onClear() {
		if (!ref!) return

		ref.value = ''
		ref.dispatchEvent(new Event('input', { bubbles: true }))

		if (restoreFocusAfterClear && !ref.disabled) {
			// Даём controlled-компоненту обработать `input` перед возвратом фокуса.
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
		<div
			class={style.Input}
			classList={{
				[style[`Input__size--${local.size}`]]: !!local.size,
			}}
		>
			<div class={style.Input__in}>
				<Show when={local.before || local.type === 'search'}>
					<div class={style.Input__before}>
						<Show keyed when={local.before}>
							{before => (
								<span class={style[`Input__icon--before`]}>{before}</span>
							)}
						</Show>
						<Show when={local.type === 'search'}>
							<span class={style[`Input__group--search`]}>
								<span class={style[`Input__icon--search`]}>
									<IconSearch size={`var(--ui-size-20px)`} />
								</span>
								<span class={style[`Input__icon--loading`]}>
									<Spinner size={'small'} />
								</span>
							</span>
						</Show>
					</div>
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
					disabled={local.disabled}
					readOnly={local.readonly || local.readOnly}
					{...others}
				/>
				<div class={style.Input__after}>
					<Show keyed when={local.after}>
						{after => <span class={style[`Input__icon--after`]}>{after}</span>}
					</Show>

					<Switch>
						<Match when={local.disabled}>
							<span aria-hidden={true} class={style[`Input__icon--disabled`]}>
								<IconLock size={`var(--ui-size-20px)`} />
							</span>
						</Match>
						<Match when={local.readonly || local.readOnly}>
							<span aria-hidden={true} class={style[`Input__icon--readonly`]}>
								<IconEye size={`var(--ui-size-20px)`} />
							</span>
						</Match>

						<Match when={local.type === 'search'}>
							<Button
								type={'button'}
								mode={'secondary'}
								onPointerDown={rememberClearFocus}
								onClick={onClear}
								aria-hidden={true}
								class={style[`Input__icon--clear`]}
							>
								<IconX size={`var(--ui-size-20px)`} />
							</Button>
						</Match>
					</Switch>
				</div>
				<Show when={local.type === 'number'}>
					<div class={style[`Input__number--buttons`]}>
						<Button
							mode={'secondary'}
							type={'button'}
							class={style[`Input__number--button`]}
							onClick={stepUp}
						>
							<IconPlus size={`var(--ui-size-20px)`} />
						</Button>
						<Button
							mode={'secondary'}
							type={'button'}
							class={style[`Input__number--button`]}
							onClick={stepDown}
						>
							<IconMinus size={`var(--ui-size-20px)`} />
						</Button>
					</div>
				</Show>
			</div>
			<Show when={local.type === 'search'}>
				<span class={style[`Input__button--close`]}>
					<Button
						type={'button'}
						mode={'tertiary'}
						onPointerDown={event => event.preventDefault()}
						onClick={onCancel}
						class={style['Input__button--close_in']}
					>
						{local.cancelLabel}
					</Button>
				</span>
			</Show>
		</div>
	)
}

export default Input
