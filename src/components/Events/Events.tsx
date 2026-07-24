import { Dynamic, type DynamicProps } from 'solid-js/web'
import style from './Events.module.css'
import {
	splitProps,
	type ValidComponent,
	onMount,
	onCleanup,
} from 'solid-js'
import { createStore } from 'solid-js/store'

export type EventsProps<T extends ValidComponent = 'span'> = Omit<
	DynamicProps<T>,
	'component' | 'class' | 'classList'
> & {
	component?: T
	class?: string
	classList?: Record<string, boolean | undefined>
}

type Store = {
	focus: boolean
	focusWithin: boolean
}

const Events = <T extends ValidComponent = 'span'>(props: EventsProps<T>) => {
	const [local, others] = splitProps(props, [
		'class',
		'classList',
		'component',
	])

	let ref: Element | undefined

	const [store, setStore] = createStore<Store>({
		focus: false,
		focusWithin: false,
	})

	function onFocusIn() {
		setStore({ focus: true, focusWithin: true })
	}

	function onFocusOut(event: Event) {
		const currentTarget = event.currentTarget
		if (!(currentTarget instanceof Element)) return

		const relatedTarget = (event as FocusEvent).relatedTarget

		setStore({
			focus: false,
			focusWithin:
				relatedTarget instanceof Node && currentTarget.contains(relatedTarget),
		})
	}

	onMount(() => {
		const element = ref
		if (!element) return

		element.addEventListener('focusin', onFocusIn)
		element.addEventListener('focusout', onFocusOut)

		onCleanup(() => {
			element.removeEventListener('focusin', onFocusIn)
			element.removeEventListener('focusout', onFocusOut)
		})
	})

	const dynamicProps = {
		...others,
		component: local.component ?? 'span',
		ref: (element: Element) => {
			ref = element
		},
		class: style.Events,
		classList: {
			['_focus']: store.focus,
			['_focus-within']: store.focusWithin,

			[`${local.class}`]: !!local.class,
			...local.classList,
		},
	} as unknown as DynamicProps<T>

	return <Dynamic {...dynamicProps} />
}

export default Events
