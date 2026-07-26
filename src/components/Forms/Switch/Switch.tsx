import style from './Switch.module.css'
import {
	type JSX,
	For,
	createMemo,
	createSignal,
	mergeProps,
	splitProps,
} from 'solid-js'

type SwitchValue = string | number | boolean

export type SwitchOption<T extends SwitchValue> = {
	color?: 'default' | 'positive' | 'danger' | 'warning'
	/** Значение, которое вернёт `onValueChange` при выборе элемента. */
	value: T
	/** Иконка элемента. */
	children?: JSX.Element
	/** Доступное имя, если у элемента нет текстовой подписи. */
	ariaLabel?: string
	/** Запрещает выбор конкретного элемента. */
	disabled?: boolean
}

export type SwitchProps<T extends SwitchValue = boolean> = Omit<
	JSX.HTMLAttributes<HTMLDivElement>,
	'value' | 'onChange'
> & {
	/**
	 * `switch` предназначен для boolean-значений.
	 * `segmented` — для выбора одного значения из списка.
	 */
	mode?: 'switch' | 'segmented'
	/** Выбранное значение. Если не задано, Switch хранит его внутри себя. */
	value?: T
	/** Вызывается при выборе нового значения в controlled и uncontrolled режимах. */
	onValueChange?: (value: T) => void
	/** Отключает выбор и клавиатурное управление. */
	disabled?: boolean
	/** Список вариантов для segmented-режима. */
	options?: readonly SwitchOption<T>[]
}

const booleanOptions: readonly SwitchOption<boolean>[] = [
	{ value: false, ariaLabel: 'Выключено', color: 'default' },
	{ value: true, ariaLabel: 'Включено', color: 'positive' },
]

const Switch = <T extends SwitchValue = boolean>(props: SwitchProps<T>) => {
	const merged = mergeProps(
		{
			mode: undefined,
			disabled: false,
		},
		props,
	)
	const [local, others] = splitProps(merged, [
		'class',
		'classList',
		'mode',
		'value',
		'onValueChange',
		'disabled',
		'options',
	])

	const options = createMemo(
		() =>
			(local.options ?? booleanOptions) as readonly SwitchOption<SwitchValue>[],
	)
	const [uncontrolledValue, setUncontrolledValue] = createSignal<SwitchValue>()

	const value = createMemo(
		() => local.value ?? uncontrolledValue() ?? options()[0]?.value,
	)

	const isBooleanSwitch = createMemo(() => {
		if (local.mode) return local.mode === 'switch'

		const values = options().map(option => option.value)
		return (
			values.length === 2 && values.includes(false) && values.includes(true)
		)
	})

	const selectedIndex = createMemo(() => {
		const index = options().findIndex(option => option.value === value())
		return index === -1 ? 0 : index
	})

	function select(value: SwitchValue, disabled = false) {
		if (local.disabled || disabled || value === local.value) return

		if (local.value === undefined) setUncontrolledValue(value)
		local.onValueChange?.(value as T)
	}

	function selectNext(direction: 1 | -1) {
		const items = options()
		let index = selectedIndex()

		for (let step = 0; step < items.length; step += 1) {
			index = (index + direction + items.length) % items.length
			const option = items[index]

			if (!option.disabled) {
				select(option.value, option.disabled)
				return
			}
		}
	}

	function onSwitchKeyDown(event: KeyboardEvent) {
		if (!isBooleanSwitch() || local.disabled) return

		if (event.key === ' ' || event.key === 'Enter') {
			event.preventDefault()
			select(value() === true ? false : true)
		}
	}

	function onOptionKeyDown(event: KeyboardEvent, index: number) {
		if (isBooleanSwitch() || local.disabled) return

		if (event.key === ' ' || event.key === 'Enter') {
			event.preventDefault()
			const option = options()[index]
			select(option.value, option.disabled)
		}

		if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
			event.preventDefault()
			selectNext(1)
		}

		if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
			event.preventDefault()
			selectNext(-1)
		}
	}

	return (
		<div
			{...others}
			class={style.Switch}
			classList={{
				[style[`Switch__color--${options()[selectedIndex()].color}`]]: true,
				[`${local.class}`]: !!local.class,
				...local.classList,
			}}
			role={isBooleanSwitch() ? 'switch' : 'radiogroup'}
			aria-checked={isBooleanSwitch() ? value() === true : undefined}
			aria-disabled={local.disabled || undefined}
			tabIndex={isBooleanSwitch() && !local.disabled ? 0 : undefined}
			onKeyDown={onSwitchKeyDown}
		>
			<div class={style.Switch__in}>
				<For each={options()}>
					{(item, index) => {
						const selected = () => item.value === value()
						const itemDisabled = () => local.disabled || item.disabled

						return (
							<span
								class={style.Switch__item}
								role={isBooleanSwitch() ? undefined : 'radio'}
								aria-checked={isBooleanSwitch() ? undefined : selected()}
								aria-label={item.ariaLabel}
								aria-disabled={itemDisabled() || undefined}
								tabIndex={
									!isBooleanSwitch() && !itemDisabled()
										? selected()
											? 0
											: -1
										: undefined
								}
								onClick={() => select(item.value, itemDisabled())}
								onKeyDown={event => onOptionKeyDown(event, index())}
							>
								{item.children}
							</span>
						)
					}}
				</For>
			</div>

			<span
				style={{
					left: `calc(var(--ui-size-28px) * ${selectedIndex()})`,
				}}
				class={style.Switch__background}
				aria-hidden='true'
			/>
		</div>
	)
}

export default Switch
