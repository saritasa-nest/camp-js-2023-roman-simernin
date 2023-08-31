/** Sorting parameters. */
export interface SortingParameters<T> {

	/** Field to sort by. */
	readonly field: T;

	/** Sorting direction. */
	readonly direction: SortingDirection;
}

/** Sorting direction. */
export enum SortingDirection {
	Ascending = 'asc',
	Descending = 'desc',
}
