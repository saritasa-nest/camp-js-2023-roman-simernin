/** Pagination parameters dto. */
export interface PaginationParametersDto {

	/** Page size. */
	readonly limit: number;

	/** Offset. Multiples of limit.*/
	readonly offset: number;
}
