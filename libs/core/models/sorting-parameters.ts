/** Sorting parameters. */
export interface SortingParameters<T> {

	/** Field to sort by. */
	readonly sortingField: T | null;

	/** Sorting direction. */
	readonly sortingDirection: SortingDirection | null;
}

/** Sorting direction. */
export enum SortingDirection {
	Ascending = 'asc',
	Descending = 'desc',
}
