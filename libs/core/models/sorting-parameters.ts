/** Sorting parameters. */
export interface SortingParameters<T> {

	/** Field to sort by. */
	readonly sortingField?: T;

	/** Sorting direction. */
	readonly sortingDirection?: SortingDirection;
}

/** Sorting direction. */
export enum SortingDirection {
	Ascending = 'asc',
	Descending = 'desc',
}
