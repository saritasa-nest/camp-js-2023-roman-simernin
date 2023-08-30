/** Sorting parameters. */
export interface SortingParameters<T> {

	/** Field to sort by. */
	readonly field: T | null;

	/** Sorting direction. */
	readonly direction: SortingDirection | null;
}

/** Sorting direction. */
export enum SortingDirection {
	Ascending = 'asc',
	Descending = 'desc',
}
