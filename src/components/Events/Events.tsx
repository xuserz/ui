import { Dynamic, type DynamicProps } from 'solid-js/web'
import style from './Events.module.css'
import {
	type JSX,
	type Component,
	mergeProps,
	splitProps,
	type ValidComponent,
	onMount,
	onCleanup,
} from 'solid-js'
import { createStore, produce } from 'solid-js/store'

interface Events<T extends ValidComponent> extends JSX.HTMLAttributes<
	DynamicProps<T>
> {
	component: T
}

type Store = {
	focus: boolean
	focusWithin: boolean
}

const Events = <T extends ValidComponent>(props: Events<T>) => {
	const merged = mergeProps({ component: 'span' }, props)
	const [local, others] = splitProps(merged, [
		'class',
		'classList',
		'component',
	])

	let ref: HTMLElement

	const [store, setStore] = createStore<Store>({
		focus: false,
		focusWithin: false,
	})

	function onFocusIn(event: FocusEvent) {
		console.log('AWGAWG')
		const currentTarget = event.currentTarget as HTMLDivElement
		setStore(
			produce(store => {
				store.focus = true
				store.focusWithin = true

				return store
			}),
		)
	}

	function onFocusOut(event: FocusEvent) {
		const currentTarget = event.currentTarget as HTMLDivElement
		setStore(
			produce(store => {
				store.focus = false
				store.focusWithin = currentTarget.contains(event.relatedTarget)

				return store
			}),
		)
	}

	onMount(() => {
		if (!ref!) return

		ref.addEventListener('focusin', onFocusIn)
		ref.addEventListener('focusout', onFocusOut)

		onCleanup(() => {
			ref.removeEventListener('focusin', onFocusIn)
			ref.removeEventListener('focusout', onFocusOut)
		})
	})

	return (
		<Dynamic
			ref={ref!}
			component={local.component}
			class={style.Events}
			classList={{
				['_focus']: store.focus,
				[`_focus-within`]: store.focusWithin,

				[`${local.class}`]: !!local.class,
				...local.classList,
			}}
			{...others}
		/>
	)
}

export default Events
