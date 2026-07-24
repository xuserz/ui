import Input from '../../components/Forms/Input/Input'
/**
 * A composition example, not a primitive. Templates show how components work
 * together and are the right place to document product-level patterns.
 */
export function Inputs() {
	return (
		<main
			style={{
				display: 'flex',
				'justify-content': 'center',
				'align-items': 'center',
			}}
		>
			<form>
				<Input />
				<Input type={'search'} />
			</form>
		</main>
	)
}
