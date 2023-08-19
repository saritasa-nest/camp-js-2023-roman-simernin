/** Parameters for getting anime list. */
export interface AnimeListParametersDto {

	[key: string]: string | number;

	/** Page size. */
	readonly limit: number;

	/** Offset. Multiples of limit.*/
	readonly offset: number;

	/** Sorting. */
	readonly ordering: string;

	/** Filter by types. Types are separated by comma. */
	readonly type__in: string;

	/** Search value. It is title (in English or Japanese).*/
	readonly search: string;
}
