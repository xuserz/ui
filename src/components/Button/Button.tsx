import style from './Button.module.css'

import { type Component, type JSX, mergeProps, splitProps } from 'solid-js'

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
	/** Visual emphasis of the action. */
	appearance?: 'accent'

	mode?: 'primary' | 'tertiary' | 'secondary'
	/** Vertical rhythm and font size. */
	size?: 'small' | 'medium' | 'large' | 'none'
	/** Blocks interaction and shows a progress indicator. */
	loading?: boolean

	form?: 'default' | 'icon'
}

const Button: Component<ButtonProps> = props => {
	const merged = mergeProps(
		{
			appearance: 'accent',
			mode: 'primary',
			size: 'medium',
			form: 'default',
		},
		props,
	)

	const [local, others] = splitProps(merged, [
		'class',
		'classList',
		'children',
		'mode',
		'appearance',
		'size',
		'loading',
		'form',
	])

	return (
		<button
			type={others.type ?? 'button'}
			class={style.Button}
			classList={{
				[style[`Button__size--${local.size}`]]: !!local.size,
				[style[`Button__appearance--${local.appearance}`]]: !!local.appearance,
				[style[`Button__mode--${local.mode}`]]: !!local.mode,
				[style[`Button__form--${local.form}`]]: !!local.form,

				[`${local.class}`]: !!local.class,
				...local.classList,
			}}
			aria-busy={local.loading || undefined}
			{...others}
		>
			{local.children}
		</button>
	)
}

export default Button
