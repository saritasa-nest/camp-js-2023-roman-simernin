/** Pagination meta info. */
export interface Pagination<T> {

	/** Total count of items. */
	readonly totalCount: number;

	/** Array of items requested. */
	readonly results: T[];
}
