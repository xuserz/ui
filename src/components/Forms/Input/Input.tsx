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

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
	/**
	 * Задаёт визуальное состояние валидации.
	 * В режиме `auto` оно определяется нативной HTML-валидацией, когда поле не в фокусе.
	 */
	status?: 'default' | 'auto' | 'valid' | 'invalid'

	/** Тип нативного `<input>`, определяющий доступные элементы управления. */
	type?: 'text' | 'password' | 'email' | 'tel' | 'url' | 'search' | 'number'

	/** Полностью отключает поле и его вспомогательные действия. */
	disabled?: boolean

	/**
	 * Алиас нативного `readOnly`.
	 * Оставляет значение доступным для выделения, но запрещает его изменение.
	 */
	readonly?: boolean

	/** Показывает индикатор обработки запроса в поле поиска. */
	loading?: boolean

	/** Контент перед полем: например, иконка, префикс или селектор страны. */
	before?: JSX.Element

	/** Контент после поля: например, иконка, суффикс или дополнительное действие. */
	after?: JSX.Element

	/** Вертикальный размер поля и его вспомогательных элементов. */
	size?: 'medium' | 'large'

	/** Видимая подпись кнопки отмены поиска. Используется только при `type="search"`. */
	cancelLabel?: string

	/** Доступное имя кнопки очистки поискового поля. */
	ariaLabelClear?: string

	/** Доступное имя кнопки отмены поиска. */
	ariaLabelCancel?: string

	/** Доступное имя кнопки увеличения значения числового поля. */
	ariaLabelNumberUp?: string

	/** Доступное имя кнопки уменьшения значения числового поля. */
	ariaLabelNumberDown?: string

	/** Текстовое описание иконки отключённого поля. */
	ariaLabelDisabled?: string

	/** Текстовое описание иконки поля, доступного только для чтения. */
	ariaLabelReadonly?: string
}

const Input: Component<InputProps> = props => {
	const merged = mergeProps(
		{
			status: 'default',
			disabled: false,
			type: 'text',
			loading: false,
			size: 'medium',

			cancelLabel: 'Отмена',
			ariaLabelClear: 'Очистить поле',
			ariaLabelCancel: 'Отменить поиск',
			ariaLabelNumberUp: 'Увеличить значение',
			ariaLabelNumberDown: 'Уменьшить значение',
			ariaLabelDisabled: 'Поле недоступно',
			ariaLabelReadonly: 'Поле только для чтения',
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

		'ariaLabelClear',
		'ariaLabelCancel',
		'ariaLabelNumberUp',
		'ariaLabelNumberDown',
		'ariaLabelDisabled',
		'ariaLabelReadonly',
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

	function dispatchInputEvent(input: HTMLInputElement) {
		input.dispatchEvent(new Event('input', { bubbles: true }))
	}

	function onCancel() {
		const input = ref
		if (!input) return

		input.value = ''
		dispatchInputEvent(input)
		queueMicrotask(() => {
			if (input.isConnected) input.blur()
		})
	}

	function onClear() {
		const input = ref
		if (!input) return

		input.value = ''
		dispatchInputEvent(input)

		if (restoreFocusAfterClear && !input.disabled) {
			// Даём controlled-компоненту обработать `input` перед возвратом фокуса.
			queueMicrotask(() => {
				if (input.isConnected) input.focus()
			})
		}

		restoreFocusAfterClear = false
	}

	function stepUp() {
		const input = ref
		if (!input || input.disabled || input.readOnly) return

		input.stepUp()
		dispatchInputEvent(input)
	}

	function stepDown() {
		const input = ref
		if (!input || input.disabled || input.readOnly) return

		input.stepDown()
		dispatchInputEvent(input)
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
							<span
								role='img'
								aria-label={local.ariaLabelDisabled}
								class={style[`Input__icon--disabled`]}
							>
								<IconLock size={`var(--ui-size-20px)`} />
							</span>
						</Match>
						<Match when={local.readonly || local.readOnly}>
							<span
								role='img'
								aria-label={local.ariaLabelReadonly}
								class={style[`Input__icon--readonly`]}
							>
								<IconEye size={`var(--ui-size-20px)`} />
							</span>
						</Match>

						<Match when={local.type === 'search'}>
							<Button
								type={'button'}
								mode={'secondary'}
								onPointerDown={rememberClearFocus}
								onClick={onClear}
								aria-label={local.ariaLabelClear}
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
							onClick={stepUp}
							disabled={local.disabled || local.readonly || local.readOnly}
							aria-label={local.ariaLabelNumberUp}
							class={style[`Input__number--button`]}
						>
							<IconPlus size={`var(--ui-size-20px)`} />
						</Button>
						<Button
							mode={'secondary'}
							type={'button'}
							class={style[`Input__number--button`]}
							aria-label={local.ariaLabelNumberDown}
							onClick={stepDown}
							disabled={local.disabled || local.readonly || local.readOnly}
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
						aria-label={local.ariaLabelCancel}
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
