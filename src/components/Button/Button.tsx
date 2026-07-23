import { splitProps } from 'solid-js'
import type { JSX } from 'solid-js'
import styles from './Button.module.css'

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
	/** Visual emphasis of the action. */
	variant?: 'primary' | 'secondary' | 'ghost'
	/** Vertical rhythm and font size. */
	size?: 'sm' | 'md' | 'lg'
	/** Blocks interaction and shows a progress indicator. */
	loading?: boolean
}

export function Button(props: ButtonProps) {
	const [local, buttonProps] = splitProps(props, [
		'variant',
		'size',
		'loading',
		'class',
		'children',
	])

	const className = () =>
		[
			styles.button,
			styles[local.variant ?? 'primary'],
			styles[local.size ?? 'md'],
			local.class,
		]
			.filter(Boolean)
			.join(' ')

	return (
		<button
			{...buttonProps}
			type={buttonProps.type ?? 'button'}
			class={className()}
			disabled={buttonProps.disabled || local.loading}
			aria-busy={local.loading || undefined}
		>
			{local.loading && <span class={styles.spinner} aria-hidden='true' />}
			{local.children}
		</button>
	)
}
