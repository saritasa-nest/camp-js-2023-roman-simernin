/** Sorting parameters. */
export interface SortingParameters<T> {

	/** Field to sort by. */
	readonly field: T | null;

	/**
	 * Sorting direction.
	 * If false then sorting is by descending.
	 */
	readonly isAscending: boolean;
}
