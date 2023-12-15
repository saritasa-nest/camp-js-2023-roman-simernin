/** Sorting parameters. */
export interface SortingParameters<T extends string> {
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
