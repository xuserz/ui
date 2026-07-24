import style from './Button.module.css'

import { type Component, type JSX, mergeProps, splitProps } from 'solid-js'

export type Button = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
	/** Visual emphasis of the action. */
	appearance?: 'accent'

	mode?: 'primary' | 'tertiary' | 'secondary'
	/** Vertical rhythm and font size. */
	size?: 'small' | 'medium' | 'large'
	/** Blocks interaction and shows a progress indicator. */
	loading?: boolean
}

const Button: Component<Button> = props => {
	const merged = mergeProps(
		{
			appearance: 'accent',
			mode: 'primary',
			size: 'medium',
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
	])

	return (
		<button
			type={others.type ?? 'button'}
			class={style.Button}
			classList={{
				[style[`Button__size--${local.size}`]]: !!local.size,
				[style[`Button__appearance--${local.appearance}`]]: !!local.appearance,
				[style[`Button__mode--${local.mode}`]]: !!local.mode,

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
