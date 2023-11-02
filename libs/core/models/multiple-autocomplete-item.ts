/** Multiple autocomplete item. */
export interface MultipleAutocompleteItem {

	/**
	 * Id.
	 * Can be null if it is new value.
	 */
	readonly id: number | null;

	/** Name. */
	readonly name: string;
}
