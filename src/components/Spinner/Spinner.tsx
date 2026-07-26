import style from './Spinner.module.css'

import {
	type Component,
	type JSX,
	splitProps,
	mergeProps,
	Show,
	createSignal,
	onMount,
} from 'solid-js'

interface Spinner extends JSX.HTMLAttributes<HTMLDivElement> {
	size?: 'small' | 'medium' | 'large' | 'inherit'
	color?: 'secondary' | 'inherit' | 'primary' | 'icon_tertiary'

	progress?: number

	/**
	 * @default true
	 */
	visible?: boolean
}

const Spinner: Component<Spinner> = props => {
	const merged = mergeProps(
		{ size: 'regular', color: 'secondary', visible: true },
		props,
	) as Spinner
	const [local, others] = splitProps(merged, [
		'size',
		'color',
		'class',
		'classList',
		'progress',
		'visible',
	])

	let ref: HTMLDivElement

	const [height, setHeight] = createSignal<number>(0)

	onMount(() => {
		setHeight(ref!?.clientHeight || 0)
	})

	// Рассчитываем stroke-dasharray и stroke-dashoffset на основе progress
	const getCircleStyle = () => {
		if (local.progress === undefined) return {}

		const radius = 20
		const circumference = 2 * Math.PI * radius
		const progressPercent = Math.max(5, Math.min(100, local.progress || 0))
		const dashoffset = circumference - (progressPercent / 100) * circumference

		return {
			'stroke-dasharray': `${circumference}px ${circumference}px`,
			'stroke-dashoffset': dashoffset,
			animation: 'none', // Отключаем анимацию когда есть progress
			transition: '0.3s',
		} as JSX.CSSProperties
	}

	return (
		<div
			ref={ref!}
			class={style.Spinner}
			classList={{
				[`${local.class}`]: !!local.class,
				...local.classList,

				[style[`Spinner__size--${local.size}`]]: !!local.size,
				[style[`Spinner__color--${local.color}`]]: !!local.color,
				[style[`Spinner--animBorder`]]: local.progress === undefined,
				[style[`Spinner--visible`]]: local.visible,
			}}
			{...others}
		>
			<svg viewBox='0 0 50 50'>
				<circle
					cx='25'
					cy='25'
					r='20'
					fill='none'
					stroke-width='5'
					style={getCircleStyle()}
				/>
			</svg>
			<Show when={local.progress !== undefined}>
				<span
					style={{
						'font-size': local.size === 'inherit' ? `${height() / 3}px` : '',
					}}
					class={style.Spinner__progress}
				>
					{local.progress}
				</span>
			</Show>
		</div>
	)
}

export default Spinner
