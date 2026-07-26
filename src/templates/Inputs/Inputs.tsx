import { createSignal } from 'solid-js'
import { Pagination } from '../../components'
import Input from '../../components/Forms/Input/Input'
import Group from '../../components/Group/Group'
/**
 * A composition example, not a primitive. Templates show how components work
 * together and are the right place to document product-level patterns.
 */
export function Inputs() {
	const [page, setPage] = createSignal(0)

	return (
		<main
			style={{
				display: 'flex',
				'justify-content': 'center',
				'align-items': 'center',
			}}
		>
			<Group>
				<form
					style={{
						display: 'flex',
						'flex-direction': 'column',
						gap: `var(--ui-padding-medium)`,
					}}
				>
					<Input type={'search'} />
				</form>
				<form
					style={{
						display: 'flex',
						'flex-direction': 'column',
						gap: `var(--ui-padding-medium)`,
					}}
				>
					<Input size={'small'} />
				</form>

				<Pagination page={page()} onPageChange={setPage} totalPages={1000} />
			</Group>
		</main>
	)
}
